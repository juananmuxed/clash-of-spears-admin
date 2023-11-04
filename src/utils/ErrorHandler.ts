import { Component } from 'vue';

import { FetchResponse } from 'src/models/fetch/FetchResponse';
import { Dialog, DialogChainObject, Notify, QDialogOptions } from 'quasar';
import { is } from './Is';

export type ErrorDialogHandler = { key: string | true; config: QDialogOptions; dialogComponent?: Component } | string | true;

const utilIs = is();

export async function notifyResponseHandler<T>(
  response: FetchResponse<T>,
  { successMessage, errorMessage }: { successMessage?: string; errorMessage?: string } = {},
) {
  if (response) {
    if (!response.isError && successMessage) {
      await Notify.create({ type: 'positive', message: successMessage });
    } else if (response.isError && response.message) {
      const [firstMessage] = utilIs.array(response.message) ? response.message : [response.message];
      await Notify.create({ type: 'negative', message: errorMessage || firstMessage });
    }
  }
}

function showErrorDialog(message: string[], dialogComponent?: Component, config?: QDialogOptions) {
  const cardSlot = dialogComponent;
  const componentDialog = cardSlot ? {
    cardContentSlot: cardSlot,
  } : {
    message: message.join('<br>'),
    html: true,
  };

  return Dialog.create({
    ...componentDialog,
    componentProps: { message, fakeFocus: config?.focus === 'none' },
    style: {
      width: '100%',
      maxWidth: '36rem',
    },
    noBackdropDismiss: true,
    ...config,
  });
}

const errorDialogMapCache = new Map<string, { dialog: DialogChainObject; message: string[] }>();
export async function errorDialogHandler<T>(response: FetchResponse<T>, payload?: ErrorDialogHandler) {
  if (response.isError && response.message) {
    const key = utilIs.object(payload) ? payload.key : payload;
    const config = utilIs.object(payload) ? payload.config : {};
    const dialogComponent = utilIs.object(payload) ? payload.dialogComponent : undefined;
    const message = utilIs.array(response.message) ? response.message : [response.message];

    if (!key || key === true) {
      return showErrorDialog(message, dialogComponent, config);
    } if (errorDialogMapCache.has(key)) {
      const errorDialogCache = errorDialogMapCache.get(key);

      if (errorDialogCache) {
        errorDialogCache.message.push(...message);
        errorDialogCache.dialog.update({ componentProps: { message: errorDialogCache.message }, message: errorDialogCache.message.join(' <br>') });
      }
      return errorDialogCache?.dialog;
    }

    const errorDialog = showErrorDialog(message, dialogComponent, config);
    errorDialog.onDismiss(() => {
      errorDialogMapCache.delete(key);
    });

    errorDialogMapCache.set(key, { dialog: errorDialog, message });
    return errorDialog;
  }

  return undefined;
}
