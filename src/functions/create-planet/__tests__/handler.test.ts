import { handler } from "../handler";
import { APIGatewayProxyResult, Callback, Context } from "aws-lambda";
import * as planetRepo from "@schema/planets.repository";

jest.mock("@schema/planets.repository");
jest.mock("@libs/lambda", () => ({
  middyfy: jest.fn(),
  publicMiddyfy: jest.fn(),
}));

describe("first", () => {
  const body = {
    idExterno: "idExterno",
    nombre: "nombre",
    periodo_rotacion: "periodo_rotacion",
    periodo_orbita: "periodo_orbita",
    diametro: "diametro",
    clima: "clima",
    gravedad: "gravedad",
    terreno: "terreno",
    superficie_agua: "superficie_agua",
    poblacion: "poblacion",
    residentes: ["residentes"],
    peliculas: ["peliculas"],
    creado: "creado",
    editado: "editado",
    url: "url",
  };

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test("should create a planet correctly", async () => {
    const data: any = await handler(
      { body } as any,
      {} as Context,
      {} as Callback<APIGatewayProxyResult>
    );
    expect(data.statusCode).toBe(200);
    expect(planetRepo.createPlanet).toHaveBeenCalledTimes(1);
    expect(data.body).toEqual(JSON.stringify({ data: { id: 0 } }));
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
