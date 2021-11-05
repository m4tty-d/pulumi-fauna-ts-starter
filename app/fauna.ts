const faunadb = require("faunadb");

export const initFaunaClient = (secret: string) => {
  const client = new faunadb.Client({
    secret,
    domain: "db.eu.fauna.com",
    port: 443,
    scheme: "https",
  });

  const query = faunadb.query;

  return { client, query };
};
