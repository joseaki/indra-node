import "reflect-metadata";
import "es6-shim";
import {
  ValidatedEventAPIGatewayProxyEvent,
  formatJSONResponse,
} from "@libs/apiGateway";
import schema from "./schema";
import { middyfy } from "@libs/lambda";
import { Planeta } from "src/types/planet.types";
import {
  createPlanet,
  getPlanetByExternalId,
  updatePlanetByExternalId,
} from "@schema/planets.repository";
import { getPlanet } from "@services/swapi";

export const handler: ValidatedEventAPIGatewayProxyEvent<
  Partial<Planeta>
> = async (event) => {
  const { body, pathParameters } = event;
  const { planetId } = pathParameters;

  const planetInDatabase = await getPlanetByExternalId(planetId);
  if (!planetInDatabase) {
    const planetResponse = await getPlanet(planetId);
    await createPlanet({ ...planetResponse, idExterno: planetId });
  }

  const updatedPlanet = await updatePlanetByExternalId(planetId, body);

  return formatJSONResponse({
    data: {
      success: !!updatedPlanet.affected,
    },
  });
};

export const main = middyfy(handler, schema);
