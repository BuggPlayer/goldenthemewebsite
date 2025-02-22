import { Col, Container, Row } from "react-bootstrap";
import productBg from "../../Images/table.jpg";
import "./banner.css";

const Banner = ({ title }) => {
  return (
    <div className="banner">
      <div className="banner-image-container">
        <img 
          src={productBg} 
          alt="Product background" 
          className="banner-image"
          loading="lazy"
        />
      </div>
      <div className="banner-overlay">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <h2 className="banner-title">{title}</h2>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Banner;