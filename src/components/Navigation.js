import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
  // const [userName, setUserName] = useState(
  //   userObj.displayName
  // );

  return (
    <Nav>
      <Ul>
        <Li>
          <Link to="/" style={{ marginRight: 10 }}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
          </Link>
        </Li>
        <Li>
          <Link
            to="/profile"
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 Profile`
                : "Profile"}
            </span>
          </Link>
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
    color: ${(props) => props.theme.black.darker};
  }
`;

export default Navigation;
