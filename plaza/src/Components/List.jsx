import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaTimes } from "react-icons/fa";

const List = () => {
const baseURL = "https://delight-backend-suuw.onrender.com";

  const [items, setItems] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemData, setEditItemData] = useState({
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
    name: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${baseURL}/get`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleEdit = (id) => {
    setEditItemId(id);
    const item = items.find((item) => item.id === id);
    if (item) {
      setEditItemData(item);
    }
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(`${baseURL}/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editItemData),
      });

      if (response.ok) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, ...editItemData } : item
          )
        );
        setEditItemId(null);
        setEditItemData({
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
          name: "",
        });
      } else {
        alert("Failed to update item. Please try again.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditItemData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${baseURL}/delete/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete item. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleShowDetails = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.siteName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 shadow-lg rounded-xl border border-gray-300 my-6">
<div className="flex flex-col md:flex-row items-center justify-between mb-8">
  <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Customer</h2>
  <input
    type="text"
    placeholder="Search..."
    value={searchQuery}
    onChange={handleSearchChange}
    className="p-3 border border-gray-300 rounded-md shadow-sm w-full md:w-1/3"
  />
</div>


      <ul className="space-y-6">
        {filteredItems.map((item) => (
          <li
            key={item.id}
            className="p-6 border border-gray-300 rounded-lg flex flex-col space-y-4 bg-white shadow-lg"
          >
            <div className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-2 mb-4">
              {item.name}
            </div>

            <div className="flex flex-col space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="font-medium capitalize text-gray-700">Receipt No:</span>
                <span className="text-gray-900">{item.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium capitalize text-gray-700">Total Amount:</span>
                <span className="text-gray-900">{item.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium capitalize text-gray-700">Balance Due:</span>
                <span className="text-gray-900">{item.balanceDue}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium capitalize text-gray-700">Site Name:</span>
                <span className="text-gray-900">{item.siteName}</span>
              </div>
            </div>

            {editItemId === item.id ? (
              <div className="space-y-4 mb-4">
                {Object.keys(editItemData).map((field) => (
                  <div key={field} className="flex items-center space-x-3">
                    <label className="w-40 font-medium capitalize text-gray-700">{field}:</label>
                    <input
                      type="text"
                      name={field}
                      value={editItemData[field]}
                      onChange={handleChange}
                      className="p-2 border border-gray-300 rounded-md shadow-sm flex-1"
                    />
                  </div>
                ))}
                <button
                  onClick={() => handleSave(item.id)}
                  className="bg-blue-600 text-white py-2 px-5 rounded-md shadow-lg flex items-center space-x-2 hover:bg-blue-700 transition"
                >
                  <FaEdit />
                  <span>Save</span>
                </button>
              </div>
            ) : (
              <div className="flex space-x-3 items-center justify-center">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-gray-500 text-white py-2 px-5 rounded-md shadow-lg flex items-center space-x-2 hover:bg-yellow-600 transition"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-gray-500 text-white py-2 px-5 rounded-md shadow-lg flex items-center space-x-2 hover:bg-red-600 transition"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => handleShowDetails(item)}
                  className="bg-gray-500 text-white py-2 px-5 rounded-md shadow-lg flex items-center space-x-2 hover:bg-yellow-600 transition"
                >
                  <FaEye />
                  <span>Details</span>
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {selectedItem && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">Details</h3>
              <button
                onClick={handleCloseDetails}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="space-y-4">
              {Object.keys(selectedItem).map((field) => (
                <div key={field} className="flex justify-between">
                  <span className="font-medium capitalize text-gray-700">{field}:</span>
                  <span className="text-gray-900">{selectedItem[field]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
