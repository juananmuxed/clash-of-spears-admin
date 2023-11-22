import { QBtn, QCard, QCardActions, QCardProps, QCardSection, QDialog, QForm, QFormProps, QInput, QSelect, QSpace, QToggle, QToolbarProps } from "quasar";
import { t } from "src/plugins/I18n";
import { GenericView } from "./GenericView";
import { FormItem } from "src/models/common/Generics";
import { FetchResponse } from "src/models/fetch/FetchResponse";

export function genericFormDialog<T extends Record<string, any>>({
  $scope,
  dialogTitle,
}: {
  dialogTitle?: string,
  $scope: GenericView<T>;
}) {
  const isCreatingItem = ref(false);
  const dialogVisible = ref(false);

  const itemsValues: Ref<Record<string, string | number | boolean | undefined>> = ref({});
  const cardLoading = computed(() => $scope.createService?.isFetching || $scope.updateService?.isFetching);

  const openCreateDialog = () => {
    isCreatingItem.value = true;
    dialogVisible.value = true;
  };

  const openEditDialog = (itemToEdit: T) => {
    isCreatingItem.value = false;
    dialogVisible.value = true;

    itemsValues.value = { ...itemToEdit };
  };

  const closeDialog = () => {
    dialogVisible.value = false;

    itemsValues.value = {};
  };

  async function submitForm() {
    if (!cardLoading.value) {
      let response: FetchResponse<unknown> | undefined;

      if (isCreatingItem.value) {
        response = await $scope.createService?.execute(itemsValues.value);
      } else {
        response = await $scope.updateService?.execute(itemsValues.value);
      }

      if (!response?.isError) {
        $scope.tableService.execute();

        closeDialog();
      }
    }
  }

  function renderFormItem(item: FormItem) {
    let render: VNode;
    switch (item.type) {
      case 'select':
        render = h(
          QSelect,
          {
            ...item.fieldProps,
            ...item.service.selectBind,
            outlined: true,
            class: 'col-12 col-sm-6',
            modelValue: itemsValues.value[item.queryName],
            "onUpdate:modelValue": (newValue: string | number | undefined) => itemsValues.value[item.queryName] = newValue,
          }
        )
        break;
      case 'switch':
        render = h(
          QToggle,
          {
            ...item.fieldProps,
            class: 'col-12 col-sm-6',
            modelValue: itemsValues.value[item.queryName] || false,
            "onUpdate:modelValue": (newValue: boolean | undefined) => itemsValues.value[item.queryName] = newValue,
          }
        )
        break;
      default:
        render = h(
          QInput,
          {
            ...item.fieldProps,
            outlined: true,
            class: 'col-12 col-sm-6',
            modelValue: itemsValues.value[item.queryName],
            "onUpdate:modelValue": (newValue: string | number | undefined) => itemsValues.value[item.queryName] = newValue,
          },
        );
        break;
    }
    return render;
  }

  function fillSelects() {
    if (!$scope.dialogForm) return;
    for (let i = 0; i < $scope.dialogForm.length; i++) {
      const filter = $scope.dialogForm[i];
      if (filter.type === 'select' && filter.service) {
        filter.service.selectBindExecute();
      }
    }
  }

  fillSelects();

  function getDialog() {
    return h(
      QDialog,
      { modelValue: dialogVisible.value, onHide: () => closeDialog() },
      () => h(
        QCard,
        { style: 'width: 700px; max-width: 80vw;', loading: cardLoading.value } as QCardProps,
        () => [
          h(QCardSection,
            { class: 'row items-center' },
            () => [
              h(
                'div',
                { class: 'text-h5' },
                (isCreatingItem.value ? t('common.titles.newItem', {
                  item: dialogTitle || t('common.titles.item')
                }) : t('common.titles.editItem', {
                  item: dialogTitle || t('common.titles.item')
                }))
              ),
              h(QSpace),
              h(QBtn, {
                icon: 'fas fa-close',
                flat: true,
                round: true,
                dense: true,
                onClick: closeDialog
              })
            ]
          ),
          h(QForm,
            { onSubmit: submitForm },
            () => [
              h(QCardSection,
                {
                  class: 'row q-col-gutter-sm',
                },
                () => $scope.dialogForm?.map((input) => renderFormItem(input))
              ),
              h(QCardActions,
                {
                  align: 'center',
                },
                () => [
                  h(QBtn, {
                    label: isCreatingItem.value ? t('common.buttons.create') : t('common.buttons.edit'),
                    type: 'submit',
                    unelevated: true,
                    padding: 'sm xl',
                    rounded: true,
                    color: 'primary',
                    loading: cardLoading.value,
                  })
                ]
              )
            ]
          ),
        ]
      )
    )
  }

  return {
    getDialog,
    openCreateDialog,
    openEditDialog,
  }
}
