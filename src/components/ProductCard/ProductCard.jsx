import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/reducer/cartSlice";
import { useEffect } from "react";
import { messageClear } from "../../store/reducer/homeReducer";
import "./product-card.css"
const ProductCard = ({ productItem }) => {
  const { successMessage } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`shop/${productItem.slug}`);
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, dispatch]);

  const handleAddToCart = (productItem) => {
    dispatch(addToCart({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-6 p-2 ">
    <div className="product-card">
      {productItem.discount > 0 && (
        <span className="discount-badge">{productItem.discount}% Off</span>
      )}
  
      <div className="product-image-container" onClick={handleClick}>
        <img src={productItem?.images[0]} alt={productItem.name} className="product-image" />
      </div>
  
      <div className="like-button">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
  
      <div className="product-details">
        <h3
          onClick={handleClick}
          className="product-name"
          title={productItem.name}
        >
          {productItem.name}
        </h3>
        <p className="category" title={`Category: ${productItem.category}`}>
          Category: {productItem.category}
        </p>
        <p className="brand" title={`Brand: ${productItem.brand}`}>
          Brand: {productItem.brand}
        </p>
        <p className="stock">
          Stock:{" "}
          <span className={productItem.stock > 0 ? "in-stock" : "out-of-stock"}>
            {productItem.stock > 0 ? productItem.stock : "Out of Stock"}
          </span>
        </p>
  
        <div className="rating">
          {[...Array(5)].map((_, index) => (
            <i key={index} className="star fas fa-star"></i>
          ))}
        </div>
  
        <div className="price-add-to-cart">
          <h4 className="price">₹{productItem.price}</h4>
          <button
            aria-label="Add to cart"
            type="button"
            className="add-to-cart-btn"
            onClick={() => handleAddToCart(productItem)}
            disabled={productItem.stock === 0}
          >
            <ion-icon name="add" className="text-lg"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  </Col>
  
  );
};

export default ProductCard;