import "./App.css";
import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const newsAppData = JSON.parse(localStorage.getItem("newsAppData"));

  const pageSize = 5;
  const [progress, setProgress] = useState(0);
  const country = "in";
  const language = "english";

  return (
    <BrowserRouter basename="/">
      <NavBar />
      <LoadingBar height={3} color="#f11946" progress={progress} />
      <Routes>
        <Route
          path="/"
          element={
            newsAppData?.loggedIn ? (
              <News
                setProgress={setProgress}
                key="general"
                pageSize={pageSize}
                country={country}
                category="general"
                language={language}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/business"
          element={
            newsAppData?.loggedIn ? (
              <News
                setProgress={setProgress}
                key="business"
                pageSize={pageSize}
                country={country}
                category="business"
                language={language}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/entertainment"
          element={
            newsAppData?.loggedIn ? (
              <News
                setProgress={setProgress}
                key="entertainment"
                pageSize={pageSize}
                country={country}
                category="entertainment"
                language={language}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/general"
          element={
            newsAppData?.loggedIn ? (
              <News
                setProgress={setProgress}
                key="general"
                pageSize={pageSize}
                country={country}
                category="general"
                language={language}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/health"
          element={
            newsAppData?.loggedIn ? (
              <News
                setProgress={setProgress}
                key="health"
                pageSize={pageSize}
                country={country}
                category="health"
                language={language}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/science"
          element={
            newsAppData?.loggedIn ? (
              <News
                setProgress={setProgress}
                key="science"
                pageSize={pageSize}
                country={country}
                category="science"
                language={language}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/sports"
          element={
            newsAppData?.loggedIn ? (
              <News
                setProgress={setProgress}
                key="sports"
                pageSize={pageSize}
                country={country}
                category="sports"
                language={language}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/technology"
          element={
            newsAppData?.loggedIn ? (
              <News
                setProgress={setProgress}
                key="technology"
                pageSize={pageSize}
                country={country}
                category="technology"
                language={language}
              />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            !newsAppData?.loggedIn ? <Login /> : <Navigate replace to="/" />
          }
        />
        <Route
          path="/register"
          element={
            !newsAppData?.loggedIn ? (
              <Register />
            ) : (
              <Navigate replace to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
