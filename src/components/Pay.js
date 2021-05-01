import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import Header from "./Header";
import "../styles/Pay.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
//import { BrowserRouter as Router, Link } from "react-router-dom";

function Pay() {
  const [user, setUser] = useState("");
  const [card_num, setCardNum] = useState("");
  const [card_name, setCardName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [security, setSecurity] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user"));
    setUser(userObj);
  }, []);

  const notifyCard = () =>
    toast.error("The number should not be more than or less than 16");
  const notifyCVV = () => toast.error(`CVV not correct`);
  const failedPay = () => toast.error(`Oops! Something went wrong`);
  const successPay = () => toast.success(`Payment successful`);

  const lengthCheck = () => {
    (card_num.length > 16 || card_num.length < 16) && notifyCard();

    (security.length > 3 || security.length < 3) && notifyCVV();
  };

  const handlePay = async (e) => {
    e.preventDefault();

    lengthCheck();

    const resp = await axios
      .post("http://localhost:3000/payment", {
        card_num,
        card_name,
        expiration,
        security,
        amount,
      })
      .then((resp) => {
        successPay();

        setCardNum("");
        setCardName("");
        setExpiration("");
        setExpiration("");
        setSecurity("");
        setAmount("");
      })
      .catch((error) => {
        //console.log(error);
        failedPay(error);
      });

    // if (!email || !password) return;

    // const resp = await axios.get(
    //   `http://localhost:3000/users?email=${email}&&password=${password}`
    // );

    // const { data } = resp;

    // if (data.length) {
    //   localStorage.setItem("user", JSON.stringify({ email, password }));

    //   //route to payment page
    //   return history.push("/pay");
    // }

    // setEmail("");
    // setPassword("");
  };

  return (
    <main>
      <ToastContainer />
      <Header user={user} />
      <h2 className="heading">Please Input Your Card Info</h2>

      <form id="signInForm" onSubmit={handlePay}>
        <label className="block left">Card Number</label>
        <input
          id="cardField"
          className="block"
          type="number"
          name="card_num"
          placeholder="The 16 digit number in front of your card"
          required
          value={card_num}
          onChange={(e) => setCardNum(e.target.value)}
        />

        <label className="block left">Cardholder Name</label>
        <input
          id="nameField"
          className="block"
          type="text"
          name="card_name"
          placeholder="The name written on the card"
          required
          value={card_name}
          onChange={(e) => setCardName(e.target.value)}
        />

        <label className="block left">Expiration Date</label>
        <input
          id="expireField"
          className="block"
          type="month"
          name="expiration"
          placeholder="Card expiry date"
          required
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
        />

        <label className="block left">Security - CVV</label>
        <input
          id="secureField"
          className="block"
          type="password"
          name="security"
          placeholder="The 3 digit number at the back of your card"
          required
          value={security}
          onChange={(e) => setSecurity(e.target.value)}
        />

        <label className="block left">Amount to be Paid (N)</label>
        <input
          id="amountField"
          className="block"
          type="number"
          name="amount"
          placeholder="Enter the amount"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input id="submit" className="block" type="submit" value="Pay Now" />
      </form>
    </main>
  );
}

export default Pay;
