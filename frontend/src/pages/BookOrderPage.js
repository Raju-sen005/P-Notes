import React from "react";
import BookOrderForm from "../pages/BookOrderForm";
import axios from "axios";

const BookOrderPage = () => {
  const handleOrderSubmit = async (orderData) => {
    const token = localStorage.getItem("token");
    await axios.post("https://p-notes-backend.onrender.com/api/orders/", orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return <BookOrderForm onSubmit={handleOrderSubmit} />;
};

export default BookOrderPage;