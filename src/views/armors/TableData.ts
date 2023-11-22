import { QTableColumn } from "quasar";
import { useRules } from "src/composables/UseRules";
import { useExpansions } from "src/composables/client/UseExpansions";
import { Armor } from "src/models/api/Armors";
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
    name: 'special',
    label: t('common.labels.special'),
    field: 'special',
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
] as QTableColumn<Armor>[];

export const armorForm: FormItem[] = [
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
    type: 'input',
    fieldProps: {
      label: t('common.labels.value'),
      mask: '#',
      hint: '',
    },
    queryName: 'value',
  },
  {
    type: 'switch',
    fieldProps: {
      label: t('common.labels.special'),
    },
    queryName: 'special',
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
