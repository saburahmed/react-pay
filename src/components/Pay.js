import { React, useEffect, useState } from "react";
import Header from "./Header";
import "../styles/Pay.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const customId = "custom-id-yes";

function Pay() {
  const [user, setUser] = useState("");
  const [card_num, setCardNum] = useState("");
  const [card_name, setCardName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [security, setSecurity] = useState("");
  const [amount, setAmount] = useState("");

  //let history = useHistory();

  // const notUser = () => {
  //   if (!user) {
  //     history.push("/");
  //   }
  // };
  // notUser();

  useEffect(() => {
    const userObj = JSON.parse(localStorage.getItem("user"));
    setUser(userObj);
  }, []);

  const notifyCard = () =>
    toast.error("Card number should not be more than or less than 16", {
      toastId: customId,
    });
  const notifyCVV = () =>
    toast.error(`CVV not correct`, {
      toastId: customId,
    });
  const failedPay = () =>
    toast.error(`Oops! Something went wrong`, {
      toastId: customId,
    });
  const successPay = () =>
    toast.success(`Payment successful`, {
      toastId: customId,
    });

  const lengthCheck = () => {
    if (card_num.length !== 16) {
      notifyCard();
    }

    if (security.length !== 3) {
      notifyCVV();
    }
  };

  const handlePay = async (e) => {
    e.preventDefault();

    lengthCheck();

    if (security.length === 3 && card_num.length === 16) {
      const resp = await axios
        .post("http://localhost:3000/payment", {
          //.post(`http://my-json-server.typicode.com/saburahmed/react-pay/payment`,{
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
          failedPay();
        });
    } else {
      failedPay();
    }
  };

  return (
    <main>
      <Header user={user} />
      <ToastContainer />
      <h2 className="heading">Please Input Your Card Info</h2>

      <form id="signInForm" onSubmit={handlePay} autocomplete="off">
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

        <label className="block left">Amount to be Paid (Naira)</label>
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
