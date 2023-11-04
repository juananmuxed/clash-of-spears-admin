import { ShallowRef, Ref } from 'vue';

import { QSelect } from 'quasar';

type Value<T> = T extends number | string ? never : keyof T
export type OptionLabel<T> = Value<Exclude<T, undefined>> | ((item?: T) => string);

export interface SelectBindConfig<T> {
  optionValue?: Value<T>;
  optionLabel?: OptionLabel<T>;
  emitValue?: boolean;
  mapOptions?: boolean;
  displayValueTruncated?: boolean;
  useInput?: boolean;
  noValueText?: false | string;
}
export type SelectBind<T> = Partial<QSelect> & {
  options: T[] | undefined;
  optionLabel: OptionLabel<T>;
}

/**
 * @summary function is designed to create a reactive binding for a select component in Vue.js. It allows for customization of the select options and labels, as well as handling loading states and input functionality.
 @param list: a Ref or ShallowRef containing an array of objects or values to be used as select options
 @param loading: an optional Ref to handle loading state of the select component
 @param props: an optional object containing configuration options for the select component
 @returns {TUseFetch} An SelectBind object containing:
  - options: the provided list of options as a reactive Ref
  - propsBind: the configuration options for the select component as a NSelect object
*/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSelectBind<T extends Record<string, any> | string | number>(
  list: Ref<T[]> | ShallowRef<T[] | undefined>,
  loading?: globalThis.Ref<boolean> | undefined,
  props?: SelectBindConfig<T>,
) {
  const $options = list || ref<T[]>([]) as Ref<T[]>;

  const propsBind: Partial<QSelect> = {};
  propsBind.loading = (loading || ref(false)) as unknown as boolean;

  const {
    optionValue = 'id' as Value<T>,
    optionLabel = ((item: T) => (item as Record<string, unknown>)?.name ?? `${item}`) as OptionLabel<T>,
    emitValue = true,
    mapOptions = true,
    useInput,
  } = props ?? {};

  propsBind.optionValue = optionValue;
  propsBind.optionLabel = optionLabel;
  propsBind.emitValue = emitValue;
  propsBind.mapOptions = mapOptions;
  propsBind.useInput = useInput;

  if (propsBind.useInput) {
    propsBind.hideSelected = true;
    propsBind.fillInput = true;
    propsBind.inputDebounce = 0;
  }
  // @ts-ignore
  return reactive({
    options: $options,
    ...propsBind,
  }) as SelectBind<T>;
}
