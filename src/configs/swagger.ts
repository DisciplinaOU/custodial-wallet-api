import fs from "fs";
import path from "path";
import swaggerJsDoc, { Options } from "swagger-jsdoc";
import { displayName, version } from "../../package.json";
import { env, port } from "./env";

const description = () =>
  fs.readFileSync("src//docs/description.md").toString();

const swagger: Options = {
  swaggerDefinition: {
    info: {
      version,
      description: description(),
      title: `${displayName} (${env})`,
      contact: { name: "Dmitii Mukhutdinov", email: "flyingleafe@gmail.com" },
      servers: [{ url: `http://localhost:${port}` }],
    },
    basePath: "/api",
  },
  apis: [path.resolve(__dirname, "../docs/*.yml")],
};

const config = swaggerJsDoc(swagger);

export { config };
