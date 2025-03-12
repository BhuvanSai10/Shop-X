import React, {  useState } from 'react'
import styled from 'styled-components'
import { TypeAnimation } from 'react-type-animation';
import {  useSelector } from 'react-redux';

const HeroSection = () => {
    const user = useSelector(state=>state?.user?.user)
    
    const scrollToShop = () => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      };
  return (
    <HeroSectionContainer>
        {
            user?._id?
            <HeroText>Welcome back <span style={{ color:'#fec620'}}>{user.name}</span></HeroText>:null
        }
        <HeroText >
            <WhiteText>SHOP AT</WhiteText>
            <ColoredText color='#fec620'>ShopX!</ColoredText>
        </HeroText>
        <HeroText color='#fe4a49'> Where Convenience Meets Variety</HeroText>
        <HeroTextBtn onClick={scrollToShop}>
            <ColoredText color='#fec620'>SHOP{' '}</ColoredText>
            <WhiteText>
                <TypeAnimation
                    sequence={[
                        'Clothing 👔',1500, 'Electronics 📱',1500,'Sneakers 👟',1500,'ALL 😎',1500
                    ]}
                    wrapper="span"
                    speed={30}
                    repeat={Infinity}
                />
            </WhiteText>
        </HeroTextBtn>
    </HeroSectionContainer>
  )
}

const HeroSectionContainer = styled.div`
    background-color: black;
    color: white;
    width: 100vw;
    height: 100vh;
    text-transform: uppercase;
    display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   font-size: 28px;
   font-weight: 700;
   position: relative;
   top: 60px;
   @media (max-width: 950px) {
    font-size: 20px;
  }
`
const HeroText = styled.div`
    padding: var(--spacing-medium);
    color: ${(props) => props.color};
`
const HeroTextBtn = styled.button`
    background-color: black;
    outline: none;
    border: 2px solid #fec620;
    box-shadow: 0 4px 14px rgb(255, 242, 0);
    border-radius: 16px;
    font-size: 30px;
    font-weight: 800;
    cursor: pointer;
    padding: var(--spacing-medium);
    margin-top: var(--spacing-medium);
    transition: all 0.3s ease-in-out;
    &:hover{
        box-shadow: 0 4px 14px #fe4a49;
        border: 1px solid #fe4a49;
    }
    @media (max-width: 768px) {
        font-size: 22px;
  }
`
const WhiteText = styled.span`
    color: white; 
    margin-right: 10px;
`;

const ColoredText = styled.span`
    color: ${(props) => props.color };
`;



export default HeroSection