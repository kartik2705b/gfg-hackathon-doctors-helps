import React, { useEffect, useState } from 'react'
import './Store.css'
import { getProducts } from '../../API/apis'

const Store = () => {
  
  const [data, setData ] = useState({})
  const [page, setPage] = useState(1);
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await getProducts(page);
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  },[page])
  console.log(data?.user);

  return (
    <div class="bg-white">
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900">Medical Store</h2>
  
      <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {data?.user?.map((product) =>
         (<div class="group relative">
          <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img src={product?.images[0]}  alt={product?.title} class="h-full w-full object-fill lg:h-full lg:w-full">
              </img>
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a href="#">
                  <span aria-hidden="true" class="absolute inset-0"></span>
                  {product?.title}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{product?.description}</p>
            </div>
            <p class="text-sm font-medium text-gray-900">${product.price}</p>
          </div>
          <button
        className="text-white w-full font-xl bg-[#1F4D36] px-4 py-2 rounded"
      >
        Add to Cart
      </button>
        </div>))}
  
      </div>
      
   
    <div className="flex items-center mt-10 justify-center ">
      <button className="border p-2 m-2 text-black rounded" onClick={()=>setPage(page-1)}>
      &lt;
      </button>
      <h1 className="border p-2 m-2 text-black rounded">{page}</h1>
      <button className="border p-2 m-2 text-black rounded" onClick={()=>setPage(page+1)}>
      &gt;
        
      </button>
    </div>
    </div>
  </div>  )
} 

export default Store
