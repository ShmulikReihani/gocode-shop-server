const express = require("express");
const router = express.Router();

router.use("/products", require("../routes/products"));
router.use("/users", require("../routes/user"));
router.use("/orders", require("../routes/order"));

module.exports = router;
