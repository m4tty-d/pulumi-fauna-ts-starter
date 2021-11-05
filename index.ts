import * as pulumi from "@pulumi/pulumi";
import * as awsx from "@pulumi/awsx";
import { getRoutes } from "./app/routes";

const name = pulumi.getProject();

const faunaConfig = new pulumi.Config("fauna");
const faunaSecret = faunaConfig.requireSecret("secret");

const apiGateway = new awsx.apigateway.API(name, {
  stageName: "api",
  routes: getRoutes(faunaSecret),
});

export const apiGatewayUrl = apiGateway.url;
