import React from 'react'
import styled from 'styled-components'
import Shop from '../components/Shop'

const BestSellers = () => {
  return (
    <>
        <BestSellersContainer>
            <HeroText >Our Bestsellers</HeroText>
            <Shop filterType={"tshirts"}/>
            <Shop filterType={"pants"}/>
            <Shop filterType={"shoes"}/>
            <Shop filterType={"electronics"}/>
        </BestSellersContainer>
    </>
  )
}

const BestSellersContainer  =  styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 60px;
`
const HeroText = styled.div`
  font-size: 20px;
  font-weight: 800;
  border: 1px solid red;
  color: #fe4a49;
  border: 1px solid #fe4a49;
  border-radius: 8px;
  box-shadow: 0 4px 18px #fe4a49;
  text-align: center;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  width: 280px;
    margin-top: 10px;
`

export default BestSellers