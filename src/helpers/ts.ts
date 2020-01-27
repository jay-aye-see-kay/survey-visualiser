// More info: https://github.com/Microsoft/TypeScript/issues/16069
export function isNotNullOrUndefined<T>(input: null | undefined | T): input is T {
  return !!input;
}

// https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
export function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + JSON.stringify(x));
}

// Simplified version of lodash's pick that keeps type info
export function pick<T, K extends keyof T>(v: T, ...keys: K[]): Pick<T, K> {
  const out: any = {}; // eslint-disable-line
  for (const key of keys) {
    out[key] = v[key];
  }
  return out;
}

// https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208
export function objectKeys<T extends object>(v: T): Array<keyof T> {
  return Object.keys(v) as Array<keyof T>;
}
