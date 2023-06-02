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
} from "@schema/planets.repository";
import { ValidateFrom } from "@libs/schemaValidator";
import { getPlanet } from "@services/swapi";

export const handler: ValidatedEventAPIGatewayProxyEvent<Planeta> = async (
  event
) => {
  const { planetId } = event.pathParameters;
  console.log("PLANETID", planetId);
  const planet = await getPlanetByExternalId(planetId);
  console.log("planet" + JSON.stringify(planet, null, 2));
  if (!planet) {
    const planetResp = await getPlanet(planetId);
    console.log("planetResp" + JSON.stringify(planetResp, null, 2));
    await createPlanet({ ...planetResp, idExterno: planetId });
    return formatJSONResponse({
      data: planetResp,
    });
  }

  return formatJSONResponse({
    data: planet,
  });
};

export const main = middyfy(handler, schema, ValidateFrom.PARAMS);
