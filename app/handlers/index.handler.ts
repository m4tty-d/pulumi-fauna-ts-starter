import { initFaunaClient } from "../fauna";

export const indexHandler = async () => {
  if (!process.env.FAUNA_SECRET) {
    console.error("Missing FAUNA_SECRET env");
    return {
      statusCode: 500,
    };
  }

  const {
    client,
    query: { Paginate, Match, Index, Map, Get, Let, Var, Select },
  } = initFaunaClient(process.env.FAUNA_SECRET);

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
