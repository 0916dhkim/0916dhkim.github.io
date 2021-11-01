/**
 * Check if key is in the given object.
 *
 * There is no easy way to narrow unknown type to
 * an object with specific key.
 * This helper function tells TS compiler that
 * `obj` has the key, but is safer than using
 * type assertion (e.g. `obj as {k: string}`).
 * @param obj Object to test.
 * @param key Key to check.
 * @returns `true` if the key is in object. `false` otherwise.
 * @example const key = 'apple';
 * let obj: unknown;
 * if (hasProperty(obj, key)) { const apple = obj.apple }
 */
export function hasProperty<Key extends string>(
  obj: unknown,
  key: Key
): obj is { [_ in Key]: unknown } {
  if (typeof obj !== "object" || obj === null) return false;
  return key in obj;
}

export function hasStringProperty<Key extends string>(
  obj: unknown,
  key: Key
): obj is { [_ in Key]: string } {
  if (!hasProperty(obj, key) || typeof obj[key] !== "string") return false;
  return true;
}
