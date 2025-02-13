import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {   
  addToCart,
  decreaseQty,
  deleteProduct, } from "../store/reducer/cartSlice";

// Componente Cart che visualizza gli articoli nel carrello
const Cart = () => {
  // Recupera la lista del carrello dallo store Redux
  // const cartList  = useSelector((state) => state.cart);
  const cartList = useSelector((state) => state.cart.cartList);
  console.log("carrrrr" , cartList)
  const dispatch = useDispatch();

  // Calcola il prezzo totale degli articoli nel carrello
  const totalPrice = cartList?.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  // Effettua lo scroll in alto quando il componente è montato
  useEffect(() => {
    window.scrollTo(0, 0);
    // Codice commentato per ripristinare il carrello dallo storage, se necessario
    // if(CartItem.length ===0) {
    //   const storedCart = localStorage.getItem("cartItem");
    //   setCartItem(JSON.parse(storedCart));
    // }
  }, []);

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
                  <Row className="align-items-center">
                    <Col xs={4} className="image-holder">
                      <img src={item.images[0]} alt={item.name} className="cart-img" />
                    </Col>
                    <Col xs={8} className="cart-info">
                      <h3 className="cart-product-name">{item.name.length > 50 ? `${item.name.substring(0, 50)}...` : item.name}</h3>
                      <p className="cart-brand">Brand: {item.brand}</p>
                      <p className="cart-category">Category: {item.category}</p>
                      <p className="cart-price">
                        ${item.price} x {item.qty} = <span className="total-price">${productQty}</span>
                      </p>
                      <div className="cart-actions">
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
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })
          )}
        </Col>
        <Col md={4}>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <div className="summary-total">
              <h4>Total:</h4>
              <h3>${totalPrice}</h3>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  );
};

export default Cart;
