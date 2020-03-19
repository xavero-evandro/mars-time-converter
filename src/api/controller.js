"use strict";
import { check, param, validationResult } from "express-validator";

import { marsTimeConverter } from "../service/mars-time";

const controller = {
  getMarsTime: async function(req, res, next) {
    try {
      if (Object.keys(req.params).length !== 0) {
        await param("timeUTC", "UTC Time Invalid")
          .isISO8601()
          .run(req);
      } else {
        await check("timeUTC", "UTC Time Invalid")
          .isISO8601()
          .run(req);
      }

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      const timeUTC = req.params.timeUTC || req.query.timeUTC;

      return res.status(200).json(await marsTimeConverter(timeUTC));
    } catch (e) {
      console.log(e);
      return next(e);
    }
  }
};

export default controller;
