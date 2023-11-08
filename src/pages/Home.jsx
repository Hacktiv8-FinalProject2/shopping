import React from "react";
import styled from "styled-components";
import heroBcg from "../assets/hero-bcg.jpg";
import heroBcg2 from "../assets/hero-bcg-2.jpg";
import Product from "../components/home/Product";
import Promo from "../components/home/Category";
import { Link as ScrollLink } from "react-scroll";
import { Element } from "react-scroll";
import { useSelector } from "react-redux";
import HomeAdmin from "./admin/Home";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {user !== "admin" ? (
        <>
          <Session className="container section-center">
            <article className="content">
              <h1 style={{ fontWeight: "bold" }}>
                style your <br /> fashion comfort
              </h1>
              <p>
                Our shop provides fashion that suits current trends which is
                very popular with everyone, especially young people, with good
                quality and affordable prices.
              </p>
              <ScrollLink className="btn hero-btn" to="shop" smooth={false}>
                SHOP NOW
              </ScrollLink>
            </article>
            <article className="img-container">
              <img src={heroBcg} alt="nice table" className="main-img" />
              <img src={heroBcg2} alt="person working" className="accent-img" />
            </article>
          </Session>
          <Promo />
          <Element name="shop">
            <div className="title text-center" style={{ paddingTop: "200px" }}>
              <h2 style={{ fontWeight: "bold" }}>Featured Products</h2>
              <Underline />
            </div>
            <div style={{ paddingTop: "50px" }}>
              <Product />
            </div>
          </Element>
        </>
      ) : (
        <HomeAdmin />
      )}
    </>
  );
};

const Session = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: #808080;
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      background-color: #ab7a5f;
      color: #fff;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: 5px;
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: 5px;
    }
    .img-container::before {
      content: "";
      position: absolute;
      width: 10%;
      height: 80%;
      background: #ab7a5f;
      bottom: 0%;
      left: -8%;
      border-radius: 5px;
    }
  }
`;

const Underline = styled.div`
  width: 50px;
  height: 4px;
  background-color: #ab7a5f;
  margin: 0 auto;
  margin-top: 10px;
`;

export default Home;
