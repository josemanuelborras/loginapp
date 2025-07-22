"use strict";

const home = (req, res) => {
  return res.status(200).json({ message: "Home" });
};

const index = (req, res) => {
  return res.status(200).json({ message: "Index Page" });
};

module.exports = {
  home,
  index,
};
