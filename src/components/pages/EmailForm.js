import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

function EmailForm() {
  const emailinputref = useRef();
  const messageinputref = useRef();
  const subjectinputref = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredemail = emailinputref.current.value;
    const enteredmessage = messageinputref.current.value;
    const entersubject = subjectinputref.current.value;
    const receiver = enteredemail.replace(/[@.]/g, ""); // Removes '@' and '.'
    const sender = localStorage.getItem("email").replace(/[@.]/g, ""); // Removes '@' and '.'

    const emaildataSent = {
      email: enteredemail,
      message: enteredmessage,
      subject: entersubject,
    };
    const emaildataReceive = {
      email: localStorage.getItem("email"),
      message: enteredmessage,
      subject: entersubject,
    };

    fetch(
      `https://mail-box-client-86375-default-rtdb.firebaseio.com/Email/${sender}/sent.json`,
      {
        method: "POST",
        body: JSON.stringify(emaildataSent),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      } else {
        res
          .json()
          .then((data) => {
            if (data && data.error && data.error.message) {
              console.log(data);
              let errormessage = "not succesful " + data.error.message;
              throw new Error(errormessage);
            }
          })
          .then((data) => {})
          .catch((error) => {
            alert(error.message);
          });
      }
    });

    fetch(
      `https://mail-box-client-86375-default-rtdb.firebaseio.com/Email/${receiver}/Recieve.json`,
      {
        method: "POST",
        body: JSON.stringify(emaildataReceive),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        res
          .json()
          .then((data) => {
            if (data && data.error && data.error.message) {
              console.log(data);
              let errormessage = "not succesful " + data.error.message;
              throw new Error(errormessage);
            }
          })
          .then((data) => {})
          .catch((error) => {
            alert(error.message);
          });
      }
    });
  };

  return (
    <div style={{ margin: "5%" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="recipientEmail">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailinputref}
          />
        </Form.Group>

        <Form.Group controlId="recipientEmail">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            ref={subjectinputref}
          />
        </Form.Group>

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={5} ref={messageinputref} />
        </Form.Group>

        <Button variant="info" type="submit" style={{ marginTop: "1%", backgroundColor: "white" }}>
          Send Email
        </Button>
      </Form>
    </div>
  );
}

export default EmailForm;
