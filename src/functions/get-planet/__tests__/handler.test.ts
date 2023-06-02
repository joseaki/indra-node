import { handler } from "../handler";
import { APIGatewayProxyResult, Callback, Context } from "aws-lambda";
import * as planetRepo from "@schema/planets.repository";
import * as swapiService from "@services/swapi";
import { PLANET_MOCK } from "@schema/__mocks__/planets.repository";

jest.mock("@schema/planets.repository");
jest.mock("@services/swapi");
jest.mock("@libs/lambda", () => ({
  middyfy: jest.fn(),
  publicMiddyfy: jest.fn(),
}));

describe("first", () => {
  const pathParameters = {
    planetId: 0,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test("should get a planet correctly from the api", async () => {
    jest.spyOn(planetRepo, "getPlanetByExternalId").mockResolvedValueOnce(null);
    const data: any = await handler(
      { pathParameters } as any,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );
    expect(data.statusCode).toBe(200);
    expect(planetRepo.getPlanetByExternalId).toHaveBeenCalledTimes(1);
    expect(swapiService.getPlanet).toHaveBeenCalledTimes(1);
    expect(data.body).toEqual(
      JSON.stringify({
        data: PLANET_MOCK,
      })
    );
  });

  test("should get a planet correctly from the database", async () => {
    const data: any = await handler(
      { pathParameters } as any,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );
    expect(data.statusCode).toBe(200);
    expect(planetRepo.getPlanetByExternalId).toHaveBeenCalledTimes(1);
    expect(swapiService.getPlanet).toHaveBeenCalledTimes(0);
    expect(data.body).toEqual(
      JSON.stringify({
        data: PLANET_MOCK,
      })
    );
  });

  test("should throw an error if there is an error retrieving data form the database", async () => {
    jest
      .spyOn(planetRepo, "getPlanetByExternalId")
      .mockRejectedValue(new Error("error"));
    expect(
      handler(
        { pathParameters } as any,
        {} as Context,
        {} as Callback<APIGatewayProxyResult>
      )
    ).rejects.toThrow();
  });
});
