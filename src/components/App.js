import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 유저정보가 없으면 null이 반환된다.

  const [userObj, setUserObj] = useState(null);

  // firebase가 프로그램을 초기화하면 setInit해준다. (회원가입 로그인)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        "Initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} twitter</footer>
    </>
  );
}

export default App;
