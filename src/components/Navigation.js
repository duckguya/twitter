import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = ({ userObj }) => {
  // const [userName, setUserName] = useState(
  //   userObj.displayName
  // );

  return (
    <Nav>
      <Ul>
        <Li>
          <Link to="/">Home</Link>
        </Li>
        <Li>
          <Link to="/profile">{userObj.displayName}님의 Profile</Link>
        </Li>
      </Ul>
    </Nav>
  );
};

const Nav = styled.nav`
  padding-bottom: 50px;
  width: 80%;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: space-evenly;
`;
const Li = styled.li`
  list-style-type: none;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.lightColor};
  }
`;

export default Navigation;
