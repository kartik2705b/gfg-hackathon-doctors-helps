const express = require("express");
const router = express.Router();
const appoinmentController = require("../Controllers/scheduleController");

router.post("/createAppointment", appoinmentController.createAppoinment);
router.patch("/confirmAppointment", appoinmentController.confirmAppoinment);
router.patch("/cancelAppointment", appoinmentController.cancelAppointment);
router.get("/getDoctorAppoinment", appoinmentController.getDoctorAppoinment);
router.get("/getUserAppoinment", appoinmentController.getUserAppoinment);

module.exports = router;