import React from "react";

const Doctors = () => {
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
              {Array(6)
                .fill(1)
                .map((doctor) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Kartik Bhatia
                    </th>
                    <td class="px-6 py-4">10</td>
                    <td class="px-6 py-4">M.B.B.S</td>
                    <td class="px-6 py-4">Rs.2999</td>
                    <td class="px-6 py-4">Haddio ka doctor</td>
                    <td class="px-6 py-4">
                      <a
                        href="#"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Pay and Talk
                      </a>
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
