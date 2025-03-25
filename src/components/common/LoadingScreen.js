import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <LoadingWrapper>
        <LoadingSpinner />
        <LoadingText>Loading...</LoadingText>
      </LoadingWrapper>
    </LoadingContainer>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: var(--color-white);
  font-size: 1.2rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export default LoadingScreen; 