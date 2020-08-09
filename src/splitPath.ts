/**
 * Split a property path in to an array of properties
 * 
 * @param path property path to split
 */
export function splitPath(path: string): (string | number)[] {
  return path.split(/\.|\[|\]\.?/)
    .filter(p => p !== '')
    .map(p => {
      const n = Number.parseInt(p);
      return isNaN(n) ? p : n;
    });
}
