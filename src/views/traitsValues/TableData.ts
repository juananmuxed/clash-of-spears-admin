import { QTableColumn } from "quasar";
import { useRules } from "src/composables/UseRules";
import { useArmors } from "src/composables/client/UseArmors";
import { useWeapons } from "src/composables/client/UseWeapons";
import { TraitValue } from "src/models/api/Traits";
import { FormItem } from "src/models/common/Generics";
import { t } from "src/plugins/I18n";

const rules = useRules();
const weapons = useWeapons();
const armors = useArmors();

export const columns = [
  {
    name: 'id',
    label: t('common.labels.id'),
    field: 'id',
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
    name: 'weaponId',
    label: t('common.labels.weapon'),
    field: (row) => row.weapon?.name,
    sortable: true,
    align: 'left',
  },
  {
    name: 'armorId',
    label: t('common.labels.armor'),
    field: (row) => row.armor?.name,
    sortable: true,
    align: 'left',
  },
  {
    name: 'options',
    label: '',
    align: 'left',
  },
] as QTableColumn<TraitValue>[];

export const traitValueForm: FormItem[] = [
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
      label: t('common.labels.value'),
      mask: '#',
    },
    queryName: 'value',
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.weapon'),
    },
    queryName: 'weaponId',
    service: weapons.getWeaponsSelect,
  },
  {
    type: 'select',
    fieldProps: {
      label: t('common.labels.armor'),
    },
    queryName: 'weaponId',
    service: armors.getArmorsSelect,
  },
];
