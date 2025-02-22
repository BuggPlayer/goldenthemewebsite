import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./product-details.css";
import { addToCart } from "../../store/reducer/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { get_product } from "../../store/reducer/homeReducer";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/css'

const ProductDetails = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { product } = useSelector(state => state.home)
  const [image, setImage] = useState('')
  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = localStorage.getItem('user-info');

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 6,
      slidesToSlide: 2
    },
    desktop: {
      breakpoint: { max: 1536, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 768, min: 480 },
      items: 3
    },
    smallMobile: {
      breakpoint: { max: 480, min: 0 },
      items: 2
    }
  };

  useEffect(() => {
    dispatch(get_product(slug));
    window.scrollTo(0, 0);
  }, [slug, dispatch]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setImage(product.images[0]);
    }
  }, [product]);

  const handleQuantityChange = (value) => {
    const newQty = Math.max(1, Math.min(value, product?.stock || 1));
    setQuantity(newQty);
  };

  const handleAddToCart = () => {
    if (product?.stock > 0) {
      dispatch(addToCart({ product, num: quantity }));
      toast.success("Product added to cart!");
    }
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      toast.info("Please login to continue");
      navigate("/login");
      return;
    }
    handleAddToCart();
    navigate("/cart");
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error("Failed to share");
    }
  };

  if (!product) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <section className="product-details">
      <Container>
        <Row className="g-4">
          {/* Product Images */}
          <Col lg={6}>
            <div className="product-images">
              <div className="main-image-wrapper">
                <div className="main-image-container">
                  <img 
                    src={image || product.images?.[0]} 
                    alt={product.name}
                    className="main-image"
                    loading="lazy"
                  />
                </div>
                {product.discount > 0 && (
                  <div className="discount-badge">
                    {product.discount}% OFF
                  </div>
                )}
              </div>
              
              <div className="thumbnail-carousel">
                {product.images && product.images.length > 0 ? (
                  <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={false}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    customTransition="transform 300ms ease-in-out"
                    transitionDuration={300}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["mobile", "smallMobile"]}
                    dotListClass="custom-dot-list"
                    itemClass="carousel-item"
                  >
                    {product.images.map((img, index) => (
                      <div 
                        key={index}
                        className={`thumbnail-item ${img === image ? 'active' : ''}`}
                        onClick={() => setImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} view ${index + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <div className="no-images">No additional images available</div>
                )}
              </div>
            </div>
          </Col>

          {/* Product Info */}
          <Col lg={6}>
            <div className="product-info">
              <div className="product-header">
                <h1 className="product-title">{product.name}</h1>
                <div className="product-meta">
                  <div className="rating">
                    <div className="stars">
                      {[...Array(5)].map((_, index) => (
                        <i 
                          key={index} 
                          className={`fas fa-star ${index < Math.floor(product.rating) ? 'filled' : ''}`}
                        ></i>
                      ))}
                    </div>
                    <span className="rating-count">
                      {product.rating} ({product.numReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="product-details-info">
                <div className="product-price">
                  <h2>₹{product.price.toLocaleString()}</h2>
                  {product.discount > 0 && (
                    <div className="price-details">
                      <span className="original-price">
                        ₹{(product.price / (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="discount-tag">{product.discount}% OFF</span>
                    </div>
                  )}
                </div>

                <div className="product-meta-details">
                  <div className="meta-item">
                    <span className="meta-label">Category:</span>
                    <span className="meta-value">{product.category}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Brand:</span>
                    <span className="meta-value">{product.brand}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">Availability:</span>
                    <span className={`meta-value ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <div className="product-description">
                  <h3>Description</h3>
                  <p>{product.description}</p>
                </div>

                {product.stock > 0 && (
                  <div className="product-actions">
                    <div className="quantity-selector">
                      <button 
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span>{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= product.stock}
                        aria-label="Increase quantity"
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                )}

                <div className="action-buttons">
                  <button 
                    className="add-to-cart"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    Add to Cart
                  </button>
                  <button 
                    className="buy-now"
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                  >
                    <i className="fas fa-bolt"></i>
                    Buy Now
                  </button>
                </div>

                <div className="additional-actions">
                  <button 
                    className="share-button" 
                    onClick={handleShare}
                    aria-label="Share product"
                  >
                    <i className="fas fa-share-alt"></i>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
