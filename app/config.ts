import { from } from "env-var";
import { ProcessEnv } from "./types";

// We need to pass in process.env in the context of the lambda otherwise it will be undefined
export const getConfig = (env: ProcessEnv) => {
  const { get } = from(env);

  return {
    fauna: {
      secret: get("FAUNA_SECRET").required().asString(),
    },
  };
};
