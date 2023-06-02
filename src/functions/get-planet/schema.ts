import * as Joi from "joi";

const schema = Joi.object({
  planetId: Joi.number().min(1).integer().required(),
});
export default schema;
