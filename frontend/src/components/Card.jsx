import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Card = ({  name, price, productImages, product }) => {
  const [currentImage, setCurrentImage] = useState(productImages[0]);
  const navigate = useNavigate();

  const handleMouseEnter = () => setCurrentImage(productImages[1]);
  const handleMouseLeave = () => setCurrentImage(productImages[0]);

  const handleItemClicked = () => {
    navigate("/productpage", { state: { product } });
  };

  return (
    <CardContainer onClick={handleItemClicked}>
      <ItemImage
        src={currentImage}
        alt={name}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <ItemName>{name}</ItemName>
      <ItemPrice>₹ {price}</ItemPrice>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  width: 260px;
  height: 400px;
  color: black;
  margin: 20px;
  box-shadow: 4px 4px 10px rgba(255, 242, 0, 0.384);
  border-radius: 6px;
  cursor: pointer;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 80%;
  background-size: cover;
  cursor: pointer;
  border-radius: 6px;
`;

const ItemName = styled.h5`
  color: #fe4a49;
  padding: var(--spacing-small);
  cursor: pointer;
  transition: 0.3s all ease-in-out;
  margin-top: 10px;
  &:hover {
    color: white;
  }
`;

const ItemPrice = styled.div`
  color: #fec620;
  margin: var(--spacing-small);
  padding: var(--spacing-small);
`;

export default Card;
