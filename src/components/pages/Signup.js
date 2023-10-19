import React, { useRef } from "react";
import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  NavLink,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  const emailref = useRef();
  const passwardref = useRef();
  const confirmpasswordref = useRef();
  const submithandler = (e) => {
    e.preventDefault();
    const enteredemail = emailref.current.value;
    const enteredpassward = passwardref.current.value;
    const enteredconfirmpassward = confirmpasswordref.current.value;

    if (enteredpassward != enteredconfirmpassward) {
      alert("Passwords ");
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxRbT8O0S8JcEhqE1KAAHlKXIYgo_FP2M",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredemail,
          password: enteredconfirmpassward,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("Successfully Signed Up");
        emailref.current.value = "";
        passwardref.current.value = "";
        confirmpasswordref.current.value = "";
        return res.json();
      } else {
        res.json().then((data) => {
          let errormessage = "authenication failed";
          if (data && data.error && data.error.message) {
            errormessage = data.error.message;
          }
          alert(errormessage);
          emailref.current.value = "";
          passwardref.current.value = "";
          confirmpasswordref.current.value = "";
        });
      }
    });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Sign Up
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={submithandler}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          ref={emailref}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={passwardref}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          ref={confirmpasswordref}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Sign Up
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account??{" "}
                        <div>
                          <NavLink>
                            <Link to="/">Sign In</Link>
                          </NavLink>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
