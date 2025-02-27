import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useSelector } from "react-redux";

const Shop = () => {
  const {products } = useSelector(state => state.home)
console.log("prooo" ,products)
  const [filterList, setFilterList] = useState(
    // products.filter((item) => item.category === "sofa")
    products.filter((item) => item)

  );
  console.log("filter" , filterList , products)
  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title="product" />
      <section className="filter-bar">
        <Container className="filter-bar-contianer">
          <Row className="justify-content-center">
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={8}>
              <SearchBar setFilterList={setFilterList} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems = { filterList ??  products } />
        </Container>
      </section>
    </Fragment>
  );
};

export default Shop;
