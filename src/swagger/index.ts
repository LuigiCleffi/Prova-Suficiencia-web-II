import { env } from "env";

const swaggerOptions = {
  swagger: {
    info: {
      title: "My API",
      description: "API documentation",
      version: "1.0.0",
    },
    host: env.NODE_ENV === 'production' ? '' : 'localhost:3333',
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "Default", description: "Default" }],
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};


export {
  swaggerOptions,
  swaggerUiOptions
}