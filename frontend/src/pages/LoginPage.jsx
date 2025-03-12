import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import summaryApi from "../common";
import Context from "../context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { fetchUserDetails, isLoginPage,setIsLoginPage ,hideBestsellers, setHideBestsellers} = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChangeForSignIn = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataResponse = await fetch(summaryApi.signIn.url, {
        method: summaryApi.signIn.method,
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/");
        fetchUserDetails();
        setIsLoginPage(!isLoginPage);
        setHideBestsellers(!hideBestsellers);
      }
      if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <PageWrapper>
      <SignInFormCard>
        <Title>Dive into ShopX!</Title>
        <Form onSubmit={handleSignInSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={data.email}
            onChange={handleOnChangeForSignIn}
          />
          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={data.password}
              name="password"
              onChange={handleOnChangeForSignIn}
            />
            <ShowPasswordIcon
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <span>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </span>
            </ShowPasswordIcon>
          </InputWrapper>
          <Button type="submit">Sign in</Button>
        </Form>
        <FooterWrapper>
          <SupportMsg>Don't have an account?</SupportMsg>
          <Btn onClick={() => {setIsLoginPage(!isLoginPage);setHideBestsellers(!hideBestsellers);navigate("/signuppage")}}>Sign up</Btn>
        </FooterWrapper>
      </SignInFormCard>
    </PageWrapper>
  );
};


const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
`;

const SignInFormCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
  border-radius: 8px;
  width: 500px;
  height: auto;
  box-shadow: 0 4px 14px rgb(255, 0, 0);

  @media (max-width: 600px) {
    width: 70vw;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  margin: var(--spacing-medium);
  font-size: 36px;
  padding: 8px;
  font-weight: 700;
  color: #fe4a49;

  @media (max-width: 950px) {
    font-size: 36px;
  }
`;

const Input = styled.input`
  margin: var(--spacing-medium);
  padding: var(--spacing-medium);
  display: block;
  width: 350px;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  background-color: transparent;
  border-bottom: 1px solid #fec620;
  border-radius: 8px;

  @media (max-width: 600px) {
    width: 50vw;
    &::placeholder {
      font-size: 0.85rem;
    }
  }
`;

const Button = styled.button`
  font-size: 16px;
  margin: var(--spacing-medium);
  padding: 14px;
  background-color: #ff0400;
  box-shadow: 0 4px 14px rgb(255, 0, 0);
  color: white;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: rgba(255, 0, 0, 0.773);
  }

  @media (max-width: 458px) {
    font-size: 12px;
    padding: 8px;
    font-weight: 400;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const ShowPasswordIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  cursor: pointer;

  span {
    color: #fec620;
    font-size: 16px;
  }

  &:hover span {
    color: rgba(254, 198, 32, 0.8);
  }

  @media (max-width: 600px) {
    right: 15px;
    span {
      font-size: 12px;
    }
  }
`;

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SupportMsg = styled.span`
  font-size: 14px;
  padding: var(--spacing-small);
  margin-right: var(--spacing-small);
`;

const Btn = styled.span`
  font-size: 14px;
  border-bottom: 1px solid white;
  cursor: pointer;

  &:hover {
    color: #ff0400;
    border-bottom: 1px solid #ff0400;
  }
`;

export default LoginPage;
