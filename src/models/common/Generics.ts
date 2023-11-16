import { UseFetch, UseFetchPagination } from "src/types/UseFetch.type";
import { FetchResponse } from "../fetch/FetchResponse";
import { ListApiResponse } from "../fetch/Response";

export type _GenericViewType<T> = {
  tableService:
  | UseFetchPagination<(param?: any) => Promise<FetchResponse<T | undefined | ListApiResponse<T>>>>;
  createService:
  | UseFetch<(param?: any) => Promise<FetchResponse<T | undefined>>>;
  updateService:
  | UseFetch<(param?: any) => Promise<FetchResponse<T | undefined>>>;
  removeService:
  | UseFetch<(param?: any) => Promise<FetchResponse<T | undefined>>>;
}
