import * as aws from "@pulumi/aws";
import { Route } from "@pulumi/awsx/apigateway";
import { Output } from "@pulumi/pulumi";
import { indexHandler } from "./handlers/index.handler";
import { ApiRoute } from "./types";

const routes: ApiRoute[] = [
  {
    path: "/customers",
    method: "GET",
    handler: indexHandler,
  },
];

const callbackFunctionName = (route: ApiRoute) =>
  `${route.path.replace("/", "_")}-${route.method}`;

export const getRoutes = (faunaSecret: Output<string>): Route[] =>
  routes.map((route) => ({
    path: route.path,
    method: route.method,
    eventHandler: new aws.lambda.CallbackFunction(callbackFunctionName(route), {
      callback: route.handler,
      runtime: "nodejs14.x",
      environment: {
        variables: {
          FAUNA_SECRET: faunaSecret,
          ...route.envs,
        },
      },
    }),
  }));
