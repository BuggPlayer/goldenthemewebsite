import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { addToCart } from "../../app/features/cart/cartSlice";
import "./product-details.css";
import { addToCart } from "../../store/reducer/cartSlice";

const ProductDetails = ({ selectedProduct }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };
  const handelAdd = (selectedProduct, quantity) => {
    // dispatch(addToCarr({ product: selectedProduct, num: quantity }));
    dispatch(addToCart({ product: selectedProduct, num: quantity }));
    toast.success("Product has been added to cart!");
  };

  return (
    <section className="product-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <img loading="lazy" src={selectedProduct?.images[0]} alt="" />
          </Col>
          <Col md={6}>
            <h2>{selectedProduct?.name}</h2>
            <div className="rate">
              <div className="stars">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <span>{selectedProduct?.rating} ratings</span>
            </div>
            <div className="info">
              <span className="price">₹{selectedProduct?.price}</span>
              <span>category:{selectedProduct?.category}</span>
            </div>
            <p>{selectedProduct?.description}</p>
            {/* <input
              className="qty-input"
              type="number"
              placeholder="Qty"
              value={quantity}
              onChange={handleQuantityChange}
            /> */}

<input
  className="qty-input"
  style={{background:"white" , color:"black"}}
  type="number"
  placeholder="Qty"
  value={quantity}
  onChange={(e) => {
    console.log("ee" , e.target.value)
    const value = Math.max(1, parseInt(e.target.value) || 1);
    handleQuantityChange(value);
  }}
  min="1"
/>

            <button
              aria-label="Add"
              type="submit"
              className="add"
              onClick={() => handelAdd(selectedProduct, quantity)}
            >
              Add To Cart
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ProductDetails;
