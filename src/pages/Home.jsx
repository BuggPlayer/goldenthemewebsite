import { Fragment, useEffect } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { products, discoutProducts } from "../utils/products";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { get_banners, get_products } from "../store/reducer/homeReducer";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader, PropagateLoader } from "react-spinners";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  // Responsive configuration for the carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1 // Show 1 item on very large screens
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1 // Show 1 item on standard desktop screens
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1 // Show 1 item on tablets
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1 // Show 1 item on mobile devices
    }
  };

  // Fetch banners and products on component mount
  const { products, banners, latest_product, topRated_product, discount_product, loading, error } = useSelector(state => state.home);

  useEffect(() => {
    dispatch(get_banners());
    dispatch(get_products());
  }, [dispatch]);

  // Show loader while loading
  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader color="#3498db" size={50} />
        <p>Loading...</p>
      </div>
    );
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <span role="img" aria-label="error">
            ❌
          </span>{" "}
          {error}
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      {/* Carousel Section */}
      <div className="w-full md-lg:mt-6">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="w-full flex flex-wrap md-lg:gap-8">
            <div className="w-full">
              <div className="my-8">
                <Carousel
                  autoPlay={true}
                  infinite={true}
                  arrows={true}
                  showDots={true}
                  responsive={responsive}
                  className="h-[200px] md:h-[300px] lg:h-[400px]" // Responsive height
                >
                  {banners.length > 0 &&
                    banners.map((b, i) => (
                      <Link
                        className="block h-full w-full" // Ensure the link takes full height and width
                        key={i}
                        to={`/shop/${b.productId}`}
                      >
                        <img
                          src={b.banner}
                          alt=""
                          style={{width:"100%", padding:"4%", objectFit:"contain"  }}
                          // className="w-full h-full object-contain" // Ensure the image fits within the container
                        />
                      </Link>
                    ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Sections */}
      <Wrapper />
      <Section
        title="New Arrivals"
        bgColor="black"
        productItems={products}
      />
      <Section
        title="Big Discount"
        bgColor="black"
        productItems={products}
      />
           {/* <Wrapper /> */}
    </Fragment>
  );
};

export default Home;