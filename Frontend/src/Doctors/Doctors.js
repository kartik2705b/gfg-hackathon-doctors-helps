import React, { useContext, useEffect, useState } from "react";
import {
  createPatientHistory,
  getDoctorRoomid,
  getMappedDoctors,
} from "../API/apis";
import { SocketContext } from "../SocketContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PaymentModal from "../Payments/paymentModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Doctors = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [roomIds, setRoomIds] = useState([]);
  const { meetingCode, setMeetingCode, setNewMeet } = useContext(SocketContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen((curr) => !curr);
  };

  useEffect(() => {
    getMappedDoctors()
      .then((res) => {
        // setDoctors()
        setDoctors([...res.doctors]);
        console.log("doctors", res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="p-10">
        <h2 class="text-2xl font-extrabold dark:text-white mb-5">
          List of available doctors
        </h2>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Doctor Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Exprience
                </th>
                <th scope="col" class="px-6 py-3">
                  Education
                </th>
                <th scope="col" class="px-6 py-3">
                  Fees
                </th>
                <th scope="col" class="px-6 py-3">
                  Title
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr
                  className={
                    (doctor?.doctorsData[0]?.isAvailable
                      ? "bg-green-500"
                      : "bg-red-500") +
                    " border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  }
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {doctor?.firstName}
                  </th>
                  <td class="px-6 py-4">{doctor?.doctorsData[0]?.expirence}</td>
                  <td class="px-6 py-4">{doctor?.doctorsData[0]?.education}</td>
                  <td class="px-6 py-4">{doctor?.doctorsData[0]?.fees}</td>
                  <td class="px-6 py-4">{doctor?.doctorsData[0]?.title}</td>
                  <td class="px-6 py-4">
                    <button
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => {
                        setOpen(true);
                        getDoctorRoomid(doctor._id)
                          .then(async (res) => {
                            setMeetingCode(res.mappedData);
                            console.log("doctor id", res);

                            await createPatientHistory(
                              doctor._id,
                              doctor?.doctorsData[0]?.fees
                            );

                            // props.history.push("join");
                          })
                          .catch((err) => console.log(err));
                      }}
                    >
                      Pay and Talk
                    </button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Secure Payment
                        </Typography>
                        <PaymentModal total={doctor?.doctorsData[0]?.fees} setOpen={setOpen} props={props}/>
                        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Duis mollis, est non commodo luctus, nisi erat
                          porttitor ligula.
                        </Typography> */}
                      </Box>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Doctors;
