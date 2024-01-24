import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketContext";
import { getPatientHistory } from "../API/apis";

const PatientDashboard = (props) => {
  const [menu, setMenu] = useState("orderhistory");
  const [patientHistory, setPatientHistory] = useState([]);
  const {
    meetingCode,
    setMeetingCode,
    setNewMeet,
    whoAccessing,
    setWhoAccessing,
  } = useContext(SocketContext);

  useEffect(async () => {
    try {
      const res = await getPatientHistory();
      console.log(res);
      setPatientHistory([...res.history]);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="p-10">
        <h1 className="font-bold text-2xl">Patient Dashboard</h1>
        <div className="flex space-x-5">
          <button
            className={
              (menu === "history" ? "bg-green-700 text-white " : "bg-white") +
              " px-3 py-1 text-md border-2 rounded-lg shadow-2xl"
            }
            onClick={() => setMenu("history")}
          >
            Patient History
          </button>
          <button
            className={
              (menu === "orderhistory"
                ? "bg-green-700 text-white "
                : "bg-white") +
              " px-3 py-1 text-md border-2 rounded-lg shadow-2xl"
            }
            onClick={() => setMenu("orderhistory")}
          >
            Order History
          </button>
          <button
            className="px-3 py-1 text-md border-2 bg-white rounded-lg shadow-2xl"
            onClick={() => {
              props.history.push("doctors");
            }}
          >
            Consult Doctor
          </button>
        </div>
        <div>
          {menu === "history" && (
            <>
              {/* <h1 className="text-xl">Patient History</h1> */}
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Doctor-ID
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Fees Paid
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientHistory.map((history) => (
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {history.doctorId}
                        </th>
                        <td class="px-6 py-4">{history.feesPaid}</td>
                        <td class="px-6 py-4">{history.createdAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {menu === "orderhistory" && (
            <>
              {/* <h1>Order History</h1> */}
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Color
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(6)
                      .fill(1)
                      .map(() => (
                        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            Apple MacBook Pro 17"
                          </th>
                          <td class="px-6 py-4">Silver</td>
                          <td class="px-6 py-4">Laptop</td>
                          <td class="px-6 py-4">$2999</td>
                          <td class="px-6 py-4">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
