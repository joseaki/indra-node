export const PLANET_MOCK = {
  name: "xxxxxxxx",
  rotation_period: "23",
  orbital_period: "304",
  diameter: "10465",
  climate: "arid",
  gravity: "1 standard",
  terrain: "desert",
  surface_water: "1",
  population: "200000",
  residents: ["https://swapi.py4e.com/api/people/1/"],
  films: ["https://swapi.py4e.com/api/films/1/"],
  created: "2014-12-09T13:50:49.641000Z",
  edited: "2014-12-20T20:58:18.411000Z",
  url: "https://swapi.py4e.com/api/planets/1/",
};

export const getPlanetList = jest.fn().mockResolvedValue([PLANET_MOCK]);
export const getPlanetByExternalId = jest.fn().mockResolvedValue(PLANET_MOCK);
export const createPlanet = jest
  .fn()
  .mockResolvedValue({ raw: { insertId: 0 } });
export const updatePlanetByExternalId = jest
  .fn()
  .mockResolvedValue({ affected: 1 });
export const updatePlanetById = jest.fn().mockResolvedValue({ affected: 1 });
