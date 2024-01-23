import React, { useContext, useState } from "react";
import { SocketContext } from "../SocketContext";

const DoctorDashboard = (props) => {
  const [menu, setMenu] = useState("orderhistory");
  const {
    meetingCode,
    setMeetingCode,
    setNewMeet,
    whoAccessing,
    setWhoAccessing,
  } = useContext(SocketContext);

  return (
    <>
      <div className="p-10">
        <h1 className="font-bold text-2xl">Doctor Dashboard</h1>
        <div className="flex space-x-5">
          <button
            className={
              (menu === "history" ? "bg-green-500 text-white " : "bg-white") +
              " px-3 py-1 text-md border-2 rounded-lg shadow-2xl"
            }
            onClick={() => setMenu("history")}
          >
            Patient History
          </button>

          <button
            className="px-3 py-1 text-md border-2 rounded-lg shadow-2xl"
            onClick={() => {
              setNewMeet(true);
              setWhoAccessing("doctor");
              props.history.push("join");
            }}
          >
            Join Meeting
          </button>
        </div>
        <div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                {Array(8)
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
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
