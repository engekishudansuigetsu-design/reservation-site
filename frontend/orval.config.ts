import { defineConfig } from "orval";

export default defineConfig({
  reserveStore: {
    output: {
      mode: "tags-split",
      target: "./src/lib/gas/apiClient.ts",
      schemas: "src/lib/gas/model",
      client: "react-query",
      httpClient: "axios",
      mock: true,
      override: {
        mutator: {
          path: "./src/lib/gas/customInstance.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "../shared/api-schema/swagger.yml",
    },
  },
});
