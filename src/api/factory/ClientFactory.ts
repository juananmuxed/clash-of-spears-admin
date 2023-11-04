import {
  AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, toFormData,
} from 'axios';

import { FetchResponse } from 'src/models/fetch/FetchResponse';
import { MultiPartRequest } from 'src/models/fetch/MultiPartRequest';
import { HttpStatus } from 'src/models/fetch/HttpStatus';
import { is } from 'src/utils/Is';

const TIMEOUT_FILE = 300000; // * 5min

const utilIs = is();

export class ClientFactory {
  axiosApi: AxiosInstance;

  constructor(axiosApi: AxiosInstance) {
    this.axiosApi = axiosApi;
  }

  sendRequest<T>(config: AxiosRequestConfig) {
    return this.axiosApi.request<T, AxiosResponse<T>>(config);
  }

  getFactory<T>(url: string) {
    return this.sendRequest<T>(
      { url, method: 'GET' as const },
    );
  }

  postFactory<T, P extends object>(url: string, body?: P) {
    return this.sendRequest<T>({
      url,
      method: 'POST' as const,
      data: body,
    });
  }

  postMultiPartFactory<T, P extends object>(url: string, body: P) {
    return this.sendRequest<T>({
      url,
      method: 'POST' as const,
      data: toFormData(body),
      timeout: TIMEOUT_FILE,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  putFactory<T, P extends object>(url: string, body?: P) {
    return this.sendRequest<T>({
      url,
      method: 'PUT' as const,
      data: body,
    });
  }

  putMultiPartFactory<T, P extends object>(url: string, body: P) {
    return this.sendRequest<T>({
      url,
      method: 'PUT' as const,
      data: toFormData(body),
      timeout: TIMEOUT_FILE,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  patchFactory<T, P extends object>(url: string, body?: P) {
    return this.sendRequest<T>({
      url,
      method: 'PATCH' as const,
      data: body,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteFactory<T, P extends object>(url: string, body?: P) {
    return this.sendRequest<T>({
      url,
      method: 'DELETE' as const,
      data: body,
    });
  }
}

function getErrorMessageResponse(dataMessage?: unknown | string[] | string | MultiPartRequest) {
  let message: undefined | string[];

  if (dataMessage) {
    if (Array.isArray(dataMessage) && dataMessage.length) {
      message = [dataMessage.pop()];
    } else if (utilIs.string(dataMessage)) {
      message = [dataMessage];
    } else if (utilIs.object(dataMessage) && 'errors' in dataMessage) {
      const { errors } = dataMessage;
      if (Array.isArray(errors)) {
        // Convention with the back where the "errors" property is standardized.
        // And the types "CsvResults" and "ErrorsAndCorrect".
        message = errors;
      } else {
        // Internal server errors
        message = errors[''];
      }
    }
  }

  return message?.filter((m) => m);
}

export function generateErrorFetchResponse<T = undefined>(error: AxiosError, data?: T) {
  let message = error?.message ? [error.message] : undefined;

  if (error?.config?.signal?.aborted) {
    message = undefined;
  } else if (error?.response?.data) {
    message = getErrorMessageResponse(error.response.data);
  }

  return {
    data, status: error?.response?.status || HttpStatus.BAD_REQUEST, isError: true, message,
  } as FetchResponse<T>;
}

export function generateDataFetchResponse<T = undefined>(data: T, response: AxiosResponse) {
  let messageError: { isError?: boolean; message?: string[] } = {};

  if ((utilIs.array(response.data?.errors) && response.data?.errors.length) || response.status >= 300) {
    messageError = {
      message: getErrorMessageResponse(response.data),
      isError: true,
    };
  }

  return {
    data, status: response?.status, headers: response?.headers, ...messageError,
  } as FetchResponse<T>;
}
