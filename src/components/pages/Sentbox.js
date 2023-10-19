import React from "react";
import { useDispatch } from "react-redux";
import { sentboxAction } from "../../store/Sentboxslice";
import { useSelector } from "react-redux";

function Sentbox() {
  const emaildata = useSelector((state) => state.sent.sentbox);
  const dispatch = useDispatch();
  fetch(
    `https://mail-box-client-86375-default-rtdb.firebaseio.com/Email/${localStorage.getItem(
      "email"
    )}.json`
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
        myarr.push({
          id: i,
          email: data[i].email,
          message: data[i].message,
        });
      }

      //console.log(data)
      console.log(myarr);
      dispatch(sentboxAction.setsenbox(myarr));
    })
    .catch((err) => {
      alert(err.message);
    });

  return (
    <div>
      {emaildata.map((item, index) => (
        <div key={index}>
          <p>email:{item.email}</p>
          <p>message:{item.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Sentbox;
