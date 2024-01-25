import React, { useContext, useEffect, useState } from "react";
import {
  DecreseQty,
  IncreaseQty,
  getCart,
  removeCartItems,
} from "../../API/apis";
import ToastContext from "../../context/toastContext";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const { toast } = useContext(ToastContext);
  const [total, setTotal] = useState(0);

  const handleGetCart = async () => {
    const response = await getCart();
    console.log(response);
    if (response.status) {
      setCartItems(response.cartItems);
      calculateTotal(response.cartItems);
    } else {
      toast.error("Failed to Load Cart Items");
    }
  };

  useEffect(async () => {
    await handleGetCart();
  }, []);

  const handleRemoveCart = async (id) => {
    console.log("cliked");
    const response = await removeCartItems(id);

    if (response.status) {
      toast.success("Remove Success");
      handleGetCart();
    } else {
      toast.error("Remove Failed");
    }
  };

  const IncreaseQuantity = async (id) => {
    const response = await IncreaseQty(id);
    if (response.status) {
      toast.success("Success");
      handleGetCart();
    } else {
      toast.error("Failed");
    }
  };
  const DecreseQuantity = async (id) => {
    const response = await DecreseQty(id);
    if (response.status) {
      toast.success("Success");
      handleGetCart();
    } else {
      toast.error("Failed");
    }
  };

  const calculateTotal = (cartItems) => {
    let newTotal = 0;
    cartItems?.forEach((item) => {
      newTotal += item.price * item.quantity;
    });
    // console.log(newTotal)
    setTotal(newTotal);
  };
  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems?.map((items, idx) => (
            <div
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              key={idx}
            >
              <img
                src={items.images[0]}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {items.title}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">{items.brand}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => DecreseQuantity(items._id)}
                    >
                      {" "}
                      -{" "}
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={items.quantity}
                      min="1"
                      disabled
                    />
                    <span
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => IncreaseQuantity(items._id)}
                    >
                      {" "}
                      +{" "}
                    </span>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-lg">${items.price}.00</div>
                    <button
                      onClick={() => handleRemoveCart(items._id)}
                      className="cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Subtotal */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${total}.00</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">FREE</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">${total} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
