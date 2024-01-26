import React, { useContext, useEffect, useState } from "react";
import ToastContext from "../../context/toastContext";
import "./Store.css";
import { AddToCart, getProductBySearch, getProducts } from "../../API/apis";

const Store = () => {
  const { toast } = useContext(ToastContext);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts(page);
        setData(response.user);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [page]);

  const handleAddToCart = async (product) => {
    if(!localStorage.getItem("token")){
      return toast.error("Login to add Items to cart")
    }
    console.log("clicked");
    const response = await AddToCart(product, 1);
    if (response.status) {
      toast.success("Added To Cart");
    } else {
      toast.error("Failed To Add");
    }
  };

  useEffect(async () => {
    if (search?.length > 3) {
      const response = await getProductBySearch(search);

      if (response.status) {
        setData(response.data);
      } else {
        toast.error("No Medicine Found");
      }
    }
  }, [search]);

  return (
    <div className="bg-[#F2F4EA]">
      <div className="ml-12">
        <input
          className="mt-2 w-64 h-10 px-2 py-4 shadow-lg rounded-lg"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for Medicines..."
        />
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Medical Store
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data?.map((product, idx) => (
            <div className="" key={idx}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product?.images[0]}
                  alt={product?.title}
                  className="h-full w-full object-fill lg:h-full lg:w-full"
                ></img>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product?.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product?.description}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {product?.category}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
              <button
                className="text-white w-full font-xl bg-[#1F4D36] px-4 py-2 rounded"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center mt-10 justify-center ">
          <button
            className="border p-2 m-2 text-black rounded"
            onClick={() => (page > 1 ? setPage(page - 1) : setPage(page))}
          >
            &lt;
          </button>
          <h1 className="border p-2 m-2 text-black rounded">{page}</h1>
          <button
            className="border p-2 m-2 text-black rounded"
            onClick={() =>
              data?.length === 8 ? setPage(page + 1) : setPage(page)
            }
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;
