import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import styled from "styled-components";

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
        /*
         setUserObj(user) -> 이렇게 하지않고 밑에처럼 하는 이유는 
         오브젝트가(user) 너무 크기때문에 업데이트 감지를 못하면서 재랜더링이 안된다.
         때문에 오브젝트의 양을 줄여주는 방법으로 바꿔준다.
         */
        setUserObj({
          displayName: user.displayName || user.email.split("@")[0],
          uid: user.uid,
          email: user.email || "",
          photoURL: user.photoURL || "",
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <Container>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
      <Footer>&copy; {new Date().getFullYear()} twitter</Footer>
    </Container>
  );
}

const Container = styled.div`
  text-align: center;
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.footer`
  color: ${(props) => props.theme.black.lighter};
  padding-top: 100px;
`;
export default App;
