import { assertEquals } from "../deps.ts";

import { splitPath } from './splitPath.ts';

Deno.test('simple path', () => {

  const path = 'a.b';
  const result = splitPath(path);

  assertEquals(result, ['a', 'b']);
});

Deno.test('indexed path', () => {

  const path = 'a[0]';
  const result = splitPath(path);

  assertEquals(result, ['a', 0]);
});

Deno.test('indexed path deeper', () => {

  const path = 'a[0].b';
  const result = splitPath(path);

  assertEquals(result, ['a', 0, 'b']);
});
