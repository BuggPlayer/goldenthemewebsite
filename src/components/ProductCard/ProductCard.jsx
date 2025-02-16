import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/reducer/cartSlice";
import { useEffect } from "react";
import { messageClear } from "../../store/reducer/homeReducer";
// import { addToCart } from "../../st";
// addToCart
const ProductCard = ({ productItem }) => {
  const { successMessage, errorMessage } = useSelector(state => state.home)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/${productItem._id}`);
  };
  useEffect(() => {
    if (successMessage) {
        toast.success(successMessage)
        dispatch(messageClear())
    }
}, [successMessage])

  const handleAddToCart = (productItem) => {

        dispatch(addToCart({ product: productItem, num: 1 }));

    // dispatch(add_to_card({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  return (
    <Col
  md={6}
  lg={4}
  xl={3}
  sm={6}
  xs={12}
  className="product mtop"

>

    {/* Discount Badge */}
    {productItem.discount > 0 && (
      <span className="discount badge bg-btn-primary position-absolute top-0 start-0 m-2 p-2">
        {productItem.discount}% Off
      </span>
    )}
  
    {/* Product Image */}
    <div className="product-image" onClick={handleClick}>
      <img
        loading="lazy"
        src={productItem?.images[0]}
        alt={productItem.name}
        className="img-fluid rounded-3"
        style={{ width: "100%", height: "auto",  }}
      />
    </div>
  
    {/* Like Button */}
    <div className="position-absolute top-0 end-0 m-2">
      <ion-icon
        name="heart-outline"
        style={{ fontSize: "1.5rem", cursor: "pointer", color: "#fff" }}
      ></ion-icon>
    </div>
  
    {/* Product Details */}
    <div className="product-details p-3">
      {/* Product Name */}
      <h3
        onClick={handleClick}
        className="truncate fw-bold mb-2"
        style={{ fontSize: "1.1rem", color: "#333" }}
      >
        {productItem.name}
      </h3>
  
      {/* Category and Brand */}
      <p className="category text-muted mb-1" style={{ fontSize: "0.9rem" }}>
        Category: {productItem.category}
      </p>
      <p className="brand text-muted mb-2" style={{ fontSize: "0.9rem" }}>
        Brand: {productItem.brand}
      </p>
  
      {/* Stock Information */}
      <p className="stock mb-2" style={{ fontSize: "0.9rem" }}>
        Stock:{" "}
        <span className={productItem.stock > 0 ? "text-success" : "text-danger"}>
          {productItem.stock > 0 ? productItem.stock : "Out of Stock"}
        </span>
      </p>
  
      {/* Rating */}
      <div className="rate mb-2">
        {[...Array(5)].map((_, index) => (
          <i
            key={index}
            className="fa fa-star text-warning"
            style={{ fontSize: "0.9rem" }}
          ></i>
        ))}
      </div>
  
      {/* Price and Add to Cart Button */}
      <div className="price d-flex justify-content-between align-items-center">
        <h4 className="mb-0" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          ₹{productItem.price}
        </h4>
        <button
          aria-label="Add to cart"
          type="button"
          className="add btn btn-primary btn-sm"
          onClick={() => handleAddToCart(productItem)}
          disabled={productItem.stock === 0}
          style={{ padding: "0.25rem 0.5rem", fontSize: "0.9rem" }}
        >
          <ion-icon name="add"></ion-icon>
        </button>
      </div>
    </div>
  </Col>
  );
};

export default ProductCard;
