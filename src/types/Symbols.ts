import { GenericView } from "src/components/common/GenericView";
import { InjectionKey } from "vue";

export const GenericViewKey: InjectionKey<GenericView<Record<string, unknown>>> = Symbol('_GenericView')
