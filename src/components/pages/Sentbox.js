import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sentboxAction } from "../../store/Sentboxslice";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sentbox() {
  const emaildata = useSelector((state) => state.sent.sentbox);
  const dispatch = useDispatch();

  const sender = localStorage.getItem("email").replace(/[@.]/g, ""); // Removes '@' and '.'

  const submitHandler = () => {
    fetch(
      `https://mail-box-client-86375-default-rtdb.firebaseio.com/Email/${sender}/sent.json`
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
        console.log(myarr);

        dispatch(sentboxAction.setsenbox(myarr));
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteHandler = (id) => {
    fetch(
      `https://mail-box-client-86375-default-rtdb.firebaseio.com/Email/${sender}/sent/${id}/.json`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
        },
      }
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
        submitHandler();
        //setExpensesData((data) => [...data, expenses]);
        //alert('passward reset link send plz chechk email')
        //console.log(data);
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

      {emaildata.map((item, index) => (
        <div key={index} style={{ backgroundColor: "white", margin: "2%" }}>
          <p>
            To: {item.email}&nbsp;&nbsp;&nbsp; Subject: {item.subject}
            &nbsp;&nbsp;&nbsp; Message:{"         "}
            {item.message.length > 5
              ? `${item.message.substring(0, 5)}...`
              : item.message}
            <Button
              variant="danger"
              style={{ float: "right" }}
              onClick={() => deleteHandler(item.id)}
            >
              Delete
            </Button>
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Sentbox;
