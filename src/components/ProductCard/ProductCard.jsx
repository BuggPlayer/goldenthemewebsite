import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/reducer/cartSlice";
// import { addToCart } from "../../st";
// addToCart
const ProductCard = ({ productItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/shop/${productItem.id}`);
  };

  const handleAddToCart = (productItem) => {

        dispatch(addToCart({ product: productItem, num: 1 }));

    // dispatch(add_to_card({ product: productItem, num: 1 }));
    toast.success("Product has been added to cart!");
  };

  return (
    <Col md={3} sm={6} xs={12} className="product mtop">
      {productItem.discount > 0 && (
        <span className="discount">{productItem.discount}% Off</span>
      )}
      <div className="product-image" onClick={handleClick}>
        <img loading="lazy" src={productItem.images[0]} alt={productItem.name} />
      </div>
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={handleClick} className="truncate">{productItem.name}</h3>
        <p className="category">Category: {productItem.category}</p>
        <p className="brand">Brand: {productItem.brand}</p>
        <p className="stock">Stock: {productItem.stock > 0 ? productItem.stock : "Out of Stock"}</p>
        <div className="rate">
          {[...Array(5)].map((_, index) => (
            <i key={index} className="fa fa-star"></i>
          ))}
        </div>
        <div className="price">
          <h4>₹{productItem.price}</h4>
         
          <button
            aria-label="Add to cart"
            type="button"
            className="add"
            onClick={()=>handleAddToCart(productItem)}
            disabled={productItem.stock === 0}
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
