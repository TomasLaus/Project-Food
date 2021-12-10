const router = require("express").Router();
require('dotenv').config();
const { preload } = require("./dietsPreload");





router.get("/", async (req, res, next) => {
  try {
    const types = await preload();
    res.status(200).send(types);
  } catch (error) {
    error.next;
  }
});

module.exports = router;