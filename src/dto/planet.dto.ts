import { Expose } from "class-transformer";
import { Planeta } from "src/types/planet.types";

export class PlanetResponseDTO implements Planeta {
  @Expose({ name: "name" })
  nombre: string;
  @Expose({ name: "rotation_period" })
  periodo_rotacion: string;
  @Expose({ name: "orbital_period" })
  periodo_orbita: string;
  @Expose({ name: "diameter" })
  diametro: string;
  @Expose({ name: "climate" })
  clima: string;
  @Expose({ name: "gravity" })
  gravedad: string;
  @Expose({ name: "terrain" })
  terreno: string;
  @Expose({ name: "surface_water" })
  superficie_agua: string;
  @Expose({ name: "population" })
  poblacion: string;
  @Expose({ name: "residents" })
  residentes: string[];
  @Expose({ name: "films" })
  peliculas: string[];
  @Expose({ name: "created" })
  creado: Date;
  @Expose({ name: "edited" })
  editado: Date;
  @Expose({ name: "url" })
  url: string;
}
