import React from "react";
import EmailForm from "./EmailForm";

function Welcome() {
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h2>welcome to mail box client</h2>
      </div>
      <hr />
      <EmailForm />
    </div>
  );
}

export default Welcome;
