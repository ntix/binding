import { assertEquals } from "../deps.ts";

import { watch } from './watch.ts';

const prop = 'PROPERTY';
const value = 'VALUE';
let o: any;


Deno.test('watches for change', () => {
  o = {};
  let counter = 0;

  watch(o, prop, () => {
    counter++;
  });

  o[prop] = value;
  o[prop] = value;

  assertEquals(counter, 2);
});

Deno.test('watches for change once', () => {
  o = {};
  let counter = 0;

  watch(
    o,
    prop,
    () => {
      counter++;
    },
    true
  );

  o[prop] = value;
  o[prop] = value;

  assertEquals(counter, 1);
});

Deno.test('unwatches and keeps set value', () => {
  o = {};
  const unwatch = watch(o, prop, () => {});

  o[prop] = value;
  unwatch();

  assertEquals(o[prop], value);
});

Deno.test('can nest watches', () => {
  o = {};
  let counter = 0;

  watch(o, prop, () => {
    counter++;
  });
  watch(o, prop, () => {
    counter++;
  });

  o[prop] = value;
  o[prop] = value;

  assertEquals(counter, 4);
});
