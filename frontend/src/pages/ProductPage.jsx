import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import summaryApi from "../common";
import { useDispatch } from "react-redux";
import { updateCart } from "../store/userSlice";

const ProductPage = () => {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();

  const {
    state: { product },
  } = useLocation();
  const [img, setImg] = useState(product.productImages[0]);
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0]);
  const productData = {
    email:user?.email,
    productName: product.name,
    productPrice: product.price,
    productImage: product.productImages[0],
    productQuantity: 1,
    productSize: selectedSize,
  };
  
  const handleMouseEnterProduct = (e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  };

  const handleMouseMoveProduct = (e) => {
    if (zoomImage) {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({ x, y });
    }
  };

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };
  const handleAddToCart = async () => {
    if (user?._id) {
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
          dispatch(updateCart(dataApi.updatedCart));
          toast.success(dataApi.message);
        } else {
          toast.error(dataApi.message);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      toast.error("Please login to Add item to cart");
    }
  };

  return (
    <ProductPageContainer>
      <ProductImagesContainer>
        <ProductAllImagesContainer>
          {product.productImages.map((img, index) => (
            <ProductImage
              key={index}
              src={img}
              alt={`Product image ${index + 1}`}
              onMouseEnter={() => {
                setImg(img);
              }}
              onClick={() => setImg(img)}
            />
          ))}
        </ProductAllImagesContainer>
        <ZoomWrapper>
          <ProductSelectedImage
            src={img}
            alt={product.name}
            onMouseEnter={handleMouseEnterProduct}
            onMouseMove={handleMouseMoveProduct}
            onMouseLeave={handleLeaveImageZoom}
          />
          {zoomImage && (
            <ZoomedImage
              src={img}
              style={{
                backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                  zoomImageCoordinate.y * 100
                }%`,
              }}
            />
          )}
        </ZoomWrapper>
      </ProductImagesContainer>
      <ProductInfoContainer>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>₹ {product.price}</ProductPrice>
        <ProductInfo>{product.productInfo}</ProductInfo>
        <ProductSizes>
          {product.availableSizes.map((size, index) => (
            <Size
            key={index}
            selected={size === selectedSize}
            onClick={() => setSelectedSize(size)}
          >
            {size}
          </Size>
          ))}
        </ProductSizes>
        <AddToCart onClick={handleAddToCart}>Add to Cart</AddToCart>
      </ProductInfoContainer>
    </ProductPageContainer>
  );
};

const ProductPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100vw;
  height: 90vh;
  padding: 24px;
  position: relative;
  top: 60px;
  @media (max-width: 1500px) {
    display: block;
    height: 100vh;
  }
  @media (max-width: 520px) {
    margin-bottom: 150px;
  }
`;

const ProductImagesContainer = styled.div`
  display: flex;
  width: 42vw;
  height: 80vh;
  @media (max-width: 1500px) {
    width: 100vw;
    height: 480px;
    justify-content: space-between;
  }
  @media (max-width: 600px) {
    height: 410px;
  }
  @media (max-width: 490px) {
    align-items: center;
    justify-content: center;
  }
`;

const ProductAllImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 2px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 10px;
  }
  @media (max-width: 1500px) {
    width: 40vw;
    height: 430px;
  }
  @media (max-width: 490px) {
    width: 80vw;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      height: 2px;
    }
  }
`;

const ProductSelectedImage = styled.img`
  width: 450px;
  height: 500px;
  background-size: cover;
  margin: 24px;
  border-radius: 12px;
  transition: transform 0.3s ease-in-out;
  cursor: zoom-in;
  @media (max-width: 700px) {
    width: 350px;
  }
  @media (max-width: 600px) {
    width: 250px;
    height: 400px;
  }
  @media (max-width: 490px) {
    display: none;
  }
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  background-size: cover;
  border-radius: 8px;
  margin: 4px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  @media (max-width: 1500px) {
    width: 180px;
  }
  @media (max-width: 490px) {
    width: 250px;
    height: 400px;
    margin-bottom: 4px;
  }
`;

const ProductInfoContainer = styled.div`
  width: 48vw;
  height: 80vh;
  padding: 32px;
  @media (max-width: 1500px) {
    width: 100vw;
    padding: 24px;
    justify-content: space-between;
    margin-top: 10px;
  }
`;

const ProductName = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: 500;
  color: #fe4a49;
  @media (max-width: 1500px) {
    font-size: 26px;
    margin-bottom: 10px;
  }
`;

const ProductPrice = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 400;
  color: #fec620;
  @media (max-width: 1500px) {
    font-size: 22px;
    margin-bottom: 10px;
  }
`;

const ProductInfo = styled.div`
  font-size: 16px;
  margin-bottom: 40px;
  @media (max-width: 1500px) {
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const ProductSizes = styled.div`
  display: flex;
  margin-bottom: 20px;
  @media (max-width: 1500px) {
    margin-bottom: 10px;
  }
  @media (max-width: 600px) {
    margin-bottom: 30px;
  }
`;

const Size = styled.div`
  border: 1px solid white;
  margin: 4px;
  padding: 8px;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#FEC620" : "black")};
  color: ${({ selected }) => (selected ? "black" : "white")};
`;

const AddToCart = styled.button`
  height: 60px;
  margin-right: 40px;
  border: 2px solid #fec620;
  box-shadow: 0 4px 14px rgb(255, 242, 0);
  border-radius: 16px;
  background-color: black;
  outline: none;
  color: white;
  text-transform: uppercase;
  padding: var(--spacing-medium);
  transition: all 0.3s ease-in-out;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 14px #fe4a49;
    border: 2px solid #fe4a49;
    color: #fe4a49;
  }
  @media (max-width: 500px) {
    height: 80px;
  }
`;

const ZoomWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const ZoomedImage = styled.div`
  position: absolute;
  top: 400px;
  left: 100%;
  width: 200px;
  height: 200px;
  background-size: 200%;
  background-repeat: no-repeat;
  background-image: ${({ src }) => `url(${src})`};
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  z-index: 1;
  @media (max-width: 1500px) {
    display: none;
  }
`;

export default ProductPage;
