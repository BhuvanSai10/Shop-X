import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faX,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";

const Navbar = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoginPage, setIsLoginPage, hideBestsellers, setHideBestsellers } =
    useContext(Context);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.logout_user.url, {
      method: summaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      setIsLoginPage(true);
      setHideBestsellers(false);
    } else if (data.error) {
      toast.error(data.message);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToEnd = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleAuthNavigation = () => {
    if (isLoginPage) {
      setHideBestsellers(!hideBestsellers); 
      navigate("/loginpage"); 
    } else {
      setHideBestsellers(!hideBestsellers);
      navigate("/signuppage"); 
    }
    setIsLoginPage(!isLoginPage); 
  };

  return (
    <NavbarContainer>
      <BrandLogo
        onClick={() => {
          setIsLoginPage(true);
          navigate("/");
        }}
      >
        ShopX
      </BrandLogo>

      <MenuIcon onClick={toggleMenu}>
        {menuOpen ? (
          <FontAwesomeIcon icon={faX} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </MenuIcon>

      <NavLinks open={menuOpen}>
        <NavSearchContainer>
          <NavSearch placeholder="Search here..." />
          <SearchBtn>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </SearchBtn>
        </NavSearchContainer>

        {!hideBestsellers && (
          <Link
            to="/bestsellers"
            style={{ textDecoration: "none", color: "white" }}
          >
            <NavLink>Best Sellers</NavLink>
          </Link>
        )}

        <NavLink onClick={scrollToEnd}>Help</NavLink>

        {user?._id && (
          <Link
            to="/cartpage"
            style={{ textDecoration: "none", color: "white" }}
          >
            <NavLink>
              <FontAwesomeIcon icon={faCartShopping} />
            </NavLink>
          </Link>
        )}
        {user?._id ? (
          <NavLink onClick={handleLogout}>Logout</NavLink>
        ) : (
          <NavLink onClick={handleAuthNavigation}>
            {isLoginPage ? "Login" : "Sign Up"}
          </NavLink>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  width: 100vw;
  height: 60px;
  position: fixed;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  color: #ffffff;
  z-index: 50;
`;

const BrandLogo = styled.div`
  font-size: var(--font-size-large);
  font-weight: 900;
  color: #fec620;
  &:hover {
    cursor: pointer;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 950px) {
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #000000;
    width: 100%;
    padding: 10px 0;
    display: ${(props) => (props.open ? "flex" : "none")};
  }
`;

const NavSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: var(--spacing-medium);

  @media (max-width: 950px) {
    width: 90%;
  }
`;

const NavSearch = styled.input`
  height: 30px;
  width: 400px;
  padding: var(--spacing-small);
`;

const SearchBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--spacing-small);
  width: 40px;
  height: 30px;
  padding: var(--spacing-small);
  background-color: black;

  &:hover {
    cursor: pointer;
    color: #fec620;
    border: 1px solid #fec620;
    transition: all 0.3s ease-in-out;
  }
`;

const NavLink = styled.div`
  font-size: var(--font-size-medium);
  margin: var(--spacing-medium);

  &:hover {
    cursor: pointer;
    border-bottom: 1px solid #fec620;
    color: #fec620;
    transition: all 0.3s ease-in-out;
  }
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;

  @media (max-width: 950px) {
    display: block;
  }
`;

export default Navbar;
