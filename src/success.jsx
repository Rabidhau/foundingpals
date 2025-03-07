import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("Verifying payment...");
  const [isSuccess, setIsSuccess] = useState(false);
  const isExecuted = useRef(false); // Track execution

  // Clean the transaction UUID
  const transaction_uuid = searchParams.get("transaction_uuid");
  const cleanTransactionUUID = transaction_uuid ? transaction_uuid.split("?")[0] : null;

  useEffect(() => {
    const verifyPaymentAndSaveAgreement = async () => {
      if (!cleanTransactionUUID || isExecuted.current) return; // Prevent duplicate execution

      isExecuted.current = true; // Mark as executed

      try {
        // Verify payment
        const paymentResponse = await axios.post("http://localhost:3000/verify-payment", {
          transaction_uuid: cleanTransactionUUID,
          status: "Completed",
        });

        if (paymentResponse.data.success) {
          setPaymentStatus("Payment verified successfully! 🎉");
          setIsSuccess(true);

          // Retrieve agreement data from localStorage
          const agreementData = JSON.parse(localStorage.getItem("agreementData"));
          console.log("Retrieved agreementData:", agreementData);

          if (agreementData) {
            // Post agreement data to the database
            const agreementResponse = await axios.post("http://localhost:3000/agreements", agreementData);

            if (agreementResponse.status === 200) {
              console.log("Agreement saved successfully");
              localStorage.removeItem("agreementData"); // Clear localStorage after saving
            } else {
              console.error("Failed to save agreement");
            }
          } else {
            console.error("No agreement data found in localStorage");
          }
        } else {
          setPaymentStatus("Payment verification failed. Please contact support.");
        }
      } catch (error) {
        console.error("Error:", error);
        setPaymentStatus("Error: Payment verification failed. Please contact support.");
      }
    };

    verifyPaymentAndSaveAgreement();
  }, [cleanTransactionUUID]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-full max-w-md">
        {isSuccess ? (
          <h2 className="text-2xl font-semibold text-green-600 animate-pulse">🎉 Payment Successful!</h2>
        ) : (
          <h2 className="text-2xl font-semibold text-red-600">{paymentStatus}</h2>
        )}

        <p className="text-gray-600 mt-4">{paymentStatus}</p>

        <button
          onClick={() => navigate("/home")}
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;