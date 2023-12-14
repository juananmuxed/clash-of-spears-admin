import { QTableColumn } from "quasar";
import { useRules } from "src/composables/UseRules";
import { useArmies } from "src/composables/client/UseArmies";
import { useArmors } from "src/composables/client/UseArmors";
import { useTraits } from "src/composables/client/UseTraits";
import { useWeapons } from "src/composables/client/UseWeapons";
import { Option } from "src/models/api/Options";
import { FormItem } from "src/models/common/Generics";
import { t } from "src/plugins/I18n";

const rules = useRules();
const weapons = useWeapons();
const armors = useArmors();
const armies = useArmies();
const traits = useTraits();

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
    name: 'cost',
    label: t('common.labels.cost'),
    field: 'cost',
    sortable: true,
    align: 'left',
  },
  {
    name: 'fixedCost',
    label: t('common.labels.fixedCost'),
    field: 'fixedCost',
    sortable: true,
    align: 'left',
  },
  {
    name: 'fixedUnits',
    label: t('common.labels.fixedUnits'),
    field: 'fixedUnits',
    sortable: true,
    align: 'left',
  },
  {
    name: 'upgradeWeapon',
    label: t('common.labels.weapon'),
    field: (row) => row.weapon?.name,
    sortable: true,
    align: 'left',
  },
  {
    name: 'upgradeShield',
    label: t('common.labels.shield'),
    field: (row) => row.shield?.name,
    sortable: true,
    align: 'left',
  },
  {
    name: 'upgradeBody',
    label: t('common.labels.body'),
    field: (row) => row.body?.name,
    sortable: true,
    align: 'left',
  },
  {
    name: 'upgradeBarding',
    label: t('common.labels.barding'),
    field: (row) => row.barding?.name,
    sortable: true,
    align: 'left',
  },
  {
    name: 'armies',
    label: t('common.labels.armies'),
    field: 'armies',
    align: 'left',
  },
  {
    name: 'incompatibleShields',
    label: t('common.labels.incompatibleShields'),
    field: 'incompatibleShields',
    align: 'left',
  },
  {
    name: 'neededWeapons',
    label: t('common.labels.neededWeapons'),
    field: 'neededWeapons',
    align: 'left',
  },
  {
    name: 'incompatibleWeapons',
    label: t('common.labels.incompatibleWeapons'),
    field: 'incompatibleWeapons',
    align: 'left',
  },
  {
    name: 'upgradeTraits',
    label: t('common.labels.upgradeTraits'),
    field: 'upgradeTraits',
    align: 'left',
  },
  {
    name: 'neededTraits',
    label: t('common.labels.neededTraits'),
    field: 'neededTraits',
    align: 'left',
  },
  {
    name: 'removeTraits',
    label: t('common.labels.removeTraits'),
    field: 'removeTraits',
    align: 'left',
  },
  {
    name: 'incompatibleTraits',
    label: t('common.labels.incompatibleTraits'),
    field: 'incompatibleTraits',
    align: 'left',
  },
  {
    name: 'options',
    label: '',
    align: 'left',
  },
] as QTableColumn<Option>[];

export const optionForm: FormItem[] = [
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
      label: t('common.labels.cost'),
      mask: '###',
      rules: [rules.isRequired],
    },
    queryName: 'cost',
  },
  {
    type: 'input',
    fieldProps: {
      label: t('common.labels.fixedCost'),
      mask: '###',
    },
    queryName: 'fixedCost',
  },
  {
    type: 'input',
    fieldProps: {
      label: t('common.labels.fixedUnits'),
      mask: '###',
    },
    queryName: 'fixedUnits',
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.weapon'),
      hint: '',
    },
    queryName: 'upgradeWeapon',
    service: weapons.getWeaponsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.body'),
      hint: '',
    },
    queryName: 'upgradeBody',
    service: armors.getArmorsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.shield'),
      hint: '',
    },
    queryName: 'upgradeShield',
    service: armors.getArmorsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.barding'),
      hint: '',
    },
    queryName: 'upgradeBarding',
    service: armors.getArmorsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.armies'),
      hint: '',
      multiple: true,
      useChips: true,
      clearable: true,
    },
    queryName: 'armies',
    service: armies.getArmiesSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.incompatibleShields'),
      hint: '',
      multiple: true,
      useChips: true,
      clearable: true,
    },
    queryName: 'incompatibleShields',
    service: armors.getArmorsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.neededWeapons'),
      hint: '',
      multiple: true,
      useChips: true,
      clearable: true,
    },
    queryName: 'neededWeapons',
    service: weapons.getWeaponsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.incompatibleWeapons'),
      hint: '',
      multiple: true,
      useChips: true,
      clearable: true,
    },
    queryName: 'incompatibleWeapons',
    service: weapons.getWeaponsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.upgradeTraits'),
      hint: '',
      multiple: true,
      useChips: true,
      clearable: true,
    },
    queryName: 'upgradeTraits',
    service: traits.getTraitsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.neededTraits'),
      hint: '',
      multiple: true,
      useChips: true,
      clearable: true,
    },
    queryName: 'neededTraits',
    service: traits.getTraitsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.removeTraits'),
      hint: '',
      multiple: true,
      useChips: true,
      clearable: true,
    },
    queryName: 'removeTraits',
    service: traits.getTraitsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.incompatibleTraits'),
      hint: '',
      multiple: true,
      useChips: true,
      clearable: true,
    },
    queryName: 'incompatibleTraits',
    service: traits.getTraitsSelect,
  },
]
