import {
  Dialog,
  Notify,
  QBtn,
  QBtnProps,
  QCard,
  QCardActions,
  QCardActionsProps,
  QCardSection,
  QChip,
  QChipProps,
  QFile,
  QFileProps,
  QForm,
  QFormProps,
  QIcon,
  QIconProps,
  QRejectedEntry,
  QSpace,
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
import { useRules } from "src/composables/UseRules";
import { MIME_TYPES } from "src/constants/MimeTypes";

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

        const file = ref();

        const rules = useRules();

        const loading = computed(() => $scope.tableService.isFetching
          || $scope.uploadService?.isFetching
          || $scope.removeService?.isFetching)
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

        const submitFile = async () => {
          await $scope.uploadService?.execute(file.value);
          $scope.tableService.execute()
        }

        const onRejectFile = (rejectedEntries: QRejectedEntry[]) => {
          console.log(rejectedEntries)
          for (let i = 0; i < rejectedEntries.length; i++) {
            Notify.create({
              type: 'negative',
              message: t('common.messages.rejectFile')
                + rejectedEntries[i].file.name
                + ' ' + rejectedEntries[i].failedPropValidation,
            });
          }
        }

        async function onRequest() {
          if (!loading.value) {
            if ('pagination' in $scope.tableService) {
              const listPagination = $scope.tableService.pagination;
              $scope.tableService.pagination = {
                ...pagination.value,

                rowsNumber: listPagination?.rowsNumber,
              };
            }

            await $scope.tableService.execute();

            if ('pagination' in $scope.tableService) {
              pagination.value.rowsNumber = $scope.tableService.pagination?.rowsNumber;
            }
          }
        }

        onRequest();

        async function onRemove(item: T) {
          await $scope.removeService?.execute(item);
          $scope.tableService.execute({ ...pagination.value })
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
              h(QCardActions, { align: 'right', class: 'row items-start' } as QCardActionsProps,
                () => [
                  $scope.uploadService ? h(QForm, {
                    onSubmit: submitFile,
                    class: 'row items-start q-gutter-sm',
                  } as QFormProps,
                    () => [
                      h(QFile, {
                        modelValue: file.value,
                        dense: true,
                        label: t('common.labels.csvFile'),
                        accept: MIME_TYPES.CSV.join(','),
                        clearable: true,
                        rules: [rules.isRequired],
                        outlined: true,
                        loading: loading.value,
                        onRejected: onRejectFile,
                        "onUpdate:modelValue": (val) => file.value = val,
                      } as QFileProps),
                      h(QBtn, {
                        label: t('common.buttons.upload'),
                        rounded: true,
                        loading: loading.value,
                        color: 'primary',
                        unelevated: true,
                        padding: 'sm xl',
                        type: 'submit',
                      })
                    ]
                  ) : undefined,
                  h(QSpace),
                  $scope.createService ? h(QBtn, {
                    label: t('common.buttons.add'),
                    rounded: true,
                    color: 'positive',
                    unelevated: true,
                    padding: 'sm xl',
                    onClick: formDialog.openCreateDialog,
                  } as QBtnProps) : undefined,
                ]
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
