const [bundleErrors, bundle] = await Deno.bundle("mod.ts", undefined,
  {
    lib: ["dom", "dom.iterable", "esnext", "deno.ns", "deno.unstable"]
  });

if (bundleErrors)
  console.error('ERROR', bundleErrors);

else {
  console.log('SUCCESS');
  await Deno.writeTextFile("./mod.js", bundle);
}
