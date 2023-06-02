export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface Planeta {
  idExterno?: number;
  nombre: string;
  periodo_rotacion: string;
  periodo_orbita: string;
  diametro: string;
  clima: string;
  gravedad: string;
  terreno: string;
  superficie_agua: string;
  poblacion: string;
  residentes: string[];
  peliculas: string[];
  creado: Date;
  editado: Date;
  url: string;
}
