import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "./product-details.css";
import { addToCart } from "../../store/reducer/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('user-info'); // Assuming you have an auth slice

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(selectedProduct?.images[0]);

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart({ product, num: quantity }));
    toast.success("Product has been added to cart!");
    
  };

  const handleBuyNow = (product, quantity) => {
    // dispatch(addToCart({ product, num: quantity }));
    toast.success("Proceeding to checkout...");
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if not logged in
    } else {
      navigate("/order"); // Redirect to order page if logged in
    }
    // Navigate to checkout page (adjust as needed)
    // navigate("/checkout");
  };

  const handleAddToWishlist = () => {
    toast.info("Product added to wishlist!");
  };

  const handleShare = () => {
    navigator.share
      ? navigator.share({
          title: selectedProduct.name,
          text: "Check out this product!",
          url: window.location.href,
        })
      : toast.info("Sharing is not supported in this browser.");
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          {/* Product Images */}
          <Col md={6}>
            <div className="product-image-slider">
              <img
                src={selectedImage}
                alt={selectedProduct?.name}
                className="main-image"
              />
              <div className="thumbnail-container">
                {selectedProduct?.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${
                      img === selectedImage ? "selected" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>
          </Col>

          {/* Product Details */}
          <Col md={6}>
            <h2>{selectedProduct?.name}</h2>
            <div className="rate">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fa fa-star"></i>
                ))}
              </div>
              <span>{selectedProduct?.rating} ratings</span>
            </div>
            <div className="info">
              <span className="price">₹{selectedProduct?.price}</span>
              <span>Category: {selectedProduct?.category}</span>
            </div>
            <p>{selectedProduct?.description}</p>

            {/* Quantity Selector */}
            <div className="quantity-control">
              <button
                className="qty-button"
                onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <p className="qty-value">{quantity}</p>
              <button
                className="qty-button"
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(selectedProduct, quantity)}
            >
              Add to Cart
            </button>
            <button
              className="buy-now-btn"
              onClick={() => handleBuyNow(selectedProduct, quantity)}
            >
              Buy Now
            </button>
            <button className="wishlist-btn" onClick={handleAddToWishlist}>
              <i className="fa fa-heart"></i> Add to Wishlist
            </button>
            <button className="share-btn" onClick={handleShare}>
              <i className="fa fa-share-alt"></i> Share
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
