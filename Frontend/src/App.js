import React, { useEffect } from "react";
import "./App.css";
import Meet from "./Components/Meet/Meet";
import Join from "./Components/Join/Join";
import Home from "./Components/Home/Home";
import { ContextProvider } from "./SocketContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Signup } from "./Components/Signup/Signup";
import Login from "./Login/Login";
import Doctors from "./Doctors/Doctors";
import PatientDashboard from "./PatientDashboard/PatientDashboard";
import DoctorDashboard from "./DoctorDashboard/DoctorDashboard";
import { ToastContextProvider } from "./context/toastContext";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import SymptomChecker from "./SymptomChecker/SymptomChecker";

function App() {
  useEffect(() => {
    if (!navigator.onLine) alert("Connect to internet!");
  }, [navigator]);

  return (
    <ToastContextProvider>
      <ContextProvider>
        <Header />
        <Router>
          <Switch>
            <Route path="/" component={Hero} exact></Route>
            <Route path="/signup" component={Signup} exact></Route>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/doctors" component={Doctors} exact></Route>
            <Route
              path="/patientdashboard"
              component={PatientDashboard}
              exact
            ></Route>
            <Route
              path="/doctordashboard"
              component={DoctorDashboard}
              exact
            ></Route>

            <Route
              path="/symptomchecker"
              component={SymptomChecker}
              exact
            ></Route>

            <Route path="/home" component={Home} exact></Route>
            <Route path="/meet" component={Meet}></Route>
            <Route path="/join" component={Join}></Route>
          </Switch>
        </Router>
      </ContextProvider>
    </ToastContextProvider>
  );
}

export default App;
