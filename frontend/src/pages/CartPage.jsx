import React, {  useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import summaryApi from "../common";
import { updateCart } from "../store/userSlice"; 
import axios from "axios";

const CartPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const email = user?.email;
  const [cart,setCart] =useState({});
  useEffect(()=>{
    const fetchCartData = async()=>{
      try{
        const response = await axios.get(`http://localhost:5000/api/cart/${email}`);
        setCart(response.data.cart);
      }catch(err){
        console.error("Error fetching cart data:", err);
      }
    }
    fetchCartData()
  },[])


  const handleUpdateQuantity = async (productData) => {
    try {
      const response = await fetch(summaryApi.addtocart.url, {
        method: summaryApi.addtocart.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      const dataApi = await response.json();

      if (dataApi.success) {
        // Update the cart in Redux store
        const updatedCart =cart.map((item) =>
          item.productName === productData.productName
            ? { ...item, productQuantity: productData.productQuantity }
            : item
        );
        dispatch(updateCart(updatedCart));
        toast.success(dataApi.message);
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleMinus = (item) => {
    if (item.productQuantity > 1) {
      const updatedProductData = {
        email: user?.email,
        productName: item.productName,
        productPrice: item.productPrice,
        productSize: item.productSize,
        productImage: item.productImage,
        productQuantity: item.productQuantity - 1,
      };
      handleUpdateQuantity(updatedProductData);
    }
  };

  const handlePlus = (item) => {
    if (item.productQuantity < 10) {
      const updatedProductData = {
        email: user?.email,
        productName: item.productName,
        productPrice: item.productPrice,
        productSize: item.productSize,
        productImage: item.productImage,
        productQuantity: item.productQuantity + 1,
      };
      handleUpdateQuantity(updatedProductData);
    }
  };

  const handleRemoveFromCart = async (item) => {
    try {
      const response = await fetch(summaryApi.removefromcart.url, {
        method: summaryApi.removefromcart.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.email,
          productName: item.productName,
        }),
      });

      const dataApi = await response.json();

      if (dataApi.success) {
        // Filter out the removed item from the cart
        const updatedCart = cart.filter(
          (cartItem) => cartItem.productName !== item.productName
        );
        dispatch(updateCart(updatedCart)); // Dispatch the updated cart to Redux
        toast.success(dataApi.message);
      } else {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <CartContainer>
      <HeadText>
        Your Shopping Cart{" "}
        <FontAwesomeIcon style={{ color: "#fec620" }} icon={faCartShopping} />
      </HeadText>
      <Wrapper>
        {cart?.length > 0 ? (
          <CartItemsContainer>
            {cart.map((item, index) => (
              <CartItem key={index}>
                <WrapperLeft>
                  <CartItemImage
                    src={item.productImage}
                    alt={item.productName}
                  />
                  <CartItemInfo>
                    <ItemName>{item.productName}</ItemName>
                    <Box>{item.productSize}</Box>
                  </CartItemInfo>
                </WrapperLeft>

                <WrapperRight>
                  <FlexColWrap>
                    <ItemQuantity>
                      <Box onClick={() => handleMinus(item)}>-</Box>
                      <QuantityBox>{item.productQuantity}</QuantityBox>
                      <Box onClick={() => handlePlus(item)}>+</Box>
                    </ItemQuantity>
                    <ItemPrice>₹ {item.productPrice}</ItemPrice>
                  </FlexColWrap>

                  <RemoveFromCart onClick={()=>{handleRemoveFromCart(item)}}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </RemoveFromCart>
                </WrapperRight>
              </CartItem>
            ))}
          </CartItemsContainer>
        ) : (
          <>
            <HeroTextMsg>
              {user
                ? "Your Cart is Empty ..."
                : "Please log in to see your cart."}
            </HeroTextMsg>
            {!user && (
              <Link to="/loginpage">
                <HeroTextBtn>LOG IN</HeroTextBtn>
              </Link>
            )}
            {user && (
              <Link to="/bestsellers">
                <HeroTextBtn>SHOP NOW</HeroTextBtn>
              </Link>
            )}
          </>
        )}
      </Wrapper>
    </CartContainer>
  );
};

const CartContainer = styled.div`
  width: 100vw;
  padding: var(--spacing-large);
  position: relative;
  top: 60px;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
`;

const WrapperLeft = styled.div`
  height: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const HeadText = styled.div`
  height: 60px;
  font-size: 32px;
  font-weight: 700;
  padding: 8px;
`;

const HeroTextMsg = styled.div`
  font-size: 26px;
  font-weight: 500;
  padding: 8px;
  color: #fec620;
`;

const HeroTextBtn = styled.button`
  padding: 12px;
  background-color: black;
  color: white;
  border: 2px solid #fec620;
  box-shadow: 0 4px 14px rgb(255, 242, 0);
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  margin-left: 40px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 4px 14px #fe4a49;
    border: 2px solid #fe4a49;
  }
`;

const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90vw;
  padding: 12px;
`;

const CartItem = styled.div`
  margin: var(--spacing-medium);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CartItemImage = styled.img`
  width: 100px;
  height: 100px;
  background-size: cover;
`;

const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  padding: 12px;
`;

const ItemName = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: #fe4a49;
  @media (max-width:600px) {
    font-size: 12px;
  }
`;

const ItemQuantity = styled.div`
  display: flex;
`;

const Box = styled.div`
  width: 25px;
  height: 25px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #fec620;
    color: black;
  }
  @media (max-width:600px) {
    font-size: 12px;
  }
`;

const QuantityBox = styled.div`
  width: 25px;
  height: 25px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  @media (max-width:600px) {
    font-size: 12px;
  }
`;

const ItemPrice = styled.div`
  font-size: 16px;
  @media (max-width:600px) {
    font-size: 12px;
  }
`;

const RemoveFromCart = styled.div`
  height:100%;
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: black;
  color: white;
  cursor: pointer;
  &:hover {
    color: #fec620;
  }
`;

const WrapperRight = styled.div`
  height: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const FlexColWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-right: 20px;
`

export default CartPage;
