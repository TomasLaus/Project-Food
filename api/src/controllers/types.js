const router = require("express").Router();
const { Diet } = require('../db');
require('dotenv').config();





const getDiets = async () => {
  const allDiets = await Diet.findAll();
  return allDiets;
};


router.get("/", async (req, res) => {
  const getAllDiets = await getDiets();
  res.send(getAllDiets);
});

module.exports = router;