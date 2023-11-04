import { AxiosInstance } from 'axios';

import { ClientApi } from './factory/Client';

/**
 * @summary Class is designed to provide a simple and consistent interface for performing CRUD (Create, Read, Update, Delete) operations on a RESTful API. It takes in a controller name and an optional controllerGetAll name, and provides methods for performing POST, PUT, GET, and GET list operations on the specified controllers.
 @constructor (controller: string, controllerGetAll?: string): initializes the CrudApi instance with the specified controller and controllerGetAll names.
 @function async post<T, P extends object>(payload: P): performs a POST operation on the specified controller with the given payload.
 @function async put<T, P extends object>(payload: P): performs a PUT operation on the specified controller with the given payload.
 @function async getList<T>(queryPayload?: Record<string, unknown>): performs a GET list operation on the specified controllerGetAll with the given query payload.
 @function async get<T>(queryPayload?: number | string | Record<string, unknown>): performs a GET operation on the specified controller with the given query payload.
*/
export class CrudApi {
  constructor(axiosApi: AxiosInstance, controller: string, controllerGetAll?: string) {
    this.clientApi = new ClientApi(axiosApi);
    this.controller = controller;
    this.controllerGetList = controllerGetAll || controller;
  }

  clientApi: ClientApi;

  controller = '';

  controllerGetList = '';

  async post<T, P extends object>(payload: P) {
    return this.clientApi.postClient<T, P>(this.controller, '', payload);
  }

  async put<T, P extends object>(payload: P) {
    return this.clientApi.putClient<T, P>(this.controller, '', payload);
  }

  async getList<T>(queryPayload?: Record<string, unknown>) {
    return this.clientApi.getListClient<T>(this.controllerGetList, '', queryPayload);
  }

  async get<T>(queryPayload?: number | string | Record<string, unknown>) {
    return this.clientApi.getClient<T>(this.controller, '', queryPayload);
  }
}
