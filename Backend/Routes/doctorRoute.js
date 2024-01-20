const express = require("express");
const router = express.Router();
const doctorMapping = require("../Controllers/doctorController");

router.post("/setMapping", doctorMapping.setDoctorMapping);
router.delete("/removeMapping/:mappingId" , doctorMapping.removeDoctorMapping);
router.get("/getMappedDoctors" , doctorMapping.findMappedDoctors);
router.get("/getDoctorRoomId/:doctorId" , doctorMapping.getDoctorRoomID);
// router.post("/login", userController.loginUser);

module.exports = router;