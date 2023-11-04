import { GenericView } from "src/models/common/Generics";
import { InjectionKey } from "vue";

export const GenericViewKey: InjectionKey<GenericView<any[]>> = Symbol('_GenericView')
