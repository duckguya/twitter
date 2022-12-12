import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  // const [userName, setUserName] = useState(
  //   userObj.displayName
  // );

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/profile">{userObj.displayName}님의 Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;