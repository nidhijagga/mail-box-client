import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

function EmailForm() {
  const emailinputref = useRef();
  const messageinputref = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredemail = emailinputref.current.value;
    const enteredmessage = messageinputref.current.value;

    const emaildata = { email: enteredemail, message: enteredmessage };

    fetch(
      `https://mail-box-client-86375-default-rtdb.firebaseio.com/Email/${localStorage.getItem(
        "email"
      )}.json`,
      {
        method: "POST",
        body: JSON.stringify(emaildata),
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

        <Form.Group controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={5} ref={messageinputref} />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: "1%" }}>
          Send Email
        </Button>
      </Form>
    </div>
  );
}

export default EmailForm;
