import { QTableColumn } from "quasar";
import { Weapon } from "src/models/api/Weapons";
import { t } from "src/plugins/I18n";

export const columns = [
  {
    name: 'id',
    label: t('common.labels.id'),
    field: 'id',
    sortable: true,
    align: 'left'
  },
  {
    name: 'name',
    label: t('common.labels.name'),
    field: 'name',
    sortable: true,
    align: 'left'
  },
  {
    name: 'rangeShort',
    label: t('common.labels.rangeShort'),
    field: (row) => row.rangeShort ? row.rangeShort + '"' : '',
    sortable: true,
    align: 'left'
  },
  {
    name: 'rangeLong',
    label: t('common.labels.rangeLong'),
    field: (row) => row.rangeLong ? row.rangeLong + '"' : '',
    sortable: true,
    align: 'left'
  },
  {
    name: 'saveModification',
    label: t('common.labels.saveModification'),
    field: 'saveModification',
    sortable: true,
    align: 'left'
  },
  {
    name: 'initiative',
    label: t('common.labels.initiative'),
    field: 'initiative',
    sortable: true,
    align: 'left'
  },
  {
    name: 'bookPage',
    label: t('common.labels.bookPage'),
    field: 'bookPage',
    sortable: true,
    align: 'left'
  },
  {
    name: 'expansionId',
    label: t('common.labels.expansion'),
    field: (row) => row.book.book,
    sortable: true,
    align: 'left'
  },
  {
    name: 'types',
    label: t('common.labels.types'),
    field: 'types',
    align: 'left'
  },
  {
    name: 'options',
    label: '',
    align: 'left'
  },
] as QTableColumn<Weapon>[]
