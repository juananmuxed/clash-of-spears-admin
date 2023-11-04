import {
  Fetch, UseFetch, DataNoUndefined, FetchOptions, DataUnWrap,
} from 'src/types/UseFetch.type';

import { SelectBind, SelectBindConfig, OptionLabel } from '../composables/UseSelectBind';

type UseFetchSelectOptional<T extends Fetch>= FetchOptions<T> & SelectBindConfig<DataUnWrap<T>> & {
  optionValue?: keyof (DataUnWrap<T>);
  optionLabel?: OptionLabel<(DataUnWrap<T>)>;
}

type UseFetchSelectOptionalValueRequired<T extends Fetch>= UseFetchSelectOptional<T> & {
  optionValue: keyof (DataUnWrap<T>);
}

type UseFetchSelectOptionalLabelRequired<T extends Fetch>= UseFetchSelectOptional<T> & {
  optionLabel: OptionLabel<(DataUnWrap<T>)>;
}

type UseFetchSelectOptionalRequired<T extends Fetch>= UseFetchSelectOptional<T> & {
  optionValue: keyof (DataUnWrap<T>) | undefined;
  optionLabel: OptionLabel<(DataUnWrap<T>)>;
}

type UseFetchSelectArgsOptional<T extends Fetch> = [
  response: T,
  options?:UseFetchSelectOptional<T>
]

type UseFetchSelectArgsValueRequired<T extends Fetch> = [
  response: T,
  options: UseFetchSelectOptionalValueRequired<T>
]

type UseFetchSelectBindArgsLabelRequired<T extends Fetch> = [
  response: T,
  options: UseFetchSelectOptionalLabelRequired<T>
]

type UseFetchSelectArgsRequired<T extends Fetch> = [
  response: T,
  options: UseFetchSelectOptionalRequired<T>
]

export type UseFetchSelectArgs<T extends Fetch> = DataNoUndefined<T> extends {'id': number | string; 'descripcion': string}[] | string[] | number[]
  ? UseFetchSelectArgsOptional<T>
  : DataNoUndefined<T> extends {'descripcion': string }[]
    ? UseFetchSelectArgsValueRequired<T>
    : DataNoUndefined<T> extends {'id': number | string }[]
      ? UseFetchSelectBindArgsLabelRequired<T>
      : UseFetchSelectArgsRequired<T>

export interface UseFetchSelect<T extends Fetch> extends UseFetch<T, DataNoUndefined<T>> {
  selectBind: SelectBind<DataNoUndefined<T> extends Array<infer U> ? U : DataNoUndefined<T>>;
  selectBindExecute: (...payload: Parameters<T>)=> SelectBind<DataNoUndefined<T> extends Array<infer U> ? U : DataNoUndefined<T>>;
}
