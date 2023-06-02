import { PLANET_MOCK } from "@schema/__mocks__/planets.repository";

export const getPlanet = jest.fn().mockResolvedValue(PLANET_MOCK);
