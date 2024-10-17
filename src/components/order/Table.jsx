import React, { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './tables.css';

const Table = () => {
  const { table_num } = useParams();

  const [orders, setOrders] = useState([]);
  const [insertedID, setInsertedID] = useState("");



  const [feedbackData, setFeedbackData] = useState({
    foodQuality: '',
    overallServiceQuality: '',
    cleanliness: '',
    orderAccuracy: '',
    speedOfService: '',
    value: '',
    overallExperience: '',
    text: '',
    
  });

  const inputRef = useRef(null);



  const downloadPDF = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4', true); // Adjust page size and orientation as needed
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0; // Adjust vertical positioning as needed

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('invoice.pdf');
      localStorage.removeItem(`table${table_num}`);
      setInsertedID("")
      setFeedbackData({ // Reset feedback form
        foodQuality: '',
        overallServiceQuality: '',
        cleanliness: '',
        orderAccuracy: '',
        speedOfService: '',
        value: '',
        overallExperience: '',
        text: ''
      })
      setOrders([])

     
    });
  };




  const fetchData = async (id) => {
    
    
    try {
      const response = await fetch( `https://server-08ld.onrender.com/get_rating/${id}`);
      const jsonData = await response.json();
      console.log(jsonData); // Assuming setItems is used for a different purpose
      setFeedbackData({
        ...feedbackData,
        ...jsonData
      });
      setOrders(jsonData.orders)
    } catch (error) {
      console.log(error);
    }
  };
  const getOrder = () => {
    const storedData = JSON.parse(localStorage.getItem(`table${table_num}`));

    if (storedData) {
      fetchData(storedData.order_id);
      setInsertedID(storedData.order_id)
   
    }
    
   
  };

  const handleSubmit = async (event) => {
    const newFeedback = feedbackData
    newFeedback.orders = orders
    newFeedback.order = "placed"
    newFeedback.table = table_num
    newFeedback.bill = orders.reduce((total, item) => total + item.price * item.quantity, 0)

    event.preventDefault();

    // Check if any field is empty (you might want to implement more specific validation)
    
    try {
      const response = await fetch(`https://server-08ld.onrender.com/set_rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFeedback),
      });

      const responseData = await response.json();
      console.log("Response data:", responseData);
      setInsertedID(responseData.insertedId)
      localStorage.setItem(`table${table_num}`, JSON.stringify({ table: table_num, order_id: responseData.insertedId }));

      if (!response.ok) {
        throw new Error(`Error updating user data: ${responseData.message}`);
      }

      // Handle successful feedback submission (e.g., clear feedback form, display success message)
      // Assuming response data contains an ID
    
    } catch (serverError) {
      console.error("Error updating user data:", serverError);
      alert(
        "An error occurred while updating your feedback. Please try again."
      );
    }
  };




  const items = [
    { _id: "1", name: "chicken", price: 100 },
    { _id: "2", name: "fish", price: 110 },
    { _id: "3", name: "beef", price: 160 },
  ];

  const addOrder = (item) => {
    // Check if the item already exists in orders using object comparison
    const existingOrder = orders.find(existing => existing._id === item._id);

    if (!existingOrder) {
      // Create a new order object with quantity 1
      const newOrder = { ...item, quantity: 1 };
      setOrders([...orders, newOrder]); // Efficiently update orders with spread syntax
    } else {
      // Update the existing order's quantity
      const updatedOrders = orders.map(order =>
        order._id === existingOrder._id ? { ...order, quantity: order.quantity + 1 } : order
      );
      setOrders(updatedOrders);
    }
  };

  useEffect(() => {
 
    // const fetchData2 = async () => {
    //   try {
    //     const response = await fetch(`https://server-08ld.onrender.com/tables/${table_num}`);
    //     const jsonData = await response.json();
    //     console.log(jsonData); // Assuming setItems is used for a different purpose
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    getOrder()

   
    // fetchData2()
  }, [table_num,setInsertedID]); // Ensure useEffect runs only when table_num changes

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      {/* Order Menu */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {items.map((item) => (
          <div key={item._id} style={{ border: "6px solid white", padding: "3px", margin: "3px" }}>
            <h1>{item.name}</h1>
            <button onClick={() => addOrder(item)}>{item.price+"tk"}</button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', border: "2px solid blue"}}>
       <span  ref={inputRef}>
       
        {orders.map(order => (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px'}} key={order._id}>
            <h3>{order.name}({order.quantity}{"X"}) ={order.price * order.quantity}tk</h3>
       
          </div>
        ))}
        <h3>Sub Total: {orders.reduce((total, item) => total + item.price * item.quantity, 0)}tk</h3>
        {feedbackData.foodQuality === "" ? (
          <h3>Total:  {orders.reduce((total, item) => total + item.price * item.quantity, 0)}tk</h3>
        ) : (
          
          <h3>Total: {feedbackData.bill}tk (after 10% dis.)</h3>
        )}
         {insertedID === "" ? (
          <br />
        ) : (
          
          <QRCodeSVG value={`https://vbcqr.vercel.app/rating/${insertedID}`}/>
        )}
       

       </span>
        {insertedID === "" ? (
          <div>
            <h1>Place Order</h1>
            <button onClick={handleSubmit}>Place Confirm</button>
          </div>
        ) : (
          <div>
           
            <button onClick={downloadPDF}>Order Confirm</button>
          </div>
        )}
      </div>

      {/* Bill Area (you can implement your bill logic here) */}
      <div id='bill'>
      </div>
    </div>
  );
};

export default Table;