// Simple Deno server for the Fortnite game
// Run with: deno run --allow-net --allow-read server.ts

const port = 8000;

Deno.serve({ port }, async (req) => {
  const url = new URL(req.url);
  let path = url.pathname === "/" ? "/game.html" : url.pathname;
  
  try {
    const file = await Deno.readFile(`.${path}`);
    const contentType = path.endsWith(".html") ? "text/html" 
      : path.endsWith(".js") ? "application/javascript"
      : path.endsWith(".css") ? "text/css"
      : "application/octet-stream";
    
    return new Response(file, {
      headers: { "Content-Type": contentType },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
});

console.log(`🎮 Game running at http://localhost:${port}`);

