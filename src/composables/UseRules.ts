import { t } from "src/plugins/I18n";
import { validate } from "src/utils/Validate";

export const useRules = () => {
  const isRequired = (val?: string | number | boolean | any[] | Record<string, unknown> | null) => validate.required(val) || t('rules.requiredField');
  const isEmail = (val?: string | null) => validate.email(val) || t('rules.invalidEmail');

  return {
    isRequired,
    isEmail,
  }
}
