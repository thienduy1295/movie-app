import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { setMovieDetail } from '../store/actions';
import { FaPlay, FaPlus } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { AiFillLike } from 'react-icons/ai';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

function MoviesDetail(props) {
  const { movie, showModal } = props;
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleCloseModal = e => {
    e.stopPropagation();
    dispatch(setMovieDetail(null));
  };

  const handleModalClick = e => {
    e.stopPropagation();
  };

  const toggleOverview = () => {
    setIsExpanded(!isExpanded);
  };

  if (!showModal) return null;

  return (
    <MoviesDetailModal>
      <div className="backdrop" onClick={handleCloseModal} />
      <div className="modal-container">
        <div className="modal" onClick={handleModalClick}>
          <button className="modal__close" onClick={handleCloseModal}>
            <IoClose />
          </button>

          <div
            className="modal__banner"
            style={
              movie
                ? {
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${
                      movie.backdrop_path || movie.poster_path
                    })`,
                  }
                : {}
            }
          >
            <div className="modal__banner-overlay">
              <div className="modal__content">
                <div className="modal__title">
                  <h1>{movie && (movie.title || movie.name)}</h1>
                </div>

                <div className="modal__info">
                  <div className="modal__stats">
                    <span className="modal__rating">
                      {movie && Math.round(movie.vote_average * 10)}% Match
                    </span>
                    <span className="modal__year">
                      {movie &&
                        (movie.release_date || movie.first_air_date)?.split(
                          '-',
                        )[0]}
                    </span>
                    {movie && movie.runtime && (
                      <span className="modal__runtime">
                        {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                      </span>
                    )}
                    {movie && movie.adult && (
                      <span className="modal__mature">18+</span>
                    )}
                  </div>

                  <div className="modal__actions">
                    <button className="modal__action-button primary">
                      <FaPlay />
                      <span>Play</span>
                    </button>
                    <button className="modal__action-button">
                      <FaPlus />
                      <span>My List</span>
                    </button>
                    <button className="modal__action-button">
                      <AiFillLike />
                      <span>Rate</span>
                    </button>
                  </div>

                  <div
                    className={`modal__overview ${isExpanded ? 'expanded' : ''}`}
                  >
                    <p>{movie && movie.overview}</p>
                    {movie && movie.overview && movie.overview.length > 200 && (
                      <button
                        className="modal__overview-toggle"
                        onClick={toggleOverview}
                      >
                        {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
                        {isExpanded ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </div>

                  <div className="modal__details">
                    <div className="modal__detail-item">
                      <span className="label">Genres:</span>
                      <span className="value">
                        {movie &&
                          movie.genres &&
                          movie.genres.map(genre => genre.name).join(', ')}
                      </span>
                    </div>

                    <div className="modal__detail-item">
                      <span className="label">Original Language:</span>
                      <span className="value">
                        {movie && movie.original_language?.toUpperCase()}
                      </span>
                    </div>

                    <div className="modal__detail-item">
                      <span className="label">Total Votes:</span>
                      <span className="value">
                        {movie && movie.vote_count?.toLocaleString()}
                      </span>
                    </div>

                    <div className="modal__detail-item">
                      <span className="label">Popularity:</span>
                      <span className="value">
                        {movie && Math.round(movie.popularity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MoviesDetailModal>
  );
}

export default MoviesDetail;

const fadeIn = keyframes`
  from { background: rgba(0, 0, 0, 0); }
  to { background: rgba(0, 0, 0, 0.7); }
`;

const slideUp = keyframes`
  from { transform: translateY(100px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const MoviesDetailModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1200;
  display: flex;
  justify-content: center;
  align-items: center;

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);
    animation: ${fadeIn} 0.3s ease-in-out;
  }

  .modal-container {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .modal {
    position: relative;
    width: 850px;
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 6px;
    background: #181818;
    overflow: hidden;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    animation: ${slideUp} 0.3s ease-out forwards;

    &__close {
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 5;
      width: 36px;
      height: 36px;
      background: rgba(0, 0, 0, 0.5);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      svg {
        font-size: 24px;
        color: white;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.8);
        transform: scale(1.1);
      }
    }

    &__banner {
      position: relative;
      width: 100%;
      padding-top: 56.25%;
      background-size: cover;
      background-position: center top;
    }

    &__banner-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        180deg,
        rgba(24, 24, 24, 0) 0%,
        rgba(24, 24, 24, 0.4) 40%,
        #181818 100%
      );
    }

    &__content {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 36px 36px;
    }

    &__title {
      margin-bottom: 16px;

      h1 {
        font-size: 32px;
        font-weight: 600;
        margin: 0;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
      }
    }

    &__info {
      max-width: 60%;
    }

    &__stats {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;

      span {
        font-size: 16px;
        font-weight: 500;
      }
    }

    &__rating {
      color: #46d369;
    }

    &__year,
    &__runtime {
      color: #fff;
    }

    &__mature {
      border: 1px solid rgba(255, 255, 255, 0.4);
      padding: 1px 8px;
      border-radius: 3px;
      font-size: 14px !important;
    }

    &__actions {
      display: flex;
      gap: 10px;
      margin-bottom: 24px;
    }

    &__action-button {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 24px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;

      &.primary {
        background-color: #fff;
        color: #000;

        &:hover {
          background-color: rgba(255, 255, 255, 0.75);
        }
      }

      &:not(.primary) {
        background-color: rgba(109, 109, 110, 0.7);
        color: white;

        &:hover {
          background-color: rgba(109, 109, 110, 0.4);
        }
      }

      svg {
        font-size: 20px;
      }
    }

    &__overview {
      margin-bottom: 24px;

      p {
        font-size: 16px;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.9);
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      &.expanded p {
        -webkit-line-clamp: unset;
      }

      &-toggle {
        background: none;
        border: none;
        color: #fff;
        font-size: 14px;
        padding: 8px 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
        opacity: 0.7;
        transition: opacity 0.2s ease;

        &:hover {
          opacity: 1;
        }

        svg {
          font-size: 20px;
        }
      }
    }

    &__details {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 20px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    &__detail-item {
      font-size: 14px;

      .label {
        color: rgba(255, 255, 255, 0.5);
        margin-right: 8px;
      }

      .value {
        color: white;
      }
    }
  }

  @media (max-width: 768px) {
    .modal-container {
      padding: 0;
    }

    .modal {
      max-height: 100vh;
      border-radius: 0;

      &__content {
        padding: 0 20px 20px;
      }

      &__info {
        max-width: 100%;
      }

      &__title h1 {
        font-size: 24px;
      }

      &__stats span {
        font-size: 14px;
      }

      &__action-button {
        padding: 8px 16px;
        font-size: 14px;
      }

      &__overview p {
        font-size: 14px;
      }

      &__details {
        grid-template-columns: 1fr;
      }
    }
  }
`;
