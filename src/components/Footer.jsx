import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()}
        <span> Clothing Store </span>
      </h5>
      <h5> All Rights Reserved </h5>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  height: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  text-align: center;
  span {
    color: #ab7a5f;
  }
  h5 {
    color: #ffff;
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`;

export default Footer;
