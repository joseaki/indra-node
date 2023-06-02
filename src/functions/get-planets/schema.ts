import * as Joi from "joi";

const schema = Joi.object({
  limit: Joi.number().min(1).integer().required(),
  page: Joi.number().min(1).integer().required(),
});
export default schema;
