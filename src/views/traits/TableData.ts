import { QTableColumn } from "quasar";
import { useRules } from "src/composables/UseRules";
import { useExpansions } from "src/composables/client/UseExpansions";
import { Trait } from "src/models/api/Traits";
import { FormItem } from "src/models/common/Generics";
import { t } from "src/plugins/I18n";

const rules = useRules();
const expansions = useExpansions();

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
    name: 'value',
    label: t('common.labels.value'),
    field: 'value',
    sortable: true,
    align: 'left',
  },
  {
    name: 'requires',
    label: t('common.labels.requires'),
    field: 'requires',
    sortable: true,
    align: 'left',
  },
  {
    name: 'bookPage',
    label: t('common.labels.bookPage'),
    field: 'bookPage',
    sortable: true,
    align: 'left',
  },
  {
    name: 'expansionId',
    label: t('common.labels.expansion'),
    field: (row) => row.book?.book,
    sortable: true,
    align: 'left',
  },
  {
    name: 'options',
    label: '',
    align: 'left',
  },
] as QTableColumn<Trait>[];

export const traitForm: FormItem[] = [
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
      label: t('common.labels.value'),
    },
    queryName: 'value',
  },
  {
    type: 'switch',
    fieldProps: {
      label: t('common.labels.requires'),
    },
    queryName: 'requires',
  },
  {
    type: 'input',
    fieldProps: {
      label: t('common.labels.bookPage'),
      mask: '#####',
      hint: '',
      unmaskedValue: true,
      rules: [rules.isRequired],
    },
    queryName: 'bookPage',
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.expansion'),
      rules: [rules.isRequired],
    },
    queryName: 'expansionId',
    service: expansions.getExpansionsSelect,
  },
];