const express = require("express");
const router = express.Router();
const nfcController = require("../controllers/nfc-conroller");


// router.route("/").post(nfcController);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
