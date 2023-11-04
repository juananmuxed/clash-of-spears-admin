/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComputedRef } from 'vue';

export interface MemoizeConfig {
  /**
   * @desc Tiempo de expiración de la cache
   */
  expiresIn?: number;
  /**
   * @desc Si se marca como true, expondrá las propiedades 'current' y 'retrieve'.
   * Este parámetro usado en el 'useFetch' hará que el 'data' este sincronizado con el ultimo valor
   * Ejemplo:
   * Se carga una tabla usando: useFetchPaginated(getList, { useMemoize: { key: KEY, config: { globalData: true } }})
   * Y desde un sub-componente se desea recargar los datos de dicha tabla,
   * simplemente con llamar al mismo método, con la misma key, el listado de la tabla se actualizará.
   */
  globalData?: boolean;
}

export interface MemoizeParams {
  /**
   * @desc Key para identificar método
   */
  key: string;
  config?: MemoizeConfig;
}

interface CacheMemoize<F> {
  memo: Record<string, ()=> F>;
  statusMap: Record<string, string>;
  resolves: Record<string, ((_value: F | PromiseLike<F>)=> void)[]>;
  rejects: Record<string, ((_reason?: any)=> void)[]>;
}

type FData<F extends (...args: any)=> any> =Awaited<ReturnType<F>>

export interface memoize <F extends (...args: any)=> any> {
  /**
   * @summary Memoized function that returns the cached value if the computation is already in the cache.
  */
  (...args: Parameters<F>): Promise<FData<F>>;
  /**
   * @summary Function that returns the last value computed returned by the memoized function.
   * @requires globalData = true
  */
  current<T = FData<F>>(): ComputedRef<T | undefined>;
  /**
   * @summary Function that makes a call to the memoized function with the last parameters.
   * @requires globalData = true
  */
  retrieve(): Promise<ReturnType<F> | undefined>;
}

const maxSizeCache = 10;
export const dataResultCache = ref<Record<string, {data?: object; args: any}>>({});
export const methodsCache = new Map<string, CacheMemoize<FData<any>>>();

function getCurrentMemoize<F>(methodKey: string) {
  const lastDataResult = computed(() => dataResultCache.value[methodKey]?.data);

  return lastDataResult as ComputedRef<F | undefined>;
}

function cleanKeyCache(methodKey: string, callKey?: string) {
  const cache = methodsCache.get(methodKey);
  if (callKey && cache) {
    delete cache.memo[callKey];
    delete cache.statusMap[callKey];
    delete cache.resolves[callKey];
    delete cache.rejects[callKey];
    if (dataResultCache.value[methodKey]) {
      delete dataResultCache.value[methodKey].data;
    }
  }
}
function generateCacheKey(args: any[]): string {
  if (args.length) {
    return `_${JSON.stringify(args)}`;
  }
  return '_call_empty_';
}

function handleCacheHit<F>(cache: CacheMemoize<F>, callKey: string): Promise<F> {
  return Promise.resolve(cache.memo[callKey]());
}

function scheduleCacheCleanup(methodKey: string, callKey: string, expiresIn: number) {
  setTimeout(() => {
    cleanKeyCache(methodKey, callKey);
  }, expiresIn);
}

/**
 * @summary The memoize function aims to cache the output of a given function and check if the required computation is already in the cache before computing it. It returns a function that can be called with the same parameters, and if the result is already in the cache, it returns the cached value. This function also provides options to configure the cache, such as expiration time and global data storage
 @desc Flow:
1. Check if the cache for the given methodKey already exists, if not, create a new cache.
2. When the memoized function is called, generate a cache key based on the input parameters.
3. Check if the cache key exists in the cache, if so, return the cached value.
4. If the cache key does not exist, call the original function and store the result in the cache.
5. If the cache is configured to expire, schedule a cleanup function to remove the cache after the expiration time.
6. If global data storage is enabled, store the result in a global cache.
7. Return the result.
 @param methodKey: a string that identifies the function to be memoized
 @param asyncFn: the function to be memoized
 @param IMemoizeConfig: an optional configuration object that can contain the expiresIn and globalData properties
*/
export function memoize<F extends(
  ...args: any)=> any>(methodKey: string,
  asyncFn: F,
  {
    expiresIn = 2000,
    globalData = false,
  }: MemoizeConfig = {},
): memoize<F> {
  const hasCache = methodsCache.has(methodKey);
  const cache = methodsCache.get(methodKey) || {
    memo: {},
    statusMap: {},
    resolves: {},
    rejects: {},
  };

  if (methodsCache.size >= maxSizeCache) {
    methodsCache.delete(methodsCache.keys().next().value);
    delete dataResultCache.value[methodKey];
  }

  if (!hasCache) {
    methodsCache.set(methodKey, cache);
  }

  async function memoizedFn(...args: Parameters<F>): Promise<FData<F>> {
    const callKey = generateCacheKey(args);

    if (callKey in cache.memo) {
      return handleCacheHit(cache, callKey);
    }

    cache.resolves[callKey] = cache.resolves[callKey] ?? [];
    cache.rejects[callKey] = cache.rejects[callKey] ?? [];

    if (cache.statusMap[callKey] === 'pending') {
      return new Promise((_res, _rej) => {
        cache.resolves[callKey].push(_res);
        cache.rejects[callKey].push(_rej);
      }) as Promise<FData<F>>;
    }

    try {
      cache.statusMap[callKey] = 'pending';
      const result = await asyncFn(...(args as [])) as FData<F>;
      cache.statusMap[callKey] = 'success';
      cache.memo[callKey] = function get() {
        if (typeof expiresIn === 'number' && expiresIn > 0) {
          scheduleCacheCleanup(methodKey, callKey, expiresIn);
        }

        if (globalData) {
          dataResultCache.value[methodKey] = { args, data: structuredClone(result) };
        }
        return result;
      };

      cache.resolves[callKey]?.forEach((res) => res(result));

      return cache.memo[callKey]();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('🚨🚨 ~ file: Memoize.ts:134 ~ error:', error);
      cache.statusMap[callKey] = 'error';
      cache.rejects[callKey]?.forEach((rej) => rej(error));
      throw error;
    }
  }

  memoizedFn.current = <T>() => {
    if (globalData) {
      return getCurrentMemoize<T>(methodKey);
    }
    return computed(() => undefined);
  };

  memoizedFn.retrieve = async () => {
    if (globalData) {
      const lastArgs = dataResultCache.value[methodKey]?.args || [] as Parameters<F>;
      return memoizedFn(...lastArgs);
    }
    return new Promise<undefined>((resolve) => { resolve(undefined); });
  };

  return memoizedFn;
}
