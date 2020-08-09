/** @internal
 * Get the corresponding member name for a given attribute name
 * (ie snake=>camel case)
 *
 * @param attributeName Attribute name
 */
export function getBindingMemberName(attributeName: string): string {
  return (
    memberMap[attributeName] ||
    attributeName.replace(/(\-\w)/g, function (match) {
      return match[1].toUpperCase();
    })
  );
}

const memberMap: { [name: string]: string } = {
  'inner-html': 'innerHTML'
};
