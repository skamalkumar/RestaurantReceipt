import React, { useState } from 'react';
import './index.css';

const menuItems = {
  starters: [
    { name: 'Samosa', price: 3.00 },
    { name: 'Shami Kebab', price: 3.00 },
    { name: 'Seekh Kebab', price: 6.00 },
    { name: 'Lamb Chops', price: 6.50 },
    { name: 'Chicken Pakora', price: 4.50 },
    { name: 'Chicken Tikka', price: 5.00 },
    { name: 'Masala Fish', price: 6.50 },
    { name: 'Chicken Wings', price: 5.00 },
    { name: 'Mix Grill Platter', price: 11.00 },
  ],
  burgers: [
    { name: 'Chicken Burger', price: 5.50 },
    { name: 'Chicken Tikka Burger', price: 5.50 },
    { name: 'Peri Peri Fillet Burger', price: 5.50 },
    { name: 'Cheese Burger', price: 5.00 },
    { name: 'Combo Burger', price: 6.50 },
    { name: 'Fish Burger', price: 5.00 },
    { name: 'Veg Burger', price: 5.00 },
    { name: 'Meat Donner Burger', price: 5.50 },
    { name: 'Chicken Donner Burger', price: 5.50 },
    { name: 'Spicy Burger', price: 5.50 },
    { name: 'American Burger', price: 5.50 },
    { name: 'Steak Burger', price: 6.50 },
    { name: 'Tower Burger', price: 6.50 },
  ],
  wrapMeals: [
    { name: 'Chicken Wrap Meal', price: 7.00 },
    { name: 'Meat Wrap Meal', price: 7.00 },
    { name: 'Veg Wrap Meal', price: 6.00 },
  ],
  meatDonner: [
    { name: 'Meat Donner', price: 5.50 },
    { name: 'Meat Donner Meal', price: 7.00 },
    { name: 'Meat Donner in Naan', price: 6.00 },
  ],
  chickenDonner: [
    { name: 'Chicken Donner', price: 5.50 },
    { name: 'Chicken Donner Meal', price: 7.00 },
    { name: 'Chicken Donner in Naan', price: 6.00 },
  ],
  naanKebabs: [
    { name: 'Chicken Tikka Naan Kebab', price: 5.50 },
    { name: 'Chicken Seekh Naan Kebab', price: 5.50 },
    { name: 'Chicken Shami Naan Kebab', price: 5.50 },
    { name: 'Chicken Wings Naan Kebab', price: 5.50 },
    { name: 'Lamb Chops Naan Kebab', price: 7.00 },
    { name: 'Masala Fish Naan Kebab', price: 7.00 },
  ],
  curries: [
    { name: 'Chicken Curry', price: 8.00 },
    { name: 'Lamb Curry', price: 9.00 },
    { name: 'Vegetable Curry', price: 7.00 },
  ],
  pizzas: [
    { name: 'Margherita 12"', price: 9.00 },
    { name: 'Pepperoni 12"', price: 10.00 },
    { name: 'BBQ Chicken 12"', price: 11.00 },
    { name: 'Veggie Supreme 12"', price: 10.00 },
    { name: 'Meat Feast 12"', price: 12.00 },
    { name: 'Hawaiian 12"', price: 10.00 },
  ],
  newAdditions: [
    { name: 'Turkish Kebab', price: 9.00 },
    { name: 'Stir Fry Mix Grill Platter', price: 15.00 },
    { name: 'Steak with Naan or Chips', price: 10.00 },
    { name: 'Stir Fried Sheek', price: 15.00 },
    { name: 'Stir Fried Donner Naan or Chips', price: 8.00 },
    { name: 'Masala Cheesy Chips', price: 10.00 },
  ],
};

function App() {
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    items: [{ category: 'starters', name: '', price: '' }],
    total: 0,
    address: '',
    orderType: 'Delivery'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, event) => {
    
    const values = [...orderDetails.items];

    if (event.target.name === "category") {
      values[index].category = event.target.value;
      values[index].name = '';
      values[index].price = '';
    } else if (event.target.name === "name") {
      const selectedItem = menuItems[values[index].category].find(item => item.name === event.target.value);
      values[index].name = selectedItem.name;
      values[index].price = selectedItem.price;
    } else if (event.target.name === "modifyPrice") {
      const selectedItem = menuItems[values[index].category].find(item => item.name === values[index].name);
      if (selectedItem) {
        values[index].price = parseFloat(values[index].price) + parseFloat(event.target.value); // Update price based on the modification value
      } else {
       
      }
    } else if (event.target.name === "price") {
      values[index].price = event.target.value; // Update price field directly
    } else {
      setOrderDetails({ ...orderDetails, [event.target.name]: event.target.value });
    }

    setOrderDetails({ ...orderDetails, items: values });
  };

  const handleAddItem = () => {
    const values = [...orderDetails.items];
    values.push({ category: 'starters', name: '', price: '' });
    setOrderDetails({ ...orderDetails, items: values });
  };

  const handleRemoveItem = (index) => {
    const values = [...orderDetails.items];
    values.splice(index, 1);
    setOrderDetails({ ...orderDetails, items: values });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = orderDetails.items.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
    setOrderDetails({ ...orderDetails, total });
    setSubmitted(true); // Set submitted to true to display the receipt
  };

  const handlePrint = () => {
    window.print();
    setOrderDetails({
      customerName: '',
      items: [{ category: 'starters', name: '', price: '' }],
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
              <div key={index} className="flex flex-col space-y-2 mb-2">
                <select
                  name="category"
                  value={item.category}
                  onChange={(event) => handleChange(index, event)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                >
                  {Object.keys(menuItems).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  name="name"
                  value={item.name}
                  onChange={(event) => handleChange(index, event)}
                  className="w-full border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">Select item</option>
                  {menuItems[item.category].map(menuItem => (
                    <option key={menuItem.name} value={menuItem.name}>{menuItem.name}</option>
                  ))}
                </select>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Price"
                    name="price"
                    value={item.price}
                    readOnly
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                  <button
                    type="button"
                    onClick={() => handleChange(index, { target: { name: 'modifyPrice', value: 1 } })}
                    className="text-blue-500"
                  >
                    +1
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange(index, { target: { name: 'modifyPrice', value: -1 } })}
                    className="text-red-500"
                  >
                    -1
                  </button>
                </div>
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
                  <span>{item.price}</span>
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
