
// import { AddToCartContext } from "@/context/AddToCartContext";
import { useContext } from "react";
// import Link from "next/link";
// import { CLIENT_ID, APP_SECRET } from "../Config/Config";
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { BACKEND_URL } from "../constants";
import axios from "axios";
import { EmptyCart } from "../API/apis";
import ToastContext from "../context/toastContext";

const PaymentModal = ({total , props}) => {
    const toast = useContext(ToastContext)
//   const cartValue = useContext(AddToCartContext);

  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    console.log("acctions" , actions)
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Orders",
            amount: {
              currency_code: "USD",
              value: total,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };


  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      const { payer } = details;
      props.history.push("/join")
      setSuccess(true);
    });
  };

  useEffect(() => {
    if (success) {
  
      setShow(false)

    }
  }, [success]);

  //capture likely error
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment ");
  };

  useEffect(() => {
    if (ErrorMessage) {

    }
  }, [ErrorMessage]);

  return (
    <div className="w-full lg:w-1/3 ">
     
      <PayPalScriptProvider options={{ "client-id": "Abi6kgW2MeNbq_7xibfLDcwAEhedLuEe2wXRbu9w2p1aGamcbo7V2rI1LfeCIpNgMMSEc4rBkwaMwgWq" }}>
        <div className="text-center">
       
          
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
        
        </div>
      </PayPalScriptProvider>
  
    </div>
  );
};

export default PaymentModal;
