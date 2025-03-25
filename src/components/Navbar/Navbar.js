import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MdSearch, MdAccountCircle } from 'react-icons/md';
import { useScrollY } from '../hooks';
import { useSelector, useDispatch } from 'react-redux';
import { initiateLogin } from '../store/actions/auth';
import logoImage from '../../assets/images/netflixlogo.png';

function Navbar() {
  const [scrollY] = useScrollY();
  const [keywords, setKeywords] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, accountDetails } = useSelector(state => state.auth);

  const handleChangeInput = e => {
    let keywords = e.target.value;
    setKeywords(keywords);
    keywords.length > 0
      ? navigate(`/search?keyword=${keywords.trim()}`)
      : navigate('/');
  };

  const handleLogin = () => {
    dispatch(initiateLogin());
  };

  return (
    <Navigation
      style={
        scrollY < 50
          ? { background: 'transparent' }
          : { background: 'var(--color-background)' }
      }
    >
      <NavContainer>
        <Logo>
          <Link to="/">
            <img src={logoImage} alt="Netflix Logo" />
          </Link>
        </Logo>

        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/discover">Discover</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/watchlist">Watchlist</NavLink>
              <NavLink to="/favorites">Favorites</NavLink>
            </>
          )}
        </NavMenu>

        <NavRight>
          <SearchBox>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search movies & TV..."
              value={keywords}
              onChange={handleChangeInput}
            />
          </SearchBox>

          {isAuthenticated ? (
            <ProfileMenu>
              <ProfileButton to="/profile">
                {accountDetails?.avatar?.tmdb?.avatar_path ? (
                  <ProfileImage
                    src={`https://image.tmdb.org/t/p/w45${accountDetails.avatar.tmdb.avatar_path}`}
                    alt="Profile"
                  />
                ) : (
                  <MdAccountCircle size={32} />
                )}
              </ProfileButton>
            </ProfileMenu>
          ) : (
            <LoginButton onClick={handleLogin}>Sign In</LoginButton>
          )}
        </NavRight>
      </NavContainer>
    </Navigation>
  );
}

const Navigation = styled.nav`
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  transition: all 0.3s ease;
  z-index: 999;
`;

const NavContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  img {
    height: 35px;
    cursor: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--color-white);
  font-size: 1rem;
  font-weight: 500;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-accent);
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SearchBox = styled.div`
  position: relative;
  width: 300px;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

const SearchIcon = styled(MdSearch)`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-light-gray);
  font-size: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 40px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: var(--border-radius-md);
  color: var(--color-white);
  font-size: 0.9rem;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: var(--color-light-gray);
  }
`;

const ProfileMenu = styled.div`
  position: relative;
`;

const ProfileButton = styled(Link)`
  display: flex;
  align-items: center;
  color: var(--color-white);
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const LoginButton = styled.button`
  background: var(--color-accent);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-normal);

  &:hover {
    background: var(--color-accent-hover);
    transform: translateY(-2px);
  }
`;

export default Navbar;
