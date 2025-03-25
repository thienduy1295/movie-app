import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Home from './components/Pages/Home';
import Search from './components/Pages/Search';
import Profile from './components/Pages/Profile';
import MovieDetails from './components/MoviesDetail/MoviesDetail';
import Watchlist from './components/Pages/Watchlist';
import Favorites from './components/Pages/Favorites';
import Discover from './components/Pages/Discover';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from './components/store/actions/auth';
import AuthCallback from './components/Pages/AuthCallback';
import LoadingScreen from './components/common/LoadingScreen';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { sessionId } = useSelector(state => state.auth);

  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(checkSession());
      setIsLoading(false);
    };
    initializeApp();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AppContainer>
      <BrowserRouter>
        <Navbar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route
              path="/profile"
              element={sessionId ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/watchlist"
              element={sessionId ? <Watchlist /> : <Navigate to="/" />}
            />
            <Route
              path="/favorites"
              element={sessionId ? <Favorites /> : <Navigate to="/" />}
            />
            <Route path="/discover" element={<Discover />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/tv/:id" element={<MovieDetails />} />
          </Routes>
        </MainContent>
      </BrowserRouter>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-background);
`;

const MainContent = styled.main`
  min-height: calc(100vh - 70px);
  padding-top: 70px;
  position: relative;
`;

export default App;
