import { AxiosError, AxiosInstance } from 'axios';

import { FetchResponse } from 'src/models/fetch/FetchResponse';
import { ListApiResponse, PaginatedApiResponse } from 'src/models/fetch/Response';
import { MultiPartRequest } from 'src/models/fetch/MultiPartRequest';
import { Pagination } from 'src/models/fetch/Pagination';
import { SortedPagedApiRequest, SortDirection } from 'src/models/fetch/Request';

import { defaultListPaginatedResponseData, defaultListResponseData } from 'src/data/default/FetchResponse';
import {
  generateDataFetchResponse, generateErrorFetchResponse,
  ClientFactory,
} from './ClientFactory';
import { createUrl, UrlParameters } from './CreateUrl';
import { is } from 'src/utils/Is';

type Template = string | {
  template: string;
  params?: UrlParameters;
}

// type MethodBody = typeof ClientFactory.prototype.postFactory | typeof ClientFactory.prototype.postMultiPartFactory
//  | typeof ClientFactory.prototype.putFactory | typeof ClientFactory.prototype.putMultiPartFactory
//  | typeof ClientFactory.prototype.patchFactory
//  | typeof ClientFactory.prototype.deleteFactory
type MethodBody = 'postFactory' | 'postMultiPartFactory'
  | 'putFactory' | 'putMultiPartFactory'
  | 'patchFactory'
  | 'deleteFactory';

const utilIs = is();

export class ClientApi {
  clientFactory: ClientFactory;

  constructor(axiosApi: AxiosInstance) {
    this.clientFactory = new ClientFactory(axiosApi);
  }

  async getClient<T>(baseUrl: string, template: string, params?: UrlParameters): Promise<FetchResponse<T | undefined>> {
    try {
      const response = await this.clientFactory.getFactory<T>(createUrl(baseUrl, template, params));

      return generateDataFetchResponse(response.data, response);
    } catch (error) {
      return generateErrorFetchResponse(error as AxiosError);
    }
  }

  async getListClient<T>(baseUrl: string, template: string, params?: UrlParameters) {
    try {
      const response = await this.clientFactory.getFactory<ListApiResponse<T>>(createUrl(baseUrl, template, params));

      const data = Array.isArray(response.data) ? response.data : defaultListResponseData<T>();

      return generateDataFetchResponse(data, response);
    } catch (error) {
      return generateErrorFetchResponse<ListApiResponse<T>>(error as AxiosError, defaultListResponseData<T>());
    }
  }

  async getListPaginatedClient<T, P extends Pagination | undefined = undefined>(
    baseUrl: string,
    template: string,
    params?: P,
  ) {
    try {
      const paramsUpdate: SortedPagedApiRequest & Record<string, unknown> = { ...params };

      const response = await this.clientFactory.getFactory<PaginatedApiResponse<T>>(createUrl(baseUrl, template, paramsUpdate));

      const data = Array.isArray(response.data.rows) ? response.data.rows : defaultListResponseData<T>();

      const pagination: Pagination = defaultListPaginatedResponseData();

      pagination.descending = params?.descending ?? pagination.descending;
      pagination.sortBy = params?.sortBy ?? pagination.sortBy;
      pagination.page = response.data.page ?? pagination.page;
      pagination.rowsNumber = response.data.rowsNumber ?? pagination.rowsNumber;
      pagination.rowsPerPage = response.data.rowsPerPage ?? params?.rowsPerPage ?? pagination.rowsPerPage;

      return { ...generateDataFetchResponse(data, response), pagination };
    } catch (error) {
      return generateErrorFetchResponse<ListApiResponse<T>>(error as AxiosError, defaultListResponseData<T>());
    }
  }

  /**
 * @summary Function is to handle the body of HTTP requests for various HTTP methods (POST, PUT, PATCH, DELETE) by creating the URL, calling the appropriate method, and returning a standardized FetchResponse object.
 @desc Flow:
- Extract the template and params from the options object
- Create the URL using the createUrl function
- Call the appropriate method with the URL and body
- Generate an FetchResponse object using the generateDataFetchResponse or generateErrorFetchResponse functions, depending on the success or failure of the request
 @param method: a function representing the HTTP method to be used (POST, PUT, PATCH, DELETE)
 @param options: an object containing the baseUrl, template, and body of the request
*/
  async clientBodyHandler<T, P extends object = object>(method: MethodBody, options: {
    baseUrl: string; template: Template; body?: P;
  }): Promise<FetchResponse<T | undefined>> {
    try {
      let template = '';
      let params: UrlParameters | undefined;
      if (utilIs.string(options.template)) {
        template = options.template;
      } else {
        template = options.template.template;
        params = options.template.params;
      }

      const url = createUrl(options.baseUrl, template, params);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await this.clientFactory[method]<T, P>(url, options.body as any);

      return generateDataFetchResponse<T>(response.data as T, response);
    } catch (error) {
      return generateErrorFetchResponse(error as AxiosError);
    }
  }

  async postClient<T, P extends object = object>(baseUrl: string, template: Template, body?: P) {
    return this.clientBodyHandler<T, P>('postFactory', { baseUrl, template, body });
  }

  async postMultiPartClient<T extends MultiPartRequest = MultiPartRequest, P extends object = object>(baseUrl: string, template: Template, body: P) {
    return this.clientBodyHandler<T, P>('postMultiPartFactory', { baseUrl, template, body });
  }

  async putClient<T, P extends object = object>(baseUrl: string, template: Template, body: P) {
    return this.clientBodyHandler<T, P>('putFactory', { baseUrl, template, body });
  }

  async putMultiPartClient<T = MultiPartRequest, P extends object = object>(baseUrl: string, template: Template, body: P) {
    return this.clientBodyHandler<T, P>('putMultiPartFactory', { baseUrl, template, body });
  }

  async patchClient<T, P extends object = object>(baseUrl: string, template: Template, body: P) {
    return this.clientBodyHandler<T, P>('patchFactory', { baseUrl, template, body });
  }

  async deleteClient<T, P extends object = object>(baseUrl: string, template: Template, body?: P) {
    return this.clientBodyHandler<T, P>('deleteFactory', { baseUrl, template, body });
  }
}
