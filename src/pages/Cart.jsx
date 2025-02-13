import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../store/reducer/cartSlice";
import "./cart.css"
const Cart = () => {
  const cartList = useSelector((state) => state.cart.cartList);
  const isLoggedIn = localStorage.getItem('user-info'); // Assuming you have an auth slice
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartList?.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle Buy Now button click
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login page if not logged in
    } else {
      navigate("/order"); // Redirect to order page if logged in
    }
  };

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList?.length === 0 ? (
              <h1 className="no-items product">Your cart is empty</h1>
            ) : (
              cartList?.map((item) => {
                const productQty = item.price * item.qty;
                return (
                  <div className="cart-list" key={item._id}>
                  <Row className="align-items-center cart-item">
                    <Col xs={3} className="image-holder">
                      <img src={item.images[0]} alt={item.name} className="cart-img" />
                    </Col>
                    <Col xs={6} className="cart-info">
                      <h4 className="cart-product-name">
                        {item.name.length > 35 ? `${item.name.substring(0, 35)}...` : item.name}
                      </h4>
                      <p className="cart-details">Brand: {item.brand} | {item.category}</p>
                      <p className="cart-price">
                        ${item.price} x {item.qty} ={" "}
                        <span className="total-price">${productQty}</span>
                      </p>
                    </Col>
                    <Col xs={3} className="cart-actions">
                      <button
                        className="cart-btn inc"
                        onClick={() => dispatch(addToCart({ product: item, num: 1 }))}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      <button
                        className="cart-btn dec"
                        onClick={() => dispatch(decreaseQty(item))}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <button
                        className="cart-btn delete"
                        onClick={() => dispatch(deleteProduct(item))}
                      >
                        <ion-icon name="close"></ion-icon>
                      </button>
                    </Col>
                  </Row>
                </div>
                
                );
              })
            )}
          </Col>
          <Col md={4}>
          <div className="cart-summary">
  <h2 className="summary-title">Cart Summary</h2>
  <div className="summary-total">
    <h4 className="summary-label">Total:</h4>
    <h3 className="summary-price">${totalPrice}</h3>
  </div>
  <button className="buy-now-btn" onClick={handleBuyNow}>
    Buy Now
  </button>
</div>

          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;