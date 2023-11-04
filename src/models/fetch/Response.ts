export type PaginatedApiResponse<T> = {
  page: number;
  rowsPerPage: number;
  rows: T[];
  rowsNumber: number;
  descending: boolean;
}

export type ListApiResponse<T> = T[]
