import React from "react";
import { useState } from "react";
import { inboxAction } from "../../store/InboxSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Inbox() {
  const dispatch = useDispatch();
  const inboxdata = useSelector((state) => state.in.inbox);
  console.log(inboxdata);

  const receiver = localStorage.getItem("email").replace(/[@.]/g, ""); // Removes '@' and '.'

  const submitHandler = () => {
    fetch(
      `https://mail-box-client-86375-default-rtdb.firebaseio.com/Email/${receiver}/Recieve.json`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            if (data && data.error && data.error.message) {
              let errMessage = "Authentication Failed, " + data.error.message;
              throw new Error(errMessage);
            }
          });
        }
      })
      .then((data) => {
        const myarr = [];

        for (let i in data) {
          myarr.unshift({
            id: i,
            email: data[i].email,
            subject: data[i].subject,
            message: data[i].message,
          });
        }

        //console.log(data)
        console.log(myarr);
        dispatch(inboxAction.setinbox(myarr));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    submitHandler();
  }, []);

  return (
    <div>
      <Button
        variant="outline-info"
        style={{ marginTop: "1%", backgroundColor: "white" }}
      >
        <Link to="/welcome">Compose email</Link>
      </Button>

      {inboxdata.map((item, index) => (
        <div key={index} style={{ backgroundColor: "white", margin: "2%" }}>
          <p>
            From: {item.email}&nbsp;&nbsp;&nbsp; Subject: {item.subject}
            &nbsp;&nbsp;&nbsp; Message:{" "}
            {item.message.length > 5
              ? `${item.message.substring(0, 5)}...`
              : item.message}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Inbox;
