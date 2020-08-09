import { assertEquals } from "../deps.ts";

import { getBindingMemberName } from './getBindingMemberName.ts';

[
  ['attribute', 'attribute'],
  ['an-attribute', 'anAttribute'],
  ['inner-html', 'innerHTML']
].forEach(([value, expected]) => {

  Deno.test(`${value}=>${expected}`, () => {
    assertEquals(getBindingMemberName(value), expected);
  });
});
