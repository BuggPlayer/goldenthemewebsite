import { Col, Container, Row } from "react-bootstrap";
import "./slidercard.css";
import { Link } from "react-router-dom";

const SlideCard = ({title,desc,cover,index,link}) => {
  return (
    <Container className='box py-3 py-md-5'>
    <Row className='align-items-center'>
        {/* Text Section */}
        <Col md={6} className='text-center text-md-start order-2 order-md-1'>
            <h1 className='fw-bold text--text-color display-6 display-md-3 mb-3 mb-md-4'>
                {title}
            </h1>
            <p className='text-muted lead mb-4 mb-md-5' style={{ lineHeight: '1.6' }}>
                {desc}
            </p>
            <Link className='btn btn-primary mt-3' to={`/shop/${link}`}>
                Visit 
            </Link>
        </Col>

        {/* Image Section */}
        <Col md={6} className='text-center order-1 order-md-2 mb-4 mb-md-0'>
            <img 
                src={cover} 
                alt="Product Cover" 
                className='img-fluid rounded shadow-sm' 
                style={{ maxWidth: '100%', height: 'auto' }}
            />
        </Col>
    </Row>
</Container>
  )
}

export default SlideCard
