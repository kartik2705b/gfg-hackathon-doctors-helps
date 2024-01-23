const express = require("express");
const router = express.Router();
const historyController = require("../Controllers/historyController");


router.get("/user/history" , historyController.getUserHistory);
router.get("/doctor/history" , historyController.getDoctorHistory);
router.post("/create/user/history" , historyController.createUserHistory);
router.post("/create/doctor/history" , historyController.createDoctorHistory);

module.exports = router;
