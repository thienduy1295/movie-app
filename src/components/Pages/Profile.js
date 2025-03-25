import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../store/actions/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { accountDetails } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!accountDetails) return <div>Loading...</div>;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar>
          {accountDetails.avatar?.tmdb?.avatar_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${accountDetails.avatar.tmdb.avatar_path}`}
              alt="User avatar"
            />
          ) : (
            <DefaultAvatar>{accountDetails.username?.[0]?.toUpperCase()}</DefaultAvatar>
          )}
        </Avatar>
        <UserInfo>
          <h1>{accountDetails.username}</h1>
          <p>Member since {new Date(accountDetails.created_at).getFullYear()}</p>
        </UserInfo>
      </ProfileHeader>

      <StatsGrid>
        <StatCard>
          <h3>Watchlist</h3>
          <Link to="/watchlist">View your watchlist</Link>
        </StatCard>
        <StatCard>
          <h3>Favorites</h3>
          <Link to="/favorites">View your favorites</Link>
        </StatCard>
        <StatCard>
          <h3>Ratings</h3>
          <Link to="/ratings">View your ratings</Link>
        </StatCard>
      </StatsGrid>

      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: var(--color-white);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-lg);
  backdrop-filter: blur(10px);
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DefaultAvatar = styled.div`
  width: 100%;
  height: 100%;
  background: var(--color-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  color: white;
`;

const UserInfo = styled.div`
  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    color: var(--color-light-gray);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 40px 0;
`;

const StatCard = styled.div`
  padding: 25px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-md);
  transition: var(--transition-normal);

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  a {
    color: var(--color-accent);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LogoutButton = styled.button`
  background: var(--color-accent);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: var(--border-radius-md);
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition-normal);

  &:hover {
    background: var(--color-accent-hover);
    transform: translateY(-2px);
  }
`;

export default Profile; 