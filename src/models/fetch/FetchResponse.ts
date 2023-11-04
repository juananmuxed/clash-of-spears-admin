import { AxiosResponseHeaders } from 'axios';

import { Pagination } from './Pagination';

export interface FetchResponse<T>{
  data: T;
  status: number;
  pagination?: Pagination;
  isError?: boolean;
  message?: string[];
  headers?: AxiosResponseHeaders;
}
