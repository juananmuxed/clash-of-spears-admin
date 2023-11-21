import { QTableColumn } from "quasar";
import { useRules } from "src/composables/UseRules";
import { Expansion } from "src/models/api/Expansions";
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
    name: 'active',
    label: t('common.labels.active'),
    field: 'active',
    sortable: true,
    align: 'left',
  },
  {
    name: 'book',
    label: t('common.labels.book'),
    field: 'book',
    sortable: true,
    align: 'left',
  },
  {
    name: 'options',
    label: '',
    align: 'left',
  },
] as QTableColumn<Expansion>[];

export const expansionForm: FormItem[] = [
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
  {
    type: 'switch',
    fieldProps: {
      label: t('common.labels.active'),
    },
    queryName: 'active',
  },
  {
    type: 'input',
    fieldProps: {
      label: t('common.labels.book'),
      hint: '',
    },
    queryName: 'bookPage',
  },
];
