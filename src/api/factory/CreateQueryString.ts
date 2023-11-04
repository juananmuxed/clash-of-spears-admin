// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createKeyValuePair = (key: string, value: any): string => {
  if (Array.isArray(value)) {
    return value.map((x) => createKeyValuePair(key, x)).join('&');
  }

  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

export const createQueryString = (params: Record<string, unknown>): string => (
  (params && Object
    .keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null)
    .map((key) => createKeyValuePair(key, params[key]))
    .join('&')) || ''
);
