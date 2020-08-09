import { serve, serveFile } from "./deps.ts";

const server = serve({ port: 5000 });

const paths: { [url: string]: string } = {
  '/': '/index.html',
  '/mod.js': '/mod.js'
}

for await (const req of server) {

  let path = paths[req.url];

  if (!path) {
    console.error({ 404: req.url });

    req.respond({ status: 404 });

  } else {
    try {
      path = `${Deno.cwd()}${path}`;
      req.respond(
        await serveFile(req, path)
      );
    } catch (error) {

      console.error({ error, path });
      req.respond({ status: 500 });
    }
  }
}
