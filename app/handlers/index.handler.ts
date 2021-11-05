import { getConfig } from "../config";
import { initFaunaClient } from "../fauna";

export const indexHandler = async () => {
  const config = getConfig(process.env);

  const {
    client,
    query: { Paginate, Match, Index, Map, Get, Let, Var, Select },
  } = initFaunaClient(config.fauna.secret);

  const customers = await client.query(
    Map(Paginate(Match(Index("all_customers"))), (customerRef: any) =>
      Let(
        {
          customerDoc: Get(customerRef),
        },
        {
          id: Select(["ref", "id"], Var("customerDoc")),
          firstName: Select(["data", "firstName"], Var("customerDoc")),
        }
      )
    )
  );

  return {
    statusCode: 200,
    body: JSON.stringify(customers),
  };
};
