import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import fs from "fs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  const vercelApiPlugin = () => ({
    name: "vercel-api-plugin",
    configureServer(server: any) {
      server.middlewares.use("/api", async (req: any, res: any, next: any) => {
        try {
          const urlMatch = req.url.split("?")[0];
          const filePath = path.join(process.cwd(), "api", urlMatch + ".ts");

          if (fs.existsSync(filePath)) {
            let body = "";
            req.on("data", (chunk: any) => {
              body += chunk.toString();
            });
            req.on("end", async () => {
              if (body) {
                try {
                  req.body = JSON.parse(body);
                } catch (e) {}
              }
              
              try {
                const module = await server.ssrLoadModule(filePath);
                const handler = module.default;

                const originalSetHeader = res.setHeader.bind(res);
                res.setHeader = (name: string, value: string) => {
                  if (!res.headersSent) originalSetHeader(name, value);
                  return res;
                };

                res.status = (code: number) => {
                  res.statusCode = code;
                  return res;
                };

                res.json = (data: any) => {
                  if (!res.headersSent) {
                    res.setHeader("Content-Type", "application/json");
                  }
                  res.end(JSON.stringify(data));
                };

                await handler(req, res);
              } catch (err) {
                console.error("Error executing API route:", err);
                res.statusCode = 500;
                res.end("Internal Server Error");
              }
            });
          } else {
            next();
          }
        } catch (err) {
          console.error("API Plugin Error:", err);
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      });
    },
  });

  return {
    plugins: [react(), tailwindcss(), tsconfigPaths(), vercelApiPlugin()],
  };
});
