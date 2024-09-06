import React, { useState } from "react";
import { BsBuildings } from "react-icons/bs";
import { MdFileDownloadDone } from "react-icons/md";
import { MdOutlineLocationOn, MdOutlineMarkEmailRead } from "react-icons/md";

const Form = () => {
const baseURL = "https://delight-backend-suuw.onrender.com";

  const [formData, setFormData] = useState({
    receiptNo: "",
    date: "",
    receivedFrom: "",
    siteName: "",
    unitNo: "",
    floor: "",
    chequeNo: "",
    chequeDate: "",
    bankName: "",
    utrNo: "",
    amountReceived: "",
    totalAmount: "",
    balanceDue: "",
    name: "", // Added new field
  });

  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.receiptNo) {
      setAlert({ show: true, message: "Please enter a Receipt No.", type: "error" });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
      return;
    }

    try {
      const response = await fetch(`${baseURL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlert({ show: true, message: "Receipt Submitted Successfully!", type: "success" });
        setFormData({
          receiptNo: "",
          date: "",
          receivedFrom: "",
          siteName: "",
          unitNo: "",
          floor: "",
          chequeNo: "",
          chequeDate: "",
          bankName: "",
          utrNo: "",
          amountReceived: "",
          totalAmount: "",
          balanceDue: "",
          name: "", // Reset new field
        });
      } else {
        setAlert({ show: true, message: "Failed to submit receipt. Please try again.", type: "error" });
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setAlert({ show: true, message: "An error occurred. Please try again.", type: "error" });
    } finally {
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto p-8 bg-gray-50 shadow-lg rounded-xl border border-gray-200 my-5">
      {alert.show && (
        <div
          className={`fixed top-5 right-5 p-4 rounded-md shadow-lg ${
            alert.type === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {alert.message}
        </div>
      )}

      <div className="text-center mb-6 border p-4 border-gray-300 rounded-lg bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center mb-2">
          <BsBuildings className="text-gray-600 text-4xl mr-2" />
          Delight Developers
        </h1>
        <p className="text-gray-600 flex items-center justify-center mb-1">
          <MdOutlineLocationOn className="text-gray-600 text-xl mr-1" />
          Victory Height Residency Building, Opp. Ayesha Tarin School, Anoop
          Shahar Road, Aligarh.
        </p>
        <p className="text-gray-600 flex items-center justify-center">
          <MdOutlineMarkEmailRead className="text-gray-600 text-xl mr-1" />
          Email: delightplaza1@gmail.com
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Payment Receipt
      </h2>

      <form
        id="receipt-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {Object.entries({
          name: "Name", // Added new field
          receiptNo: "Receipt No",
          date: "Date",
          receivedFrom: "Payment Received",
          siteName: "Site Name",
          unitNo: "Unit No",
          floor: "Floor",
          chequeNo: "Cheque No",
          chequeDate: "Cheque Date",
          bankName: "Bank Name",
          utrNo: "UTR / RTGS No",
          amountReceived: "Amount Received By",
          totalAmount: "Total Amount Due Rs",
          balanceDue: "Balance Due Rs",
        }).map(([key, label]) => (
          <React.Fragment key={key}>
            <label htmlFor={key} className="text-gray-700 font-medium">
              {label}:
            </label>
            <input
              type={
                key.includes("Date")
                  ? "date"
                  : key.includes("Amount")
                  ? "number"
                  : "text"
              }
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key.includes("Amount") ? "₹0.00" : ""}
              className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </React.Fragment>
        ))}
      </form>

      <div className="w-auto mx-auto justify-center items-center flex mt-8">
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition flex items-center justify-center space-x-2"
          form="receipt-form"
        >
          <MdFileDownloadDone className="text-white text-xl" />
          <span>Submit</span>
        </button>
      </div>

      <div className="border-t border-gray-300 w-full h-2 mt-10"></div>

      <div className="flex justify-between mt-8 text-gray-800 text-sm gap-3">
        <div className="flex flex-col items-center w-1/2 p-4 border border-gray-300 rounded-lg">
          <div className="border-t border-gray-300 w-full h-2 mt-10"></div>
          <p className="">Authorized Signature</p>
        </div>
        <div className="flex flex-col items-center w-1/2 p-4 border border-gray-300 rounded-lg">
          <div className="border-t border-gray-300 w-full h-2 mt-10"></div>
          <p className="">Buyer Signature</p>
        </div>
      </div>

      <div className="semi-bold mb-6 border mt-5 p-4 border-gray-300 rounded-lg bg-gray-100">
        <h3 className="text-lg font-semibold mt-8 text-gray-800">
          Terms and Conditions
        </h3>
        <ol className="list-decimal list-inside mt-2 text-gray-700">
          <li>
            The demanded Showroom/Floor will be allocated to the purchaser after
            receiving or tendering the amount not less than 30% of the sale
            consideration thereof to the seller.
          </li>
          <li>
            Prior to the amount payment of 30% of sale consideration, the
            purchaser will have no claim, right, or concern with the proposed
            unit.
          </li>
          <li>
            After receiving 30% payment out of the sale consideration,
            continuous agreed installments shall be paid to the seller month to
            month regularly, and in case of any two consecutive non-payment of
            installments, the agreement for allocation of the unit shall be
            cancelled automatically without any notice or information.
          </li>
          <li>
            Any payment regarding the proposed unit shall not be acceptable or
            claimable in case of cash payment or otherwise except by Bank
            cheque.
          </li>
          <li>
            The stamp expenses, fee, taxes, GST etc for registration of the
            concerned document shall be borne by the purchaser.
          </li>
          <li>All the rights will be reserved to the owner/promoter.</li>
        </ol>
      </div>
    </div>
  );
};

export default Form;
