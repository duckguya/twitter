import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import EditProfile from "routes/EditProfile";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  /* isLoggedIn : 로그인 되어있는지 확인 */
  return (
    <HashRouter>
      {isLoggedIn && <Navigation userObj={userObj} />}

      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />} />
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            />
            <Route
              path="/editProfile"
              element={
                <EditProfile userObj={userObj} refreshUser={refreshUser} />
              }
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
