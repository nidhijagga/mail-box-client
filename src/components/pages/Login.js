import React, { useRef } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/authSlice';


function Login() {

    const emailInputref = useRef()
    const passwordInputref = useRef()
    const history = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        const enteredemail = emailInputref.current.value
        const enteredpassward = passwordInputref.current.value

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxRbT8O0S8JcEhqE1KAAHlKXIYgo_FP2M',{
            method:'POST',
            body:JSON.stringify({
                email:enteredemail,
                password:enteredpassward,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json' 
            }

        }).then((res)=>{
            if(res.ok){
                const replacedemail = enteredemail.replace('@','').replace('.','')
                localStorage.setItem('email',replacedemail)
                return res.json()

            }else{
                res.json().then((data)=>{
                    let errormessage = 'authentication failed'
                    if(data&&data.error&&data.error.errormessage){
                        errormessage = data.error.errormessage
                    }
                    throw new Error(errormessage)
                })

            }

        }).then((data)=>{
          dispatch(authAction.LogIn(data.idToken))
            history('/welcome')

        }).catch((err)=>{
          alert(err.message)
        })

    }

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Sign In
                  </h2>
                  <div className="mb-3">
                    <Form onSubmit={submitHandler}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          ref={emailInputref}
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
                          ref={passwordInputref}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      ></Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Sign In
                        </Button>
                        
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Forget passward??{" "}
                        <Button variant="link" >forget passward</Button>
                      </p>
                      <NavLink style={{textAlign:'center'}}>
                          
                      New User??{" "}
                          <Link to ='/signup' >
                          
                          Sign up
                         </Link>
                          </NavLink>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login;