import React from 'react'
import styled from 'styled-components'

const Help = () => {
  return (
    <HelpContainer>
        <Text>Help & support 🤝</Text>
        <BoxContainer>
            <Box>
                <BoxItemHead>Connect with Us</BoxItemHead>
                <BoxItem>Facebook</BoxItem>
                <BoxItem>X</BoxItem>
                <BoxItem>Instagram</BoxItem>
            </Box>
            <Box>
                <BoxItemHead>Polices</BoxItemHead>
                <BoxItem>Return Request</BoxItem>
                <BoxItem>Exchange Request</BoxItem>
                <BoxItem>Terms and Conditions</BoxItem>
                <BoxItem>Privacy Policy</BoxItem>
                <BoxItem>Return & Exchange Policy</BoxItem>
                <BoxItem>Shipping and Delivery Policy</BoxItem>

            </Box>
            <Box>
                <BoxItemHead>Get To Know Us</BoxItemHead>
                <BoxItem>About Us</BoxItem>
                <BoxItem>Contact us</BoxItem>
            </Box>
        </BoxContainer>
        <FooterText>© 2025 ShopX, All rights reserved. Designed by <span style={{textDecoration:'underline'}}>Bhuvan</span>.</FooterText>
    </HelpContainer>
  )
}
const HelpContainer = styled.div`
    color: white;
    background-color: #000000;
    position: relative;
    top: 60px;
    width: 100vw;
    
`

const Text = styled.div`
    color: #71FE1F;
    text-transform: uppercase;
    font-size: 34px;
    font-weight: 800;
    text-align: center;
    @media (max-width: 950px) {
        font-size: 30px;
  }
`
const BoxContainer  = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width:950px) {
        flex-wrap: wrap;
    }
`
const Box = styled.div`
    display: flex;
    flex-direction: column;
    margin: 50px;
    padding: var(--spacing-large);
    @media (max-width:950px) {
        margin: 25px;
    }
`
const BoxItemHead = styled.span`
    color: #fe4a49;
    font-size: 20px;
    padding: var(--spacing-small);
    margin-bottom: 20px;
    @media (max-width: 950px) {
        font-size: 14px;
  }
`
const BoxItem = styled.span`
    color: #0ADEFF;
    font-size: 16px;
    cursor: pointer;
    padding: var(--spacing-small);
    &:hover{
        color:#21A0A0;
        text-decoration:underline;
    }
    @media (max-width: 950px) {
        font-size: 14px;
  }
`

const FooterText = styled.div`
   color: #0ADEFF;
   padding: var(--spacing-large);
   margin-left: 100px;
   @media (max-width: 950px) {
        margin-left: 20px;
    }
`

export default Help