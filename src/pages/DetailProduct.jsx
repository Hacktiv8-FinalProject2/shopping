import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatPrice } from "../utils/price";
import "../styles/DetailProduct.css";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/reducers/cart";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [stock, setStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        const productData = response.data;
        setProduct(productData);
        const localData = JSON.parse(localStorage.getItem("allProducts"));
        if (localData) {
          const matchingProduct = localData.find(
            (item) => item.id === productData.id
          );
          if (matchingProduct) {
            setStock(matchingProduct.stock);
          }
        }
      } catch (error) {
        toast.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // if (!product) {
  //   return <div>Loading...</div>;
  // }

  const increaseQuantity = () => {
    if (stock !== null && quantity < stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Quantity not met. Product stock is insufficient.");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const starRate = (product.rating.rate / 5) * 5;

  const handleAddToCart = () => {
    if (isLoggedIn) {
      if (stock >= quantity) {
        const cartItem = { ...product, quantity };
        dispatch(addToCart(cartItem, stock));
        const updatedStock = stock - quantity;
        setStock(updatedStock);
        const updatedStockData = JSON.parse(
          localStorage.getItem("allProducts")
        );
        if (updatedStockData) {
          const productIndex = updatedStockData.findIndex(
            (p) => p.id === product.id
          );
          if (productIndex !== -1) {
            updatedStockData[productIndex].stock = updatedStock;
            localStorage.setItem(
              "allProducts",
              JSON.stringify(updatedStockData)
            );
          }
        }
      } else {
        toast.error("Quantity not met. Product stock is insufficient.");
      }
    } else {
      toast.warn("Please Login Now!");
      window.location.href = "/login";
    }
  };

  return (
    <div className="product-detail">
      <div className="row">
        <div className="col-md-6">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-info">
            <h2 className="product-title">{product.title}</h2>
            <div className="d-flex mt-2">
              {Array(Math.round(starRate))
                .fill()
                .map((_, index) => (
                  <FaStar key={index} color="gold" size={18} />
                ))}
              <small>{`${product.rating.count} reviews`}</small>
            </div>
            <h4 className="fw-bold">{formatPrice(product.price)}</h4>
            <p className="fw-bold"> Stock: {stock}</p>
            <p>{product.description}</p>
            <div className="quantity-control">
              <button className="quantity" onClick={decreaseQuantity}>
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button className="quantity" onClick={increaseQuantity}>
                <FaPlus />
              </button>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
