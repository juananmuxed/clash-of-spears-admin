export type Pagination = {
  sortBy: string | null;
  rowsNumber?: number;
  descending: boolean;
  page: number;
  rowsPerPage: number;
}
