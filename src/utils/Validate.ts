function isNullOrUndefined(value?: unknown): value is undefined | null {
  return value === null || value === undefined;
}

function isObject(value: unknown): value is Record<string, any> {
  return !isNullOrUndefined(value) && typeof value === 'object' && !Array.isArray(value);
}

const toInt = (value?: unknown): number => parseInt(`${value ?? ''}`, 10) || 0;

export const validate = {
  minValue: (min: number) => (value?: number | null) => toInt(value) >= min,
  maxValue: (max: number) => (value?: number | null) => toInt(value) <= max,
  minChars: (min: number) => (value?: string | null) => (!value || value.toString().length >= min),
  maxChars: (max: number) => (value?: string | null) => (!value || value.toString().length <= max),
  required: (value: Record<string, unknown> | any[] | string | number | boolean | undefined | null) => {
    let isValid = false;
    if (value) {
      if (Array.isArray(value)) {
        isValid = !!value.length;
      } else if (isObject(value)) {
        isValid = !!Object.values(value as Record<string, unknown>)
          .map((x) => (typeof x === 'string' ? x.trim() : x))
          .filter((x) => !!x)
          .length;
      } else {
        isValid = !!(typeof value === 'string' ? value.trim() : value);
      }
    } else if (value?.toString() === 'false') {
      isValid = true;
    }
    return isValid;
  },
  hasAllActive: (value: { active: boolean }[]) => (!value || value.every((a) => a.active)),
  hasActive: (value?: { active: boolean } | null) => (!value || value.active),

  date: (value?: string | null) => !value || /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i.test(value),
  time: (value?: string | null) => !value || /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(value),
  datetime: (value?: string | null) => !value || /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4} ([0-1]?\d|2[0-3]):[0-5]\d$/.test(value),
  timeOrFulltime: (value?: string | null) => !value || /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(value),

  email: (value?: string | null) => !value || /^([A-Z|a-z|0-9|](\.|_|-|\+){0,})+[A-Z|a-z|0-9](\.|_|-){0,}(\+){0,1}@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z|A-Z]{2,6}(\.[a-z|A-Z]{2,6}){0,1}$/.test(value),
  userName: (value?: string | null) => !value || /[0-2-a-zA-Z\u00C0-\u00FF-._]{5,}$/.test(value),
  userNameLeters: (value?: string | null) => !value || /[a-zA-Z\u00C0-\u00FF-\s]$/.test(value),

  phoneNumber: (value?: string | null) => !value || /^\d{9,11}$/.test(value),
  numeric: (value?: string | null) => !value || /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/.test(value),
  numericNoDecimals: (value?: string | null) => !value || /^[0-9]*$/.test(value),

  validRegexExpression: (value?: string | null) => {
    let isValid = false;
    if (value) {
      try {
        const result = new RegExp(value, 'g');
        isValid = !!result;
      } catch (e) {
        isValid = false;
      }
    }

    return isValid;
  },
  validRegex: (regexExpression: string) => (value?: string | null) => {
    let isValid = false;
    try {
      if (value === null || value === undefined) {
        isValid = true;
      } else {
        const result = new RegExp(regexExpression, 'g');
        isValid = result.test(value);
      }
    } catch (e) {
      isValid = false;
    }

    return isValid;
  },

  notSpecialCharacters: (value?: string | null) => !value || /^[a-zA-Z0-9]*$/.test(value),
} as const;
