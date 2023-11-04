import { UseFetchPagination } from "src/types/UseFetch.type";
import { FetchResponse } from "../fetch/FetchResponse";
import { ListApiResponse } from "../fetch/Response";

export type GenericView<T> = {
  tableService:
  | UseFetchPagination<(param?: any) => Promise<FetchResponse<T | undefined | ListApiResponse<T>>>>;
}
