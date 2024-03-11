// import { useState } from "react";

// const CreateServices = () => {
//   const [servicePrice, setServicePrice] = useState("");
//   const [currency, setCurrency] = useState("USD");
//   const [serviceDetails, setServiceDetails] = useState("");
//   return (
//     <>
//       <div className="w-full h-screen flex justify-center items-center">
//         <figure className="bg-slate-200 rounded-xl p-8 w-96 h-4/5">
//           <div className="pt-6 space-y-4">
//             <blockquote>
//               <div>
//                 <label
//                   htmlFor="price"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Enter the service price
//                 </label>
//                 <div className="relative mt-2 rounded-md shadow-sm">
//                   <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                     {/* <span className="text-gray-500 sm:text-sm">$</span> */}
//                   </div>
//                   <input
//                     type="text"
//                     name="price"
//                     id="price"
//                     className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="0.00"
//                     value={servicePrice}
//                     onChange={(e) => setServicePrice(e.target.value)}
//                   />
//                   <div className="absolute inset-y-0 right-0 flex items-center">
//                     <label htmlFor="currency" className="sr-only">
//                       Currency
//                     </label>
//                     <select
//                       id="currency"
//                       name="currency"
//                       value={setCurrency}
//                       onChange={(e) => setCurrency(e.target.value)}
//                       className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                     >
//                       <option>USD</option>
//                       <option>INR</option>
//                       <option>EUR</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h1 className="mt-4">Enter your service Details</h1>
//                 <textarea
//                   name=""
//                   id=""
//                   rows={4}
//                   className="w-full mt-5 indent-3"
//                   placeholder="eg: One hour doubt clearing session"
//                 ></textarea>
//               </div>
//               <div className="mt-5">
//                 <div className="flex items-center mb-4">
//                   <input
//                     id="default-checkbox"
//                     type="checkbox"
//                     value=""
//                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   />
//                   <label
//                     htmlFor="default-checkbox"
//                     className="ms-2 text-sm font-medium text-gray-900"
//                   >
//                     Video Call Session
//                   </label>
//                 </div>
//                 <div className="flex items-center">
//                   <input
//                     id="checked-checkbox"
//                     type="checkbox"
//                     value=""
//                     className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                   />
//                   <label
//                     htmlFor="checked-checkbox"
//                     className="ms-2 text-sm font-medium text-gray-900"
//                   >
//                     Normal Call Session
//                   </label>
//                 </div>
//               </div>
//             </blockquote>
//             <figcaption>
//               <div className="text-white flex justify-center mt-10 rounded-md px-2 py-2 bg-color-one">
//                 <button>Create</button>
//               </div>
//             </figcaption>
//           </div>
//         </figure>
//       </div>
//     </>
//   );
// };

// export default CreateServices;
