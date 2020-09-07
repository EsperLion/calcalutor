var express = require("express");
var router = express.Router();

const getGeocode = require("../app/geolocation/get-geocode");
const getReverseGeocode = require("../app/geolocation/get-reverse-geocode");
const getDistance = require('../app/geolocation/calculate-distance');

/* geolocation */
router.get("/getGeocode", async (req, res, next) => {
  try {
    const data = await getGeocode(req.query);
    res.send(data);
  } catch (error) {
    console.log({error})
    res.status(400).send(error);
  }
});

router.get("/getReverseGeocode", async (req, res, next) => {
  try {
    const data = await getReverseGeocode(req.query);
    res.send(data);
  } catch (error) {
    console.log({error})
    res.status(400).send(error);
  }
});

router.post("/calculateDistance", (req, res, next) => {
  try {
    const data = getDistance(req.body);
    console.log({ body: req.body, data })
    res.send({distance: data});
  } catch (error) {
    console.log({ error })
    res.status(400).send(error);
  }
});

module.exports = router;
