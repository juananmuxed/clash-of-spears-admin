import { UseFetchPagination } from "src/types/UseFetch.type";
import { FetchResponse } from "../fetch/FetchResponse";
import { ListApiResponse } from "../fetch/Response";
import { QTableColumn } from "quasar";

export type GenericView<T> = {
  tableService:
  | UseFetchPagination<(param?: any) => Promise<FetchResponse<T | undefined | ListApiResponse<T>>>>;
}
