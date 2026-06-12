const express = require("express");
const {
  createRequest,
  getAllRequests,
} = require("../controllers/requestController");

const router = express.Router();

router.post("/create", createRequest);
router.get("/", getAllRequests);

module.exports = router;