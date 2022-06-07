import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import * as path from "path";
import { buildSchema } from "../../src";

import { RecipeResolver } from "./recipe-resolver";

// very incomplete; see:
// https://github.com/prisma/prisma-examples/tree/latest/typescript/graphql-typegraphql#using-the-graphql-api
// https://www.smashingmagazine.com/2020/10/graphql-server-next-javascript-api-routes/
// https://github.com/MichalLytek/type-graphql/blob/master/examples/simple-usage/index.ts

async function bootstrap() {
  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [RecipeResolver],
    // automatically create `schema.gql` file with schema definition in current folder
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    // enable GraphQL Playground
    playground: true,
  });

  // Connect the server to a GraphQL endpoint
  server.createHandler({ path: "/api/graphql" })
  console.log(`
🚀 Server ready at: http://localhost:4000
⭐️  See sample queries: http://pris.ly/e/ts/graphql-typegraphql#using-the-graphql-api`)

  //// Start the server
  //// const { url } = await server.listen(4000);
  //// console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();