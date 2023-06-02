import { handler } from "../handler";
import { APIGatewayProxyResult, Callback, Context } from "aws-lambda";
import * as planetRepo from "@schema/planets.repository";
import { PLANET_MOCK } from "@schema/__mocks__/planets.repository";

jest.mock("@schema/planets.repository");
jest.mock("@libs/lambda", () => ({
  middyfy: jest.fn(),
  publicMiddyfy: jest.fn(),
}));

describe("first", () => {
  const queryStringParameters = {
    limit: 10,
    page: 1,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test("should get a list of planets correctly from the database", async () => {
    const data: any = await handler(
      { queryStringParameters } as any,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );
    expect(data.statusCode).toBe(200);
    expect(planetRepo.getPlanetList).toHaveBeenCalledTimes(1);
    expect(data.body).toEqual(
      JSON.stringify({
        data: { items: [PLANET_MOCK], page: queryStringParameters.page },
      })
    );
  });

  test("should throw an error if there is an error retrieving data form the database", async () => {
    jest
      .spyOn(planetRepo, "getPlanetList")
      .mockRejectedValue(new Error("error"));
    expect(
      handler(
        { queryStringParameters } as any,
        {} as Context,
        {} as Callback<APIGatewayProxyResult>
      )
    ).rejects.toThrow();
  });
});
