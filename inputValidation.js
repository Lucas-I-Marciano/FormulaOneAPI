import Joi from "joi";

const driverSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  team: Joi.string().min(3).max(50).required(),
  points: Joi.number().min(0).max(1000).default(0),
});

function validate(schema) {
  return function validateInfo(info) {
    return schema.validate(info, { abortEarly: false });
  };
}

export const validateDriverInfo = validate(driverSchema);

// As I want "schema".validate, for the position I will have to create this schema as it depends on inputs from my application
const generatePositionSchema = (maxValue) => {
  return Joi.number().min(1).max(maxValue);
};
export const validatePositionSchema = (position, maxValue) => {
  //Creating "schema".validate()
  //"schema" = generatePositionSchema(maxValue)
  //"schema" = Joi.number().min(1).max(maxValue)
  return generatePositionSchema(maxValue).validate(position);
};
