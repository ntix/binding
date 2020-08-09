/** @internal
 * Describes a binding from a component member name (element property/event)
 * to a context member name
 */
export interface IBinding {
  componentMemberName: string;
  contextMemberName: string;
}
