import { Callback } from "@pulumi/aws/lambda";
import { Method } from "@pulumi/awsx/apigateway";

export type ApiRoute = {
  path: string;
  method: Method;
  handler: Callback<unknown, unknown>;
};
