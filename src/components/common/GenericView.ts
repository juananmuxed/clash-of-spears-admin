import {
  Dialog,
  QBtn,
  QBtnProps,
  QCard,
  QCardActions,
  QCardActionsProps,
  QCardSection,
  QChip,
  QChipProps,
  QIcon,
  QIconProps,
  QTable,
  QTableColumn,
  QTableProps,
  QTd,
  QTooltip
} from "quasar";
import { _GenericViewType } from "src/models/common/Generics";
import { Pagination } from "src/models/fetch/Pagination";
import { GenericViewKey } from "src/types/Symbols";
import { defaultListPaginatedResponseData } from 'src/data/default/FetchResponse';
import { t } from "src/plugins/I18n";
import { is } from "src/utils/Is";
import { genericFormDialog } from "./GenericFormDialog";

export type GenericView<T extends Record<string, any>> = _GenericViewType<T>;
export const GenericView = <T extends Record<string, any> = Record<string, any>>() => {
  return {
    GenericViewVue: defineComponent({
      name: 'GenericView',
      props: {
        columns: { type: Object as PropType<QTableColumn<T>[]>, required: true },
        title: { type: String as PropType<string>, default: '' },
        dialogTitle: { type: String as PropType<string>, default: undefined },
        pagination: {
          type: Object as PropType<Pagination>,
          default: undefined,
        },
      },

      setup(props) {
        const $scope = inject(GenericViewKey) as GenericView<T>;

        if (!$scope.tableService) {
          throw new Error('GenericView need tableService');
        }

        const utilIs = is();

        const loading = computed(() => $scope.tableService.isFetching || $scope.removeService.isFetching)
        const pagination = ref<Pagination>({
          ...defaultListPaginatedResponseData(),
          sortBy: '',
          rowsNumber: 'pagination' in $scope.tableService ? defaultListPaginatedResponseData().rowsPerPage : undefined,
          ...props.pagination,
        });

        const formDialog = genericFormDialog<T>({
          $scope,
          dialogTitle: props.dialogTitle,
        })

        async function onRequest() {
          if (!loading.value) {
            if ('pagination' in $scope.tableService) {
              $scope.tableService.pagination = {
                ...pagination.value,
              };
            }

            await $scope.tableService.execute()
          }
        }

        onRequest();

        async function onRemove(item: T) {
          await $scope.removeService.execute(item);
          $scope.tableService.execute()
        }

        function removeItem(item: T) {
          if (!loading.value) {
            Dialog.create({
              title: t('common.titles.deleteItem', { item: props.dialogTitle }),
              message: t('common.messages.confirmDelete', { item: props.dialogTitle, id: item.id }),
              cancel: true,
              persistent: true,
            })
              .onOk(() => onRemove(item))
          }
        }

        function renderBodyCellOptions(row: T) {
          return h(
            QTd,
            { class: 'center q-gutter-sm' },
            () => [
              h(
                QBtn,
                {
                  round: true,
                  unelevated: true,
                  dense: true,
                  color: 'primary',
                  onClick: () => formDialog.openEditDialog(row)
                } as QBtnProps,
                () => [
                  h(QIcon, { name: 'fas fa-pen-to-square', size: 'xs' }),
                  h(QTooltip, () => t('common.labels.edit')),
                ]
              ),
              h(
                QBtn,
                {
                  round: true,
                  unelevated: true,
                  dense: true,
                  color: 'negative',
                  onClick: () => removeItem(row),
                } as QBtnProps,
                () => [
                  h(QIcon, { name: 'fas fa-trash', size: 'xs' } as QIconProps),
                  h(QTooltip, () => t('common.labels.remove')),
                ]
              )
            ]
          )
        }

        function renderBodyCell(row: T) {
          const val = row.value;
          return utilIs.array(val) ? h(
            QTd,
            () => val
              .filter((item) => 'name' in item)
              .map((item) => h(
                QChip,
                {
                  label: item.name,
                  color: 'secondary',
                  textColor: 'white',
                  size: 'sm'
                } as QChipProps
              ))
          )
            : h(QTd, () => val)
        }

        return () => {
          return h(
            QCard,
            { class: 'q-ma-lg' },
            () => [
              h(QCardSection, () => h('div', { class: 'text-h5 text-uppercase' }, props.title)),
              h(
                QCardSection,
                () => h(
                  QTable,
                  {
                    columns: props.columns,
                    pagination: pagination.value,
                    'onUpdate:pagination': (data) => pagination.value = { ...data },
                    binaryStateSort: true,
                    flat: true,
                    rowKey: 'id',
                    loading: loading.value,
                    rows: $scope.tableService.data,
                    rowsPerPageOptions: [5, 10, 15, 20, 50],
                    onRequest: (request) => {
                      pagination.value = { ...request.pagination }
                      onRequest()
                    }
                  } as QTableProps,
                  {
                    'body-cell-options': (body: { row: T }) => renderBodyCellOptions(body.row),
                    'body-cell': (row: T) => renderBodyCell(row),
                  },
                )
              ),
              h(QCardActions, { align: 'right' } as QCardActionsProps,
                $scope.createService ? () => h(QBtn, {
                  label: t('common.buttons.add'),
                  rounded: true,
                  color: 'positive',
                  unelevated: true,
                  padding: 'sm xl',
                  onClick: formDialog.openCreateDialog
                } as QBtnProps) : undefined
              ),
              formDialog.getDialog()
            ],
          );
        };
      }
    })
  }
}

export const GenericViewVue = GenericView();
