import { QTableColumn, is } from "quasar";
import { useRules } from "src/composables/UseRules";
import { useExpansions } from "src/composables/client/UseExpansions";
import { useWeapons } from "src/composables/client/UseWeapons";
import { Weapon } from "src/models/api/Weapons";
import { FormItem } from "src/models/common/Generics";
import { t } from "src/plugins/I18n";

const rules = useRules();
const expansions = useExpansions();
const weapons = useWeapons();

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
    name: 'rangeShort',
    label: t('common.labels.rangeShort'),
    field: (row) => row.rangeShort ? row.rangeShort + '"' : '',
    sortable: true,
    align: 'left',
  },
  {
    name: 'rangeLong',
    label: t('common.labels.rangeLong'),
    field: (row) => row.rangeLong ? row.rangeLong + '"' : '',
    sortable: true,
    align: 'left',
  },
  {
    name: 'saveModification',
    label: t('common.labels.saveModification'),
    field: 'saveModification',
    sortable: true,
    align: 'left',
  },
  {
    name: 'initiative',
    label: t('common.labels.initiative'),
    field: 'initiative',
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
    name: 'types',
    label: t('common.labels.types'),
    field: 'types',
    align: 'left',
  },
  {
    name: 'options',
    label: '',
    align: 'left',
  },
] as QTableColumn<Weapon>[]

export const weaponForm: FormItem[] = [
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
      label: t('common.labels.rangeShort'),
      mask: '##',
      suffix: '"',
      hint: '',
      unmaskedValue: true,
    },
    queryName: 'rangeShort',
  },
  {
    type: 'input',
    fieldProps: {
      label: t('common.labels.rangeLong'),
      mask: '##',
      suffix: '"',
      hint: '',
      unmaskedValue: true,
    },
    queryName: 'rangeLong',
  },
  {
    type: 'input',
    fieldProps: {
      label: t('common.labels.saveModification'),
      hint: '',
      type: 'number',
    },
    queryName: 'saveModification',
  },
  {
    type: 'input',
    fieldProps: {
      label: t('common.labels.initiative'),
      mask: '#',
      hint: '',
    },
    queryName: 'initiative',
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
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.types'),
      multiple: true,
    },
    queryName: 'types',
    service: weapons.getWeaponTypesSelect,
  },
]
