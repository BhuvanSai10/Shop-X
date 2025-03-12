import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import summaryApi from "../common";
import Context from "../context";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isLoginPage, setIsLoginPage ,hideBestsellers, setHideBestsellers} = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleOnChangeForSignUp = (e) => {
    const { name, value } = e.target;

    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault(); 

    if (signUpData.password === signUpData.confirmPassword) {
      try {
        const dataResponse = await fetch(summaryApi.signUp.url, {
          method: summaryApi.signUp.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        });

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate("/loginpage");
          setHideBestsellers(!hideBestsellers);
        } else if (dataApi.error) {
          toast.error(dataApi.message);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      toast.error("Password and confirm password do not match.");
    }
  };

  return (
    <>
      <PageWrapper>
        <SignUpFormCard>
          <Title>Just a few steps away, Dive into ShopX!</Title>
          <Form onSubmit={handleSignUpSubmit}>
            <Input
              type="text"
              placeholder="Enter a username"
              name="name"
              value={signUpData.name}
              onChange={handleOnChangeForSignUp}
            />
            <Input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={signUpData.email}
              onChange={handleOnChangeForSignUp}
            />
            <InputWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={signUpData.password}
                onChange={handleOnChangeForSignUp}
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
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              name="confirmPassword"
              value={signUpData.confirmPassword}
              onChange={handleOnChangeForSignUp}
            />
            <Button type="submit">Sign Up</Button>
          </Form>
          <FooterWrapper>
            <SupportMsg>Already have an account?</SupportMsg>
            <Btn onClick={() => {setIsLoginPage(!isLoginPage);setHideBestsellers(!hideBestsellers);navigate("/loginpage")}}>Sign in</Btn>
          </FooterWrapper>
        </SignUpFormCard>
      </PageWrapper>
    </>
  );
};

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
`;

const SignUpFormCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgb(255, 242, 0);
  border-radius: 8px;
  width: 500px;
  height: auto;
  box-shadow: 0 4px 14px rgb(255, 242, 0);

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
  color: #fec620;

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
  border-bottom: 1px solid #ff0000;
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
  background-color: #fec620;
  box-shadow: 0 4px 14px rgb(255, 238, 0);
  color: black;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #fec620ba;
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
    color: #fec620;
    border-bottom: 1px solid #fec620;
  }
`;

export default SignUpPage;
