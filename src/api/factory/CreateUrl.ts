import { is } from 'src/utils/Is';
import { createQueryString } from './CreateQueryString';
import { joinPaths } from './JoinPaths';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UrlParameters = number | string | { length?: never;[key: string]: any };

export type CreateUrl = (baseUrl: string, template: string, param?: UrlParameters) => string;
export const createUrl: CreateUrl = (baseUrl: string, template?: string, params?: UrlParameters) => {
  let url = baseUrl && template ? joinPaths(baseUrl, template) : baseUrl || template || '';
  const queryParams: Record<string, unknown> = {};
  let queryString = '';
  const utilIs = is();

  if (!Array.isArray(params)) {
    if (utilIs.object(params)) {
      Object
        .keys(params)
        .filter((key) => params[key] !== undefined && params[key] !== null)
        .forEach((key) => {
          const paramPlaceHolder = `{${key}}`;

          if (template && template.indexOf(paramPlaceHolder) > -1) {
            url = url.replace(paramPlaceHolder, `${params[key]}`);
          } else {
            queryParams[key] = params[key];
          }
        });

      queryString = createQueryString(queryParams);
      if (queryString) {
        queryString = `?${queryString}`;
      }
    } else if (params) {
      queryString = encodeURIComponent(params);
      if (queryString) {
        queryString = `/${queryString}`;
      }
    }
  }

  url = encodeURI(url.replace(/\/{.*}/, ''));
  return `${url}${queryString || ''}`;
};
