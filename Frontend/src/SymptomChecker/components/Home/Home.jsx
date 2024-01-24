import React, { Component } from "react";
import "./Home.css";

const Home = (props) => {
  //   console.log("is checked", props, props.isChecked, props.checked);
  return (
    <React.Fragment>
      <div id="Home" className="tablet:grid-col padding-x-2">
        <p className="text-center text-lg md:text-xl my-3">
          Before using this symptom checker, please read carefully and accept
          our Terms and Services
        </p>
        <ul className="text-lg mt-8">
          <p>This checkup is not a diagnosis.</p>
          <p>
            This checkup is for informational purposes and is not a qualified
            medical opinion.
          </p>
          <p>
            Information that you provide is anonymous and not shared with
            anyone. We also do not store any information on our server.
          </p>
        </ul>
        <form class="usa-form TermsCheckbox my-5">
          <div class="usa-checkbox">
            <input
              checked={props.isChecked}
              onChange={props.checked}
              class="usa-checkbox__input"
              id="truth"
              type="checkbox"
              name="historical-figures-1"
              value="truth"
            />
            <label class="ml-4 font-medium " for="truth">
              I agree to the terms and conditions
            </label>
          </div>
        </form>
      </div>

      <div className="tablet:grid-col">
        {/* <img src="/images/TOS.png" /> */}
      </div>
    </React.Fragment>
  );
};

export default Home;
