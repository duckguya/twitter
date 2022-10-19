import { authService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    // navigate("/", { replace: true });
    // Router에서 Navigate 대신 useNaviagte를 사용할 수도 있다.
  };

  return <button onClick={onLogOutClick}>Log Out</button>;
};
