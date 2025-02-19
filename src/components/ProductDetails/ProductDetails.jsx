import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./product-details.css";
import { addToCart } from "../../store/reducer/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { get_product } from "../../store/reducer/homeReducer";
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/css'

const ProductDetails = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { product, relatedProducts, moreProducts } = useSelector(state => state.home)
  const [image, setImage] = useState('')
  const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4
    },
    mdtablet: {
        breakpoint: { max: 991, min: 464 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 3
    },
    smmobile: {
        breakpoint: { max: 640, min: 0 },
        items: 2
    },
    xsmobile: {
        breakpoint: { max: 440, min: 0 },
        items: 1
    }
}

  const isLoggedIn = localStorage.getItem('user-info'); // Assuming you have an auth slice

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images);

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart({ product, num: quantity }));
    toast.success("Product has been added to cart!");
    
  };
  useEffect(() => {
    dispatch(get_product(slug))
  }, [slug])
  
  const handleBuyNow = (product, quantity) => {
    // dispatch(addToCart({ product, num: quantity }));
    toast.success("Proceeding to checkout...");
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if not logged in
    } else {
      // dispatch(addToCart({ product, num: quantity }));
      navigate("/cart"); // Redirect to order page if logged in
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
          title: product.name,
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
          
           

                      <div className='p-5 border'>
                                <img style={{ width:"90%" }} src={image ? image : product.images?.[0]} alt="" />
                            </div>
                            <div className='py-3'>
                                {
                                    product.images && <Carousel
                                        autoPlay={true}
                                        infinite={true}
                                        responsive={responsive}
                                        transitionDuration={500}
                                    >
                                        {
                                            product.images.map((img, i) => {

                                                return (
                                                    <div key={i} onClick={() => setImage(img)}>
                                                        <img  style={{ height:100}} src={img} alt="" />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Carousel>
                                }
                            </div>
            
          </Col>

          {/* Product Details */}
          <Col md={6}>
            <h2>{product?.name}</h2>
            <div className="rate">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fa fa-star"></i>
                ))}
              </div>
              <span>{product?.rating} ratings</span>
            </div>
            <div className="info">
              <p className="price">₹{product?.price}</p>
              <p>Category: {product?.category}</p>
            </div>
            <p>{product?.description}</p>

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
              onClick={() => handleAddToCart(product, quantity)}
            >
              Add to Cart
            </button>
            <button
              className="buy-now-btn"
              onClick={() => handleBuyNow(product, quantity)}
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
