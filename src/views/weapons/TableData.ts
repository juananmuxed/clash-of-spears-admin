import { QTableColumn } from "quasar";
import { Weapon } from "src/models/api/Weapons";
import { t } from "src/plugins/I18n";

export const columns = [
  {
    name: 'id',
    label: t('common.labels.id'),
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    label: t('common.labels.name'),
    field: 'name',
    sortable: true,
  },
  {
    name: 'rangeShort',
    label: t('common.labels.rangeShort'),
    field: (row) => row.rangeShort ? row.rangeShort + '"' : '',
    sortable: true,
  },
  {
    name: 'rangeLong',
    label: t('common.labels.rangeLong'),
    field: (row) => row.rangeLong ? row.rangeLong + '"' : '',
    sortable: true,
  },
  {
    name: 'saveModification',
    label: t('common.labels.saveModification'),
    field: 'saveModification',
    sortable: true,
  },
  {
    name: 'initiative',
    label: t('common.labels.initiative'),
    field: 'initiative',
    sortable: true,
  },
  {
    name: 'bookPage',
    label: t('common.labels.bookPage'),
    field: 'bookPage',
    sortable: true,
  },
  {
    name: 'expansionId',
    label: t('common.labels.expansion'),
    field: (row) => row.book.name,
    sortable: true,
  },
  {
    name: 'types',
    label: t('common.labels.types'),
    field: 'types',
  },
] as QTableColumn<Weapon>[]
