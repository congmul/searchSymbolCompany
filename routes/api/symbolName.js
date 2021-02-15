const router = require("express").Router();
const symbolNameController = require("../../controllers/symbolNameController");

// Matches with "/api/symbols"
router
  .route("/")
  .get(symbolNameController.findAll);

module.exports = router;