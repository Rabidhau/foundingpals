
import React from "react";
import Subheader from "./assets/subheader";
import Sidebar from "./assets/sidebar";

const ContractPage = () => {
    return (
        <div className="flex h-screen w-screen bg-gray-50">
       <Sidebar />
          <div className="flex-1 p-6 overflow-y-auto">
            <Subheader />
    
            <h1 className="text-2xl font-semibold text-black mb-10">Contracts</h1>

{/* Main Content */}
<div className=" mt-40 text-center justify-center">
  <h2 className="text-3xl font-bold text-black mb-4">
    Contracts & Simple E-Signing
  </h2>
  <p className="text-gray-600 mb-6">
    Use standardized contracts or create a completely custom one. Enter
    your payment terms and scope, and send it to be e-signed.
  </p>

  {/* Button */}
  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
    Create contract
  </button>

</div>
            

          </div>
        </div>
      );
};

export default ContractPage;

