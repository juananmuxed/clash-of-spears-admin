import { UseFetchSelect, UseFetchSelectArgs } from 'src/types/UseFetchSelect.type';
import {
  FetchOptions,
  Fetch, UseFetch,
} from 'src/types/UseFetch.type';

import { useSelectBind } from 'src/composables/UseSelectBind';
import { useFetch } from 'src/composables/fetch/UseFetch';

/**
 * @summary Custom hook that combines the useFetch and useSelectBind hooks to provide a convenient way to fetch data and bind it to a select input. Its main objective is to simplify the process of fetching data and binding it to a select input by providing a single hook that handles both tasks.
 @param request: a function that returns a Promise containing the response data
 @param options: an object containing optional parameters to customize the behavior of the hook
 @returns {UseFetch} UseFetch
- data: a reactive variable containing the response data
- execute: a function that executes the request and updates the reactive variables
- isFinished: a reactive variable indicating whether the request has finished
- isFetching: a reactive variable indicating whether the request is currently fetching
- response: a reactive variable containing the response object
- selectBind: an object that contains the options and methods for binding the data to a select input.
- selectBindExecute: a function that executes the fetch request and returns the selectBind object.
*/
export function useFetchSelect <T extends Fetch>(...args: UseFetchSelectArgs<T>): UseFetchSelect<T> {
  const options = args[1];
  const request = args[0];

  if (!request) {
    throw new Error('Invalid arguments, "Request" is required');
  }

  const _options: FetchOptions<T> = { ...options, initialData: options?.initialData || [] };

  const response = toRefs<UseFetch<T>>(useFetch(request, _options));

  const selectBind = useSelectBind(response.data, response.isFetching, options);

  const shell = reactive({
    ...response,
    selectBind,
    selectBindExecute: (...payload: Parameters<T>) => {
      if (!response.isFinished?.value && !response.isFetching?.value) {
        response.execute?.value(...[payload] as Parameters<T>);
      }
      return selectBind;
    },
  }) as UseFetchSelect<T>;

  return shell;
}
