import { assertEquals } from "../deps.ts";

import { setValue } from './setValue.ts';

Deno.test('path', () => {

  const data = { p: 'x' };
  setValue(data, 'p', 'v');
  assertEquals(data, { p: 'v' });
})

Deno.test('path when no property', () => {

  const data = {};
  setValue(data, 'p', 'v');
  assertEquals(data, { p: 'v' });
})

Deno.test('path deeper', () => {

  const data = { p: { p: 'x' } };
  setValue(data, 'p.p', 'v');
  assertEquals(data, { p: { p: 'v' } });
})

Deno.test('indexer', () => {

  const data = { p: ['x'] };
  setValue(data, 'p[0]', 'v');
  assertEquals(data, { p: ['v'] });
})

Deno.test('indexer deeper', () => {

  const data = { p: [{ p: 'x' }] };
  setValue(data, 'p[0].p', 'v');
  assertEquals(data, { p: [{ p: 'v' }] });
})

Deno.test('indexer deeper when no property', () => {

  const data = {};
  setValue(data, 'p[0].p', 'v');
  assertEquals(data, { p: [{ p: 'v' }] });
})
