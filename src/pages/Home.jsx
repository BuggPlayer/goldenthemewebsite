import { Fragment, useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { get_products } from "../store/reducer/homeReducer";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch()
  // const newArrivalData = products.filter(
  //   (item) => item.category === "mobile" || item.category === "wireless"
  // );
  // const bestSales = products.filter((item) => item.category === "sofa");
  // useWindowScrollToTop();

 
    const {products, latest_product, topRated_product, discount_product } = useSelector(state => state.home)
    useEffect(() => {

        dispatch(get_products())
    }, [])

console.log("products" , products)
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Big Discount"
        bgColor="black"
        productItems={products}
      />
      {/* <Section
        title="New Arrivals"
        bgColor="black"
        productItems={newArrivalData}
      />
      <Section title="Best Sales" bgColor="black" productItems={bestSales} /> */}
    </Fragment>
  );
};

export default Home;
