import { QTableColumn } from "quasar";
import { useRules } from "src/composables/UseRules";
import { useExpansions } from "src/composables/client/UseExpansions";
import { Army } from "src/models/api/Armies";
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
    name: 'active',
    label: t('common.labels.active'),
    field: 'active',
    sortable: true,
    align: 'left',
  },
  {
    name: 'imgUrl',
    label: t('common.labels.imgUrl'),
    field: 'imgUrl',
    sortable: true,
    align: 'left',
  },
  {
    name: 'expansionId',
    label: t('common.labels.expansionId'),
    field: 'expansionId',
    sortable: true,
    align: 'left',
  },
  {
    name: 'isWarParty',
    label: t('common.labels.isWarParty'),
    field: 'isWarParty',
    sortable: true,
    align: 'left',
  },
  {
    name: 'options',
    label: '',
    align: 'left',
  },
] as QTableColumn<Army>[];

export const armyForm: FormItem[] = [
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
      label: t('common.labels.imgUrl'),
      hint: '',
    },
    queryName: 'imageUrl',
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.expansionId'),
      hint: '',
    },
    queryName: 'expansionId',
    service: expansions.getExpansionsSelect
  },
  {
    type: 'switch',
    fieldProps: {
      label: t('common.labels.isWarParty'),
    },
    queryName: 'isWarParty',
  },
];
