import * as Joi from "joi";
import { Planeta } from "src/types/planet.types";

const schema = Joi.object<Planeta>({
  nombre: Joi.string().required(),
  periodo_rotacion: Joi.string().required(),
  periodo_orbita: Joi.string().required(),
  diametro: Joi.string().required(),
  clima: Joi.string().required(),
  gravedad: Joi.string().required(),
  terreno: Joi.string().required(),
  superficie_agua: Joi.string().required(),
  poblacion: Joi.string().required(),
  residentes: Joi.array().items(Joi.string()).required(),
  peliculas: Joi.array().items(Joi.string()).required(),
  creado: Joi.date().required(),
  editado: Joi.date().required(),
  url: Joi.string().required(),
});
export default schema;
