import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleAuthCallback } from '../store/actions/auth';
import styled from 'styled-components';

const AuthCallback = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleAuthCallback());
  }, [dispatch]);

  return (
    <CallbackContainer>
      <LoadingMessage>
        <h2>Completing Authentication...</h2>
        <p>Please wait while we set up your session.</p>
      </LoadingMessage>
    </CallbackContainer>
  );
};

const CallbackContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  background: var(--color-background);
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: var(--color-white);

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    color: var(--color-light-gray);
  }
`;

export default AuthCallback;
