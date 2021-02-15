const router = require("express").Router();
// const bookRoutes= require("./books");
const symbolNameRoutes= require("./symbolName");

// Book routes
router.use("/symbols", symbolNameRoutes);

module.exports = router;
