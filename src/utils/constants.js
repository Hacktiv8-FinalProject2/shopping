import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import { GiClothesline, GiDiamondRing } from "react-icons/gi";

export const login_user = `https://fakestoreapi.com/auth/login`;

export const user = `https://fakestoreapi.com/users`;

export const product = `https://fakestoreapi.com/products`;

export const category = [
  {
    id: 1,
    icon: <GiClothesline />,
    title: "Clothing",
    text: "Clothing category provides a wide range of women's clothing and men's clothing",
  },
  {
    id: 2,
    icon: <GiDiamondRing />,
    title: "Jawelery",
    text: "The jewelry category provides various kinds of women's jewelry in the form of bracelets and ring",
  },
  {
    id: 3,
    icon: <FaMobileAlt />,
    title: "Electronics",
    text: "The electronics category provides a wide range of monitors and SSD",
  },
];
