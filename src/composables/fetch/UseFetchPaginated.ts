import type {
  FetchOptions,
  FetchPaginationOptions, DataNoUndefined, Fetch, UseFetch, UseFetchPagination,
} from 'src/types/UseFetch.type';
import { Pagination } from 'src/models/fetch/Pagination';

import { defaultListPaginatedResponseData } from 'src/data/default/FetchResponse';
import { useFetch } from 'src/composables/fetch/UseFetch';

/**
 * @summary provide a paginated version of the useFetch function. It allows fetching data from an API endpoint with pagination options and returns a reactive object containing the fetched data, pagination information, and other useful properties.
 @param request: a function that returns a Promise containing the response data
 @param options: an optional object containing various options for the fetch request, including pagination options.
 @returns {UseFetchPagination} UseFetchPagination
- data: a reactive variable containing the response data
- execute: a function that executes the request and updates the reactive variables
- isFinished: a reactive variable indicating whether the request has finished
- isFetching: a reactive variable indicating whether the request is currently fetching
- response: a reactive variable containing the response object
- pagination: a reactive variable containing the pagination object
*/
export function useFetchPaginated <T extends Fetch>(request: T, options?: Partial<FetchPaginationOptions<T>>): UseFetchPagination<T, DataNoUndefined<T>> {
  const _options: FetchOptions<T> = { ...options, initialData: options?.initialData || [], immediate: false };

  const response = toRefs<UseFetch<T>>(useFetch(request, _options));
  const originalExecute = response.execute.value;

  const isResponseValid = computed(() => !!response.response.value?.status);

  const defaultPagination = options?.usePagination || defaultListPaginatedResponseData();
  const pagination: Ref<Pagination | undefined> = ref(defaultPagination);

  const setPagination = () => {
    if (response.response.value?.isError) {
      pagination.value = defaultPagination;
    } else {
      pagination.value = response.response.value?.pagination || defaultPagination;
    }
  };

  const execute = async (...payload: Parameters<T>) => {
    const payloadFlat = payload?.[0] || {};
    await originalExecute(...[{ ...pagination.value || {}, ...payloadFlat }] as Parameters<T>);

    if (isResponseValid.value) {
      setPagination();
    }

    return response.response.value;
  };

  response.execute.value = execute;

  if (options?.immediate) {
    execute(...[options.payload] as Parameters<T>);
  }

  const shell = reactive({
    ...response,
    pagination,
  }) as UseFetchPagination<T, DataNoUndefined<T>>;

  return shell;
}
