import { Fragment, useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { get_banners, get_products } from "../store/reducer/homeReducer";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader, PropagateLoader } from "react-spinners";

const Home = () => {
  const dispatch = useDispatch()
  // const newArrivalData = products.filter(
  //   (item) => item.category === "mobile" || item.category === "wireless"
  // );
  // const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();

 
    const {products, banners,latest_product, topRated_product, discount_product ,loading, error} = useSelector(state => state.home)
    console.log(
"banner",banners
    )
    useEffect(() => {
      dispatch(get_banners())
        dispatch(get_products())
    }, [])
   

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader color="#3498db" size={50} />
        <p>Loading...</p>
      </div>
    );
    // return  <ClipLoader color="#3498db" size={50} />
    // return <PropagateLoader color='#fff' cssOverride={{}} />; // Show loader while loading
  }
  if (error) {
    return(<div className="error-container">
      <div className="error-message">
        <span role="img" aria-label="error">
          ❌
        </span>{" "}
        {error}
        {/* <button onClick={onRetry} className="retry-button">
          Retry
        </button> */}
      </div>
    </div>)// Show error message if there's an error
  }


  return (
    <Fragment>
      <SliderHome  banners ={banners}/>
      <Wrapper />
      {/* <Section
        title="New Arrivals"
        bgColor="black"
        productItems={latest_product}
      /> */}
      <Section
        title="Big Discount"
        bgColor="black"
        productItems={products}
      />
    
      {/* <Section title="Best Sales" bgColor="black" productItems={topRated_product} /> */}
    </Fragment>
  );
};

export default Home;
