import React, { useState, useEffect, useRef } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import { fetchItems } from "../api/fetchItems";
import { useNavigate } from 'react-router-dom';

const Shop = ({ filterType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const cardsRef = useRef(null); // Ref for the Cards container
  const [isAtStart, setIsAtStart] = useState(true); // Track if we're at the start
  const [isAtEnd, setIsAtEnd] = useState(false); // Track if we're at the end
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchItems();
        setItems(data.data);
      } catch (err) {
        setError("Failed to fetch Items.");
      }
    };
    fetchData();
  }, []);

  if (error) return <div>{error}</div>;

  const filteredItems = filterType
    ? items.filter((item) => item.type === filterType)
    : items;

  // Function to scroll the Cards container to the left
  const scrollLeft = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  // Function to scroll the Cards container to the right
  const scrollRight = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  // Function to check if we're at the start or end of the container
  const checkScrollPosition = () => {
    if (cardsRef.current) {
      const scrollLeftPosition = cardsRef.current.scrollLeft;
      const scrollWidth = cardsRef.current.scrollWidth;
      const clientWidth = cardsRef.current.clientWidth;

      setIsAtStart(scrollLeftPosition === 0);
      setIsAtEnd(scrollLeftPosition + clientWidth >= scrollWidth - 1);
    }
  };

  const shouldShowNavButtons = filteredItems.length > 5; // Show buttons only if there are more than 5 items

  // Call checkScrollPosition on every scroll event
  useEffect(() => {
    const handleScroll = () => checkScrollPosition();
    const cardsElement = cardsRef.current;
    if (cardsElement) {
      cardsElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (cardsElement) {
        cardsElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    checkScrollPosition(); // Ensure buttons are correctly set after the items are loaded or filtered
  }, [filteredItems]);

  // Navigate to ProductPage when a card is clicked
  const handleItemClicked = (product) => {
    navigate("/productpage", { state: { product } });
  };

  return (
    <ShopContainer>
      <Container>
        <HeroText>{filterType}</HeroText>
      </Container>

      <CardsContainer>
        {!isAtStart && shouldShowNavButtons && (
          <NavButton onClick={scrollLeft}>&lt;</NavButton>
        )}
        <Cards ref={cardsRef}>
          {filteredItems.map((item) => (
            <CardWrapper key={item.id} onClick={() => handleItemClicked(item)}>
              <Card
                name={item.name}
                price={item.price}
                productImages={item.productImages}
                product={item}
              />
            </CardWrapper>
          ))}
        </Cards>
        {!isAtEnd && shouldShowNavButtons && (
          <NavButton onClick={scrollRight}>&gt;</NavButton>
        )}
      </CardsContainer>
    </ShopContainer>
  );
};

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 0;
  width: 100vw;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  @media (max-width: 950px) {
    justify-content: center;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  background-color: black;
  color: white;
  position: relative;
`;

const Cards = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 80%;
  overflow-y: hidden;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 1px;
  }
  &::-webkit-scrollbar-thumb {
    background-color:white;
    border-radius: 10px;
  }
`;

const CardWrapper = styled.div`
  width: 250px;
  height: 500px;
  margin-right: 40px;
  flex-shrink: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 950px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 600px) {
    width: calc(100% - 20px);
  }
`;

const HeroText = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #fec620;
  border: 2px solid #fec620;
  border-radius: 8px;
  box-shadow: 0 4px 18px #fec620;
  text-align: center;
  text-transform: uppercase;
  width: 280px;
  padding: 12px;
  margin-left: var(--spacing-large);
  margin-bottom: 10px;
  @media (max-width: 950px) {
    margin-left: 0;
  }
`;

const NavButton = styled.button`
  background-color: #fec620;
  color: black;
  border: none;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;

  &:hover {
    background-color: #fec620cf;
  }

  &:first-child {
    left: 20px;
  }

  &:last-child {
    right: 20px;
  }
`;

export default Shop;
