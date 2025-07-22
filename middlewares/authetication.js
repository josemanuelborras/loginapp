"use strict";

const jwt = require("jwt-simple");
const moment = require("moment");
const config = require("dotenv").config().parsed;

const secret = config.PASS;

exports.ensureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .json({ message: "Request does not have athentication headers" });
  }

  let token = req.headers.authorization.replace(/['"]+/g, "");

  if (token.toLowerCase().startsWith("bearer ")) {
    token = token.slice(7).trim();
  }

  try {
    let payload = jwt.decode(token, secret);
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: "Expired token" });
    }
    req.user = payload;
    next();
  } catch (ex) {
    return res.status(404).send({ message: "Invalid token" });
  }
};
