import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage.js";
import AboutPage from "./about/AboutPage.js";
import Header from "./common/Header.js";
import PageNotFound from "./PageNotFound.js";
import CoursesPage from "./courses/CoursesPage.js";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/courses" component={CoursesPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
