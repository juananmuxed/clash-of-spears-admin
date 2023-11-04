import type {
  FetchOptions, Data, DataNoUndefined, Fetch, UseFetch,
} from 'src/types/UseFetch.type';
import { FetchResponse } from 'src/models/fetch/FetchResponse';

import { errorFetchResponse } from 'src/data/default/FetchResponse';
import { errorDialogHandler, notifyResponseHandler } from 'src/utils/ErrorHandler';
import { is } from 'src/utils/Is';

/**
 * @summary Custom hook that provides a simple way to handle fetching data from an API. It aims to simplify the process of making API requests and handling the responses by providing a set of options that can be customized to fit the specific needs of the application.
 @desc Flow:
1. The function initializes the $options object by merging the input options with default values.
2. It creates reactive variables to store the state of the request and the response.
3. It uses the fetchMemoized function to memoize the request function if the useMemoize option is set.
4. It defines the execute function that executes the request and updates the state variables accordingly.
5. It handles errors and notifies the user if the showError option is set.
6. It returns a reactive object that contains the state variables and the execute function.
 @param request: a function that returns a Promise containing the response data
 @param options: an object containing optional parameters to customize the behavior of the hook
 @returns {UseFetch} TUseFetch
- data: a reactive variable containing the response data
- execute: a function that executes the request and updates the reactive variables
- isFinished: a reactive variable indicating whether the request has finished
- isFetching: a reactive variable indicating whether the request is currently fetching
- response: a reactive variable containing the response object
*/
export function useFetch<T extends Fetch>(request: T,
  options: Partial<FetchOptions<T>> & { initialData: DataNoUndefined<T> }): UseFetch<T, DataNoUndefined<T>>
export function useFetch<T extends Fetch>(request: T, options?: Partial<FetchOptions<T>>): UseFetch<T>
export function useFetch<T extends Fetch>(request: T, options?: Partial<FetchOptions<T>>): UseFetch<T> {
  const $options: FetchOptions<T> = {
    immediate: false, initialData: undefined, showError: true, ...options,
  };

  const utilIs = is();

  const isFinished = ref(false);
  const isFetching = ref(false);

  const data: Ref<Data<T> | undefined> = ref($options?.initialData);
  const response = shallowRef<Readonly<FetchResponse<T | undefined>> | undefined>();
  const isResponseValid = computed(() => !!response.value?.status);

  const loading = (isLoading: boolean) => {
    isFetching.value = isLoading;
    isFinished.value = !isLoading;
  };
  const execute = async (...payload: Parameters<T>) => {
    loading(true);

    const $payload = utilIs.array(payload) ? payload : [payload ?? []] as Parameters<T>;
    try {
      response.value = await request($payload);
    } catch (error) {
      response.value = errorFetchResponse(error);
    }

    if (isResponseValid.value) {
      if (response.value.isError) {
        data.value = $options.initialData;
        $options.onError?.(response.value);
      } else {
        data.value = utilIs.nullOrWhiteSpace(response.value.data) ? $options.initialData : response.value.data;
        $options.onSuccess?.(response.value);
      }

      if ($options.showError) {
        if ($options.useDialogError && response.value.isError) {
          errorDialogHandler(response.value, $options.useDialogError);
        } else {
          notifyResponseHandler(response.value, {
            successMessage: $options.successMessage,
            errorMessage: $options.errorMessage,
          });
        }
      }
    }

    loading(false);

    return response.value;
  };

  if ($options.immediate) {
    execute(...[$options.payload] as Parameters<T>);
  }

  const shell = reactive({
    data,
    execute,
    isFinished,
    isFetching,
    response,
  }) as UseFetch<T>;

  return shell;
}
