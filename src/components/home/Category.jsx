import React from "react";
import styled from "styled-components";
import { category } from "../../utils/constants";

const Category = () => {
  return (
    <Wrapper>
      <div className="container section-center">
        <article className="header">
          <h3>
            product categories <br />
            in the Store
          </h3>
          <p>
            Our shop provides several categories of the latest fashion and
            electronic products needed by young people as listed below
          </p>
        </article>
        <div className="category-center">
          {category.map((category) => {
            const { id, icon, title, text } = category;
            return (
              <article key={id} className="category">
                <span className="icon">{icon}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h3,
  h4 {
    color: hsl(22, 28%, 21%);
  }
  padding: 5rem 0;

  background: hsl(22, 31%, 88%);

  .header h3 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;
    color: hsl(22, 28%, 37%);
  }
  .category-center {
    margin-top: 4rem;
    display: grid;
    gap: 2.5rem;
  }
  .category {
    background: hsl(22, 31%, 67%);
    text-align: center;
    padding: 2.5rem 2rem;
    border-radius: 0.25rem;
    p {
      color: hsl(22, 28%, 29%);
    }
  }
  span {
    width: 4rem;
    height: 4rem;
    display: grid;
    margin: 0 auto;
    place-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background: hsl(22, 31%, 88%);
    color: hsl(22, 28%, 21%);
    svg {
      font-size: 2rem;
    }
  }
  @media (min-width: 992px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 576px) {
    .category-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 1280px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`;
export default Category;
