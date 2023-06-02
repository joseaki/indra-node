import * as Joi from "joi";
import { Planeta } from "src/types/planet.types";

const schema = Joi.object<Planeta>({
  nombre: Joi.string().optional(),
  periodo_rotacion: Joi.string().optional(),
  periodo_orbita: Joi.string().optional(),
  diametro: Joi.string().optional(),
  clima: Joi.string().optional(),
  gravedad: Joi.string().optional(),
  terreno: Joi.string().optional(),
  superficie_agua: Joi.string().optional(),
  poblacion: Joi.string().optional(),
  residentes: Joi.array().items(Joi.string()).optional(),
  peliculas: Joi.array().items(Joi.string()).optional(),
  creado: Joi.date().optional(),
  editado: Joi.date().optional(),
  url: Joi.string().optional(),
});
export default schema;
