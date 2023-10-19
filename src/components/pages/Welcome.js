import React from "react";
import EmailForm from "./EmailForm";
import Sentbox from "./Sentbox";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authAction } from "../../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authAction.Logout());
    history("/");
  };

  return (
    <div>
      <div className="text-center mt-5">
        <h4 className="text-primary">Welcome to Mailbox Client</h4>
        <hr />

        <Button
          variant="info"
          style={{ marginTop: "1%", backgroundColor: "white" }}
        >
          <Link to="/sentbox" style={{ color: "black" }}>
            Sent Box
          </Link>
        </Button>

        <Button
          variant="btn-primary"
          style={{ marginLeft: "20px", backgroundColor: "white",  marginTop: "1%" }}
        >
          <Link to="/inbox" className="text-black">
            Inbox
          </Link>
        </Button>

        <Button
          variant="danger"
          onClick={logoutHandler}
          style={{ marginLeft: "20px", backgroundColor: "white", marginTop: "1%", color:"black" }}
        >
          Logout
        </Button>
      </div>

      <EmailForm />
    </div>
  );
}

export default Welcome;
