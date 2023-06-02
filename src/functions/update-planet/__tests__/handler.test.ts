import { handler } from "../handler";
import { APIGatewayProxyResult, Callback, Context } from "aws-lambda";
import * as planetRepo from "@schema/planets.repository";

jest.mock("@schema/planets.repository");
jest.mock("@services/swapi");
jest.mock("@libs/lambda", () => ({
  middyfy: jest.fn(),
  publicMiddyfy: jest.fn(),
}));

describe("first", () => {
  const body = {
    nombre: "nombre",
  };
  const pathParameters = {
    planetId: "0",
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test("should update a planet retrieving it from the API", async () => {
    jest.spyOn(planetRepo, "getPlanetByExternalId").mockResolvedValueOnce(null);
    const data: any = await handler(
      { body, pathParameters } as any,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );
    expect(data.statusCode).toBe(200);
    expect(planetRepo.getPlanetByExternalId).toHaveBeenCalledTimes(1);
    expect(planetRepo.createPlanet).toHaveBeenCalledTimes(1);
    expect(planetRepo.updatePlanetByExternalId).toHaveBeenCalledTimes(1);
    expect(data.body).toEqual(JSON.stringify({ data: { success: true } }));
  });

  test("should update a planet from the database", async () => {
    const data: any = await handler(
      { body, pathParameters } as any,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );
    expect(data.statusCode).toBe(200);
    expect(planetRepo.getPlanetByExternalId).toHaveBeenCalledTimes(1);
    expect(planetRepo.createPlanet).toHaveBeenCalledTimes(0);
    expect(planetRepo.updatePlanetByExternalId).toHaveBeenCalledTimes(1);
    expect(data.body).toEqual(JSON.stringify({ data: { success: true } }));
  });

  test("should throw an error if there is an error saving in the database", async () => {
    jest
      .spyOn(planetRepo, "createPlanet")
      .mockRejectedValue(new Error("error"));
    expect(
      handler(
        { body } as any,
        {} as Context,
        {} as Callback<APIGatewayProxyResult>
      )
    ).rejects.toThrow();
  });
});
