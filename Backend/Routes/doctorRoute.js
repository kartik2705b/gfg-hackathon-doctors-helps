const express = require("express");
const router = express.Router();
const doctorMapping = require("../Controllers/doctorController");

router.post("/setMapping", doctorMapping.setDoctorMapping);
router.delete("/removeMapping/:roomId" , doctorMapping.removeDoctorMapping);
router.get("/getMappedDoctors" , doctorMapping.findMappedDoctors);
router.get("/getDoctorRoomId/:doctorId" , doctorMapping.getDoctorRoomID);
router.put("/updateStatus" , doctorMapping.updateDoctorStatus );
// router.post("/login", userController.loginUser);

module.exports = router;