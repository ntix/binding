// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.

// This is a specialised implementation of a System module loader.

"use strict";

// @ts-nocheck
/* eslint-disable */
let System, __instantiate;
(() => {
  const r = new Map();

  System = {
    register(id, d, f) {
      r.set(id, { d, f, exp: {} });
    },
  };
  async function dI(mid, src) {
    let id = mid.replace(/\.\w+$/i, "");
    if (id.includes("./")) {
      const [o, ...ia] = id.split("/").reverse(),
        [, ...sa] = src.split("/").reverse(),
        oa = [o];
      let s = 0,
        i;
      while ((i = ia.shift())) {
        if (i === "..") s++;
        else if (i === ".") break;
        else oa.push(i);
      }
      if (s < sa.length) oa.push(...sa.slice(s));
      id = oa.reverse().join("/");
    }
    return r.has(id) ? gExpA(id) : import(mid);
  }

  function gC(id, main) {
    return {
      id,
      import: (m) => dI(m, id),
      meta: { url: id, main },
    };
  }

  function gE(exp) {
    return (id, v) => {
      v = typeof id === "string" ? { [id]: v } : id;
      for (const [id, value] of Object.entries(v)) {
        Object.defineProperty(exp, id, {
          value,
          writable: true,
          enumerable: true,
        });
      }
    };
  }

  function rF(main) {
    for (const [id, m] of r.entries()) {
      const { f, exp } = m;
      const { execute: e, setters: s } = f(gE(exp), gC(id, id === main));
      delete m.f;
      m.e = e;
      m.s = s;
    }
  }

  async function gExpA(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](await gExpA(d[i]));
      const r = e();
      if (r) await r;
    }
    return m.exp;
  }

  function gExp(id) {
    if (!r.has(id)) return;
    const m = r.get(id);
    if (m.s) {
      const { d, e, s } = m;
      delete m.s;
      delete m.e;
      for (let i = 0; i < s.length; i++) s[i](gExp(d[i]));
      e();
    }
    return m.exp;
  }
  __instantiate = (m, a) => {
    System = __instantiate = undefined;
    rF(m);
    return a ? gExpA(m) : gExp(m);
  };
})();

System.register("src/getBindingMemberName", [], function (exports_1, context_1) {
    "use strict";
    var memberMap;
    var __moduleName = context_1 && context_1.id;
    function getBindingMemberName(attributeName) {
        return (memberMap[attributeName] ||
            attributeName.replace(/(\-\w)/g, function (match) {
                return match[1].toUpperCase();
            }));
    }
    exports_1("getBindingMemberName", getBindingMemberName);
    return {
        setters: [],
        execute: function () {
            memberMap = {
                'inner-html': 'innerHTML'
            };
        }
    };
});
System.register("src/IBinding", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/getBindings", ["src/getBindingMemberName"], function (exports_3, context_3) {
    "use strict";
    var getBindingMemberName_ts_1;
    var __moduleName = context_3 && context_3.id;
    function getBindings(exp, element, attributeNames) {
        return attributeNames
            .map(attributeName => ({
            attributeName,
            bindingAttributeName: (exp.exec(attributeName) || [])[1]
        }))
            .filter(d => !!d.bindingAttributeName)
            .map(d => ({
            componentMemberName: getBindingMemberName_ts_1.getBindingMemberName(d.bindingAttributeName),
            contextMemberName: element.getAttribute(d.attributeName)
        }));
    }
    exports_3("getBindings", getBindings);
    return {
        setters: [
            function (getBindingMemberName_ts_1_1) {
                getBindingMemberName_ts_1 = getBindingMemberName_ts_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("src/IBindingComponent", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("src/bind", ["src/getBindings"], function (exports_5, context_5) {
    "use strict";
    var getBindings_ts_1, propsExp, eventsExp;
    var __moduleName = context_5 && context_5.id;
    function bind(rootElement, rootContext) {
        rootElement.querySelectorAll('[bind]')
            .forEach(element => {
            const component = element;
            const attributeNames = element.getAttributeNames();
            getBindings_ts_1.getBindings(propsExp, element, attributeNames).forEach(binding => {
                const path = binding.contextMemberName.split('.');
                let context = rootContext;
                let memberName = '';
                path.forEach((p, i) => {
                    memberName = p;
                    let value = context[memberName];
                    if (i < path.length - 1)
                        context = value;
                });
                const descriptor = Object.getOwnPropertyDescriptor(context, memberName) ||
                    {};
                if (typeof descriptor.value === 'function') {
                    const fn = descriptor.value['fn'] || descriptor.value;
                    const boundFunction = function () {
                        const value = fn.bind(element)();
                        if (component[binding.componentMemberName] !== value) {
                            component[binding.componentMemberName] = value;
                        }
                        if (descriptor.value['fn'])
                            descriptor.value();
                    };
                    boundFunction['fn'] = fn;
                    Object.defineProperty(context, memberName, {
                        value: boundFunction
                    });
                    boundFunction();
                }
                else {
                    let getValue = descriptor.get || (() => descriptor.value);
                    let setValue = descriptor.set || (value => (descriptor.value = value));
                    Object.defineProperty(context, memberName, {
                        set: function (value) {
                            if (component[binding.componentMemberName] !== value) {
                                component[binding.componentMemberName] = value;
                            }
                            if (getValue() !== value)
                                setValue(value);
                        },
                        get: getValue,
                        configurable: true
                    });
                    component[binding.componentMemberName] = getValue.bind(element)();
                }
            });
            getBindings_ts_1.getBindings(eventsExp, element, attributeNames).forEach(binding => {
                element.addEventListener(binding.componentMemberName, rootContext[binding.contextMemberName].bind(element));
            });
        });
    }
    exports_5("bind", bind);
    return {
        setters: [
            function (getBindings_ts_1_1) {
                getBindings_ts_1 = getBindings_ts_1_1;
            }
        ],
        execute: function () {
            propsExp = /^\[\{?(.*)\}?\]$/;
            eventsExp = /^\[?\{(.*)\}\]?$/;
        }
    };
});
System.register("mod", ["src/bind"], function (exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (bind_ts_1_1) {
                exports_6({
                    "bind": bind_ts_1_1["bind"]
                });
            }
        ],
        execute: function () {
        }
    };
});

const __exp = __instantiate("mod", false);
export const bind = __exp["bind"];
