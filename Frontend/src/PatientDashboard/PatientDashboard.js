import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../SocketContext";
import { cancelAppointment, createAppoinment, getAllDoctors, getOrdersHistory, getPatientAppointments, getPatientHistory } from "../API/apis";
import ToastContext from "../context/toastContext";

const PatientDashboard = (props) => {
  const {toast} = useContext(ToastContext)
  const [menu, setMenu] = useState("orderhistory");
  const [orderHistoryPage, setHistoryPage] = useState(1);
  const [patientHistory, setPatientHistory] = useState([]);
  const [patientOrderHistory, setPatientOrderHistory] = useState([]);
  const [appData , setAppData] = useState({
    date:'',
    time:''
  });
  const [appHistory , setAppHistory] = useState([]);
  const [doctors , setDoctors] = useState([]);


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

  useEffect(async () => {
    if (menu === "orderhistory") {
      const orders = await getOrdersHistory(orderHistoryPage);
      console.log("Orders", orders);
      if (orders.status) {
        setPatientOrderHistory(orders.orderHistory);
      } else {
        alert(orders.message);
      }
    }
  }, [menu, orderHistoryPage]);

  useEffect(async()=>{
  if(menu === "createAppointment"){
    const doctors = await getAllDoctors();
    if(doctors.status){
      setDoctors(doctors.doctors)
    }else{
      toast.success("No Doctors Found")
    }
  }
  if(menu === "appointment"){
    const app = await getPatientAppointments();

    if(app.status){
      setAppHistory(app.appointments)
    }else{
      toast.error("No Appointments")
    }
  }
  },[menu])

  const handleChange = (e)=>{
    const newData = { ...appData };
    newData[e.target.id] = e.target.value;
    setAppData(newData);
  }

  const handleBookAppointment = async(DocData)=>{
    console.log(DocData)
    const payload = {
      doctorId:DocData._id,
      date:appData.date,
      time:appData.time,
      fees:DocData.doctorsData[0].fees
    }

    const response = await createAppoinment(payload);

    if(response.status){
      toast.success("Appointment Created");
      const app = await getPatientAppointments();

      if(app.status){
        setAppHistory(app.appointments)
      }else{
        toast.error("No Appointments")
      }
    }else{
      toast.error("Appointment failed");
    }

    setAppData({data:'' , time:''})
  }
const handleStatus =async (id) =>{
const res = await cancelAppointment(id);

if(res.status){
  toast.success("Cancelled Success")
}else{
  toast.error("failed")
}
}
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
            className={
              (menu === "appointment" ? "bg-green-700 text-white " : "bg-white") +
              " px-3 py-1 text-md border-2 rounded-lg shadow-2xl"
            }
            onClick={() => setMenu("appointment")}
          >
            Appointments
          </button>
          <button
            className="px-3 py-1 text-md border-2 bg-white rounded-lg shadow-2xl mr-auto"
            onClick={() => {
              props.history.push("doctors");
            }}
          >
            Consult Doctor
          </button>
          <button
            className={
              (menu === "createAppointment" ? "bg-green-700 text-white " : "bg-white") +
              " px-3 py-1 text-md border-2 rounded-lg shadow-2xl"
            }
            onClick={() => setMenu("createAppointment")}
          >
            Create Appointment +
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
          {menu === "appointment" && (
             <>
             {/* <h1>Order History</h1> */}
             
             <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
             
               <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                 <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                     <th scope="col" class="px-6 py-3">
                       AppointmentID
                     </th>
                     <th scope="col" class="px-6 py-3">
                       Fees
                     </th>
                     <th scope="col" class="px-6 py-3">
                       Status
                     </th>
                     <th scope="col" class="px-6 py-3">
                       Time
                     </th>
                     <th scope="col" class="px-6 py-3">
                       Actions
                     </th>
                     {/* <th scope="col" class="px-6 py-3">
                       Actions
                     </th> */}
                   </tr>
                 </thead>
                 <tbody>
                   {appHistory?.map((items) => (
                     <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                       <th
                         scope="row"
                         class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                       >
                         APP{items?._id?.split("").slice(20, 24).join("")}
                       </th>
                       <td class="px-6 py-4">
                         {items.fees}
                       </td>
                       <td class="px-6 py-4">{items.status}</td>
                       <td class="px-6 py-4">
                        {items.date} {items.time}
                       </td>
                       <td class="px-6 py-4">{items?.status === "pending"  && <button  className="px-3 py-1 text-md border-2 bg-white rounded-lg shadow-2xl mr-auto" onClick={()=> handleStatus(items._id)}>Cancel</button>}</td>
                       {/* <td class="px-6 py-4">
                           <a
                             href="#"
                             class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                           >
                             View More
                           </a>
                         </td> */}
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </>
          )}
          {menu === "createAppointment" && (
             <>
             {/* <h1>Order History</h1> */}
             <div className="text-2xl mt-2 mb-4 font-bold">Create Appointment +</div>
             <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
               <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                 <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                   <tr>
                     <th scope="col" class="px-6 py-3">
                       Doctors
                     </th>
                     <th scope="col" class="px-6 py-3">
                       Fees
                     </th>
                     <th scope="col" class="px-6 py-3">
                       Title
                     </th>
                     <th scope="col" class="px-6 py-3">
                     Doctor's Experience
                     </th>
                     <th scope="col" class="px-6 py-3">
                       Date
                     </th>
                     <th scope="col" class="px-6 py-3">
                       time
                     </th>
                     <th scope="col" class="px-6 py-3">
                       Actions
                     </th>
                     {/* <th scope="col" class="px-6 py-3">
                       Actions
                     </th> */}
                   </tr>
                 </thead>
                 <tbody>
                   {doctors?.map((items) => (
                     <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={items._id}>
                       <th
                         scope="row"
                         class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                       >
                         {items?.firstName} {items.lastName}
                       </th>
                       <td class="px-6 py-4">
                         ${items?.doctorsData[0]?.fees}.00
                       </td>
                       <td class="px-6 py-4">{items?.doctorsData[0]?.title}</td>
                       <td class="px-6 py-4">
                       {items?.doctorsData[0]?.expirence}
                       </td>
                       <td class="px-6 py-4">
                        <input type="date" className="h-10 px-4 py-2" onChange={(e)=> handleChange(e)} id="date" name="date"/>
                       </td>
                       <td class="px-6 py-4">
                        <input type="time" className="h-10 px-4 py-2" onChange={(e)=> handleChange(e)} id="time" name="time" />
                       </td>
                       <td class="px-6 py-4">
                        <button className="px-3 py-1 text-md border-2 bg-white rounded-lg shadow-2xl mr-auto" onClick={()=>handleBookAppointment(items)}>Book Appointment</button>
                       </td>
                       {/* <td class="px-6 py-4">
                           <a
                             href="#"
                             class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                           >
                             View More
                           </a>
                         </td> */}
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
                        OrderID
                      </th>
                      <th scope="col" class="px-6 py-3">
                        PaymentID
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Address
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Total Amount
                      </th>
                      {/* <th scope="col" class="px-6 py-3">
                        Actions
                      </th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {patientOrderHistory?.map((items) => (
                      <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          ORD{items?._id?.split("").slice(20, 24).join("")}
                        </th>
                        <td class="px-6 py-4">
                          PAY{items?.paymentId?.split("").splice(0, 5).join("")}
                        </td>
                        <td class="px-6 py-4">{items?.status}</td>
                        <td class="px-6 py-4">
                          {items.shippingAddress.admin_area_2}
                        </td>
                        <td class="px-6 py-4">{items.totalPrice}.00</td>
                        {/* <td class="px-6 py-4">
                            <a
                              href="#"
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              View More
                            </a>
                          </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center items-center text-bold text-2xl">
                <button
                  onClick={() =>
                    orderHistoryPage > 1
                      ? setHistoryPage(orderHistoryPage - 1)
                      : orderHistoryPage
                  }
                >
                  &lt;
                </button>
                <div>{orderHistoryPage}</div>
                <button
                  onClick={() =>
                    setHistoryPage(
                      patientOrderHistory.length === 6
                        ? orderHistoryPage + 1
                        : orderHistoryPage
                    )
                  }
                >
                  &gt;
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
