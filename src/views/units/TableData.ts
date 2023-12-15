import { QTableColumn } from "quasar";
import { useRules } from "src/composables/UseRules";
import { Unit } from "src/models/api/Units";
import { FormItem } from "src/models/common/Generics";
import { t } from "src/plugins/I18n";

const rules = useRules();

export const columns = [
  {
    name: 'id',
    label: t('common.labels.id'),
    field: 'id',
    sortable: true,
    align: 'left',
  },
  {
    name: 'name',
    label: t('common.labels.name'),
    field: 'name',
    sortable: true,
    align: 'left',
  },
  {
    name: 'options',
    label: '',
    align: 'left',
  },
] as QTableColumn<Unit>[];

export const unitForm: FormItem[] = [
  {
    type: 'input',
    fieldProps: {
      label: t('common.labels.id'),
      mask: '##########',
      rules: [rules.isRequired],
    },
    queryName: 'id',
  },
  {
    type: 'input',
    fieldProps: {
      label: t('common.labels.name'),
      rules: [rules.isRequired],
    },
    queryName: 'name',
  },
];
