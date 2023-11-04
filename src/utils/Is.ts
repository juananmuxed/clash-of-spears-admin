export const is = () => {/* eslint-disable @typescript-eslint/no-explicit-any */
  function nullOrUndefined(value?: unknown): value is undefined | null {
    return value === null || value === undefined;
  }

  function falsy(value?: unknown): value is undefined | null {
    return !value;
  }

  function nullOrWhiteSpace(value?: unknown): value is undefined | null {
    return nullOrUndefined(value) || (`${value ?? ''}`).trim().length === 0;
  }

  function number(value: unknown): value is number {
    return (typeof value === 'number' && Number.isFinite(value)) || /^[-]?\d+(\.\d+)?$/.test(`${value}`);
  }

  function object(value: unknown): value is Record<string, any> {
    return !nullOrUndefined(value) && typeof value === 'object' && !Array.isArray(value);
  }

  function array(value: unknown): value is any[] {
    return !nullOrUndefined(value) && Array.isArray(value);
  }

  function date(value: unknown): value is Date {
    return Object.prototype.toString.call(value) === '[object Date]';
  }

  function boolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
  }

  function string(value: unknown): value is string {
    return typeof value === 'string';
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  function function_(value: unknown): value is Function {
    return typeof value === 'function';
  }

  return {
    nullOrUndefined,
    falsy,
    nullOrWhiteSpace,
    number,
    object,
    array,
    date,
    boolean,
    string,
    function_,
  }
}
