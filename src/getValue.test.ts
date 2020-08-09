import { assertEquals } from "../deps.ts";

import { getValue } from './getValue.ts';

Deno.test('path', () => {

  const assertEqualsed = 'v';
  const data = { p: assertEqualsed };
  const result = getValue(data, 'p');
  assertEquals(result, assertEqualsed);
})

Deno.test('indexer', () => {

  const assertEqualsed = 'v';
  const data = { p: [assertEqualsed] };
  const result = getValue(data, 'p[0]');
  assertEquals(result, assertEqualsed);
})

Deno.test('indexer deeper', () => {

  const assertEqualsed = 'v';
  const data = { p: [{ p: assertEqualsed }] };
  const result = getValue(data, 'p[0].p');
  assertEquals(result, assertEqualsed);
})

Deno.test('indexer deeper empty context', () => {

  const data = { };
  const result = getValue(data, 'p[0].p');
  assertEquals(result, undefined);
})

Deno.test('indexer deeper null context', () => {

  const data = null;
  const result = getValue(data, 'p[0].p');
  assertEquals(result, undefined);
})
