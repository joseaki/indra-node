import { getConnection } from "src/config/mysql";
import { PlanetSchema } from "./planets";
import { Planeta } from "src/types/planet.types";

let connection = getConnection();

export const getPlanetList = async (limit = 10, page = 1) => {
  const dataSource = await connection;
  return dataSource
    .getRepository(PlanetSchema)
    .createQueryBuilder("user")
    .skip((page - 1) * limit)
    .take(limit)
    .getMany();
};

export const getPlanetByExternalId = async (planetId: number) => {
  const dataSource = await connection;
  return dataSource
    .getRepository(PlanetSchema)
    .createQueryBuilder()
    .where("idExterno = :id", { id: planetId })
    .getOne();
};

export const createPlanet = async (planet: Planeta) => {
  const dataSource = await connection;
  return dataSource
    .createQueryBuilder()
    .insert()
    .into(PlanetSchema)
    .values(planet)
    .execute();
};

export const updatePlanetByExternalId = async (
  planetId: number,
  planet: Partial<Planeta>
) => {
  const dataSource = await connection;
  return dataSource
    .createQueryBuilder()
    .update(PlanetSchema)
    .set(planet)
    .where("idExterno=:id", { id: planetId })
    .execute();
};

export const updatePlanetById = async (
  planetId: number,
  planet: Partial<Planeta>
) => {
  const dataSource = await connection;
  return dataSource
    .createQueryBuilder()
    .update(PlanetSchema)
    .set(planet)
    .where("id=:id", { id: planetId })
    .execute();
};
