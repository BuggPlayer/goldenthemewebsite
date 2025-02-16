import { Col, Container, Row } from "react-bootstrap";
import "./slidercard.css";
import { Link } from "react-router-dom";

const SlideCard = ({title,desc,cover,index,link}) => {
  return (
    <Container className='box py-5'>
    <Row className='align-items-center'>
        {/* Text Section */}
        <Col md={6} className='text-start'>
            <h1 className='fw-bold text--text-color'>{title}</h1>
            <p className='text-muted'>{desc}</p>
            <Link className='btn btn-primary  mt-3' to={`/shop/${link}`}>
                Visit 
            </Link>
        </Col>

        {/* Image Section */}
        <Col md={6} className='text-center'>
            <img 
                src={cover} 
                alt="Product Cover" 
                className='img-fluid rounded shadow-sm' 
            />
        </Col>
    </Row>
</Container>

  )
}

export default SlideCard
