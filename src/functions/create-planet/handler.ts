import "reflect-metadata";
import "es6-shim";
import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "@libs/apiGateway";
import schema from "./schema";
import { middyfy } from "@libs/lambda";
import { Planeta } from "src/types/planet.types";
import { createPlanet, updatePlanetById } from "@schema/planets.repository";

export const handler: ValidatedEventAPIGatewayProxyEvent<Planeta> = async (
  event
) => {
  const { body } = event;
  const createdPlanet = await createPlanet(body);
  await updatePlanetById(createdPlanet.raw.insertId, {
    idExterno: createdPlanet.raw.insertId,
  });

  return formatJSONResponse({
    data: {
      id: createdPlanet.raw.insertId,
    },
  });
};

export const main = middyfy(handler, schema);
