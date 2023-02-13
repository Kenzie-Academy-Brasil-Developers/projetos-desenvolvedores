import { NextFunction, Request, Response } from "express";

const validateTypesDeveloper = (req: Request, resp: Response, next: NextFunction) => {
  const keys = Object.keys(req.body);
  const requiredTypes: any = {
    name: "string",
    email: "string",
    developer_info_id: "number",
  };

  const invalidFields = keys.filter(
    (key) => typeof req.body[key] !== requiredTypes[key]
  );

  if (invalidFields.length) {
    return resp.status(400).send({
      error: `Tipo de dado inválido para o(s) campo(s): ${invalidFields.join(
        ", "
      )}`,
    });
  }
  next();
};

const validateTypesDeveloperUpdate = (req: Request, resp: Response, next: NextFunction) => {
    const keys = Object.keys(req.body);
    const requiredTypes: any = {
      name: "string",
      email: "string",
      developer_info_id: "number",
    };
  
    const invalidFields = keys.filter(
      (key) => typeof req.body[key] !== requiredTypes[key]
    );
  
    if (invalidFields.length) {
      return resp.status(400).send({
        error: `Tipo de dado inválido para o(s) campo(s): ${invalidFields.join(
          ", "
        )}`,
      });
    }
    next();
  };

export { validateTypesDeveloper, validateTypesDeveloperUpdate };
