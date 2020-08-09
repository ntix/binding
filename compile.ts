const [compileErrors, compiled] = await Deno.compile("mod.ts", undefined,
  {
    lib: ["dom", "dom.iterable", "esnext", "deno.ns", "deno.unstable"]
  });

if (compileErrors)
  console.error('ERROR', compileErrors);

else
  console.log('SUCCESS', compiled);
