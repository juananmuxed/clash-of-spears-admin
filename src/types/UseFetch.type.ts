import { FetchResponse } from 'src/models/fetch/FetchResponse';
import { Pagination } from 'src/models/fetch/Pagination';
import { ErrorDialogHandler } from 'src/utils/ErrorHandler';
import { MemoizeParams } from 'src/utils/Memoize';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Fetch = (...args: any) => Promise<FetchResponse<any>>
export type Data<T extends Fetch> = Awaited<ReturnType<T>>['data']

export type DataNoUndefined<T extends Fetch> = Exclude<Data<T>, undefined>
export type DataUnWrap<T extends Fetch> = Exclude<Data<T>, undefined>[number]

export interface FetchOptions<T extends Fetch> {
  readonly immediate?: boolean;
  readonly payload?: Parameters<T>[number];
  readonly initialData?: Data<T>;
  readonly successMessage?: string;
  readonly errorMessage?: string;
  readonly showError?: boolean;
  /**
   * @desc Se usa para mantener en memoria la respuesta y evitar peticiones
   */
  readonly useMemoize?: MemoizeParams | string;
  readonly useDialogError?: ErrorDialogHandler;
  readonly onSuccess?: (response: Readonly<FetchResponse<Data<T>>>) => void;
  readonly onError?: (response: Readonly<FetchResponse<Data<T>>>) => void;
}
export interface FetchInitialDataOptions<T extends Fetch> extends FetchOptions<T> {
  readonly initialData: Data<T>;
}

export interface FetchPaginationOptions<T extends Fetch> extends FetchOptions<T> {
  readonly usePagination: Pagination;
}

export type UseFetch<T extends Fetch, D = Data<T> | undefined> = {
  data: D;
  execute: (...payload: Parameters<T>) => Promise<FetchResponse<T>>;
  isFinished: boolean;
  isFetching: boolean;
  response: FetchResponse<T>;
}

export type UseFetchPagination<T extends Fetch, D = Data<T> | undefined> = UseFetch<T, D> & {
  pagination: Pagination | undefined;
}
