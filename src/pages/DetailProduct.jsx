import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatPrice } from "../utils/price";
import "../styles/DetailProduct.css";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"; 
import { addToCart } from "../store/reducers/cart"; 

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch(); 
  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        const productData = response.data;
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const starRate = (product.rating.rate / 5) * 5;

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      dispatch(addToCart(product));
    }else{
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
            <p className="fw-bold">{formatPrice(product.price)}</p>
            <p>{product.description}</p>
            <div className="quantity-control">
              <button className="quantity" onClick={decreaseQuantity}>
                -
              </button>
              <span>{quantity}</span>
              <button className="quantity" onClick={increaseQuantity}>
                +
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
