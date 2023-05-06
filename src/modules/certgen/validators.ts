import Joi from "joi";

export const listCertificates = {
  onlyCount: Joi.bool().optional(),
  offset: Joi.number().optional(),
  limit: Joi.number().optional(),
  sortBy: Joi.string().optional(),
}

export const createCertificate = {
  datas: Joi.array().items(Joi.object()).required(),
  meta: Joi.object({
    issueDate: Joi.string().required(),
    title: Joi.string().required(),
    entity: Joi.number().required(),
  })
}

export const updateCertificate = {
  datas: Joi.array().items(Joi.object().required()).required(),
}