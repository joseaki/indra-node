import "reflect-metadata";
import "es6-shim";
import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "@libs/apiGateway";
import schema from "./schema";
import { middyfy } from "@libs/lambda";
import { Planeta } from "src/types/planet.types";
import { getPlanetList } from "@schema/planets.repository";
import { ValidateFrom } from "@libs/schemaValidator";

export const handler: ValidatedEventAPIGatewayProxyEvent<Planeta> = async (
  event
) => {
  const { limit, page } = event.queryStringParameters;
  const planetList = await getPlanetList(Number(limit), Number(page));

  return formatJSONResponse({
    data: {
      items: planetList,
      page: page,
    },
  });
};

export const main = middyfy(handler, schema, ValidateFrom.QUERY);
