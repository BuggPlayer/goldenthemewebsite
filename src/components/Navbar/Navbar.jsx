import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NavBar = () => {
  const cartSlice = useSelector((state) => state.cart.cartList);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("user-info");
    setIsAuthenticated(!!token);
  }, []);

  // Handle logout
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const storedUserInfo = localStorage.getItem("user-info");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user-info");
    setIsAuthenticated(false);
    navigate("/login");
  };

  // Fixed header on scroll
  useEffect(() => {
    const scrollHandler = () => {
      setIsFixed(window.scrollY >= 100);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <Navbar fixed="top" expand="md" className={isFixed ? "navbar fixed" : "navbar"}>
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/">
          <ion-icon name="bag"></ion-icon>
          <h1 className="logo">NOZE</h1>
        </Navbar.Brand>

        <div className="d-flex">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpand(!expand)}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Item>
              <Link className="navbar-link" to="/" onClick={() => setExpand(false)}>
                <span className="nav-link-label">Home</span>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="navbar-link" to="/shop" onClick={() => setExpand(false)}>
                <span className="nav-link-label">Shop</span>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="navbar-link" to="/cart" onClick={() => setExpand(false)}>
                <span className="nav-link-label">Cart</span>
              </Link>
            </Nav.Item>

          

            {/* Cart Icon */}
            <Nav.Item className="expanded-cart">
              <Link to="/cart" className="cart" data-num={cartSlice?.length}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#FFD700"
                  className="nav-icon"
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </Link>
            </Nav.Item>

            <NavDropdown
      title={
        <span className="profile-icon">
          {userInfo ? (
            <img
              src={userInfo.image}
              alt="User Avatar"
              className="nav-icon rounded-full w-8 h-8"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#FFD700"
              className="nav-icon"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {userInfo && <span className="ml-2" style={{ color:"white" }}>{userInfo.name || userInfo.email}</span>}
        </span>
      }
      id="basic-nav-dropdown"
      align="end"
    >
      <NavDropdown.Item as={Link} to="/cart">My Cart</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/orders">My Orders</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
      <NavDropdown.Divider />
      {isAuthenticated ? (
        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
      ) : (
        <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
      )}
    </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
