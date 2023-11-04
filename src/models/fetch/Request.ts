export type TSortDirection = 0 | 1;

export enum SortDirection {
  ASCENDING = 'Ascending',
  DESCENDING = 'Descending'
}
export interface PagedRequest {
  pageNumber?: number;
  pageSize?: number;
  forcedPagination?: boolean;
}

export type SortedPagedApiRequest = PagedRequest & {
  sortProperty?: string;
  sortDirection?: SortDirection;
}
