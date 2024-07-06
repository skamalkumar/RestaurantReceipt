// src/App.js
import React, { useState } from 'react';
import './index.css';

function App() {
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    items: [{ name: '', amount: '' }],
    total: 0,
    address: '',
    orderType: 'Delivery'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, event) => {
    const values = [...orderDetails.items];
    if (event.target.name === "name") {
      values[index].name = event.target.value;
    } else if (event.target.name === "amount") {
      values[index].amount = event.target.value;
    } else {
      setOrderDetails({ ...orderDetails, [event.target.name]: event.target.value });
    }
    setOrderDetails({ ...orderDetails, items: values });
  };

  const handleAddItem = () => {
    const values = [...orderDetails.items];
    values.push({ name: '', amount: '' });
    setOrderDetails({ ...orderDetails, items: values });
  };

  const handleRemoveItem = (index) => {
    const values = [...orderDetails.items];
    values.splice(index, 1);
    setOrderDetails({ ...orderDetails, items: values });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = orderDetails.items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
    setOrderDetails({ ...orderDetails, total });
    setSubmitted(true); // Set submitted to true to display the receipt
  };

  const handlePrint = () => {
    window.print();
    setOrderDetails({
      customerName: '',
      items: [{ name: '', amount: '' }],
      total: 0,
      address: '',
      orderType: 'Delivery'
    });
    setSubmitted(false);
  };

  return (
    <div className="App bg-gradient-to-b from-blue-500 to-white min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Restaurant Receipt</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-1">Customer Name:</label>
            <input
              type="text"
              name="customerName"
              value={orderDetails.customerName}
              onChange={(e) => setOrderDetails({ ...orderDetails, customerName: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">Items:</label>
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Item"
                  name="name"
                  value={item.name}
                  onChange={(event) => handleChange(index, event)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
                <input
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  value={item.amount}
                  onChange={(event) => handleChange(index, event)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                />
                <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-500">Remove</button>
              </div>
            ))}
            <button type="button" onClick={handleAddItem} className="w-full bg-blue-500 text-white py-2 rounded">Add Item</button>
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">Address:</label>
            <textarea
              name="address"
              value={orderDetails.address}
              onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">Order Type:</label>
            <select
              name="orderType"
              value={orderDetails.orderType}
              onChange={(e) => setOrderDetails({ ...orderDetails, orderType: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="Delivery">Delivery</option>
              <option value="Takeout">Takeout</option>
              <option value="Dine-in">Dine-in</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-1">Total:</label>
            <input
              type="text"
              name="total"
              value={orderDetails.total}
              readOnly
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Submit</button>
        </form>

        {submitted && (
          <div id="printableArea" className="mt-6 text-xs">
            <h2 className="text-lg font-bold mb-2">Receipt</h2>
            <p><strong>Customer Name:</strong> {orderDetails.customerName}</p>
            <p><strong>Items:</strong></p>
            <ol className="list-decimal list-inside">
              {orderDetails.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.amount}</span>
                </li>
              ))}
            </ol>
            <p className="mt-2"><strong>Total:</strong> {orderDetails.total}</p>
            <p className="mt-2"><strong>Address:</strong> {orderDetails.address}</p>
            <p className="mt-2"><strong>Order Type:</strong> {orderDetails.orderType}</p>
          </div>
        )}

        <button onClick={handlePrint} className="w-full mt-4 bg-green-500 text-white py-2 rounded">Print Receipt</button>
      </div>
    </div>
  );
}

export default App;
