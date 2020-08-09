import { getBindings } from './getBindings.ts';
import { IBindingComponent } from './IBindingComponent.ts';

/** @ignore  */
const propsExp = /^\[\{?(.*)\}?\]$/;
/** @ignore  */
const eventsExp = /^\[?\{(.*)\}\]?$/;

/**
 * Bind elements marked with the [bind] attribute to the context provided
 *
 * @param rootElement Root Element to query for bindable elements
 * @param rootContext Context for data and handlers
 */
export function bind(rootElement: Document | Element, rootContext: any): void {
  rootElement.querySelectorAll('[bind]')
    .forEach(element => {
      const component = element as IBindingComponent;
      const attributeNames = element.getAttributeNames();

      // bind properties
      getBindings(propsExp, element, attributeNames).forEach(binding => {
        const path = binding.contextMemberName.split('.');
        let context = rootContext;
        let memberName: string = '';

        path.forEach((p, i) => {
          memberName = p;
          let value = context[memberName];
          if (i < path.length - 1)
            context = value;
        });

        const descriptor =
          Object.getOwnPropertyDescriptor(context, memberName) ||
          {};

        if (typeof descriptor.value === 'function') {
          const fn = descriptor.value['fn'] || descriptor.value;

          const boundFunction = function () {
            const value = fn.bind(element)();
            if (component[binding.componentMemberName] !== value) {
              component[binding.componentMemberName] = value;
            }
            if (descriptor.value['fn']) descriptor.value();
          } as any;
          boundFunction['fn'] = fn;

          Object.defineProperty(context, memberName, {
            value: boundFunction
          });

          boundFunction();
        } else {

          let getValue = descriptor.get || (() => descriptor.value);
          let setValue = descriptor.set || (value => (descriptor.value = value));

          Object.defineProperty(context, memberName, {
            set: function (value) {
              if (component[binding.componentMemberName] !== value) {
                component[binding.componentMemberName] = value;
              }
              if (getValue() !== value) setValue(value);
            },
            get: getValue,
            configurable: true
          });

          component[binding.componentMemberName] = getValue.bind(element)();
        }
      });

      //bind Events
      getBindings(eventsExp, element, attributeNames).forEach(binding => {
        element.addEventListener(
          binding.componentMemberName,
          rootContext[binding.contextMemberName].bind(element)
        );
      });
    });
}
