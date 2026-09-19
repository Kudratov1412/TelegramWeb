import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import { getData } from "./constants/db";
import Card from "./Components/Card/card";
import Cart from "./Components/Cart/cart";

const courses = getData();

const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    telegram.ready();
    console.log("djueisjfesidij");
  });

  const onAddItem = (item) => {
    const existItem = cartItems.find((c) => c.id == item.id);

    if (existItem) {
      const data = cartItems.map((c) =>
        c.id == item.id ? { ...item, quantity: existItem.quantity + 1 } : c,
      );
      setCartItems(data);
    } else {
      const newData = [
        ...cartItems,
        {
          ...item,
          quantity: 1,
        },
      ];
      setCartItems(newData);
    }
  };

  const onRemoveItem = (item) => {
    const existItem = cartItems.find((c) => c.id == item.id);

    if (existItem.quantity === 1) {
      const newData = cartItems.filter((c) => c.id !== existItem.id);
      setCartItems(newData);
    } else {
      const newData = cartItems.map((c) =>
        c.id === existItem.id
          ? { ...existItem, quantity: existItem.quantity - 1 }
          : c,
      );
      setCartItems(newData);
    }
  };

  const onCheckout = () => {
    telegram.MainButton.text = "Sotib olish :)";
    telegram.MainButton.show();

    console.log(cartItems);
  };

  const onSendData = useCallback(() => {
    const queryID = telegram.initDataUnsafe?.query_id;

    if (queryID) {
      fetch("https://furqat-telegram-bot-8e38c0bf34c0.herokuapp.com/web-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cartItems, queryID: queryID }),
      });
    } else {
      telegram.sendData(JSON.stringify(cartItems));
      console.log("dvsvdsfsfddfs");
      
    }
  }, [cartItems]);

  useEffect(() => {
    telegram.onEvent("mainButtonClicked", onSendData);

    console.log("fdeswsgdsffds");

    return () => telegram.offEvent("mainButtonClicked", onSendData);
  }, [onSendData]);

  return (
    <>
      <h1 className="heading">Furqatning kurslari</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {courses.map((course) => (
          <Card
            key={course.id}
            course={course}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>
    </>
  );
};

export default App;
