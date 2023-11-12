import { FetchResponse } from 'src/models/fetch/FetchResponse';
import { ListApiResponse } from 'src/models/fetch/Response';
import { Pagination } from 'src/models/fetch/Pagination';
import { HttpStatus } from 'src/models/fetch/HttpStatus';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultListResponseData = <T = any>(): ListApiResponse<T> => [];
export const defaultListPaginatedResponseData = (): Pagination => ({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});
export const emptyFetchResponse = (): Promise<FetchResponse<undefined>> => new Promise((resolve) => {
  resolve({ data: undefined, status: 0 } as FetchResponse<undefined>);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorFetchResponse = (error?: any): FetchResponse<undefined> => ({
  data: undefined, status: HttpStatus.BAD_REQUEST, isError: true, message: error?.message || '',
} as FetchResponse<undefined>);
