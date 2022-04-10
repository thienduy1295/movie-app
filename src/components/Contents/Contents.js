import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getActionMovies,
  getComedyMovies,
  getDocumentaries,
  getHorrorMovies,
  getNetflixOriginals,
  getRomanceMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from "../store/actions";
import MoviesRow from "./MoviesRow";

function Contents(props) {
  const dispatch = useDispatch();
  const {
    NetflixOriginals,
    TrendingMovies,
    TopRatedMovies,
    ActionMovies,
    ComedyMovies,
    HorrorMovies,
    RomanceMovies,
    Documentaries,
  } = useSelector((state) => state.infoMovies);

  useEffect(() => {
    dispatch(getNetflixOriginals());
    dispatch(getTrendingMovies());
    dispatch(getTopRatedMovies());
    dispatch(getActionMovies());
    dispatch(getComedyMovies());
    dispatch(getHorrorMovies());
    dispatch(getRomanceMovies());
    dispatch(getDocumentaries());
  }, [dispatch]);

  return (
    <div>
      <MoviesRow
        movies={NetflixOriginals}
        title="Netflix Originals"
        isNetflix={true}
      />
      <MoviesRow
        movies={TrendingMovies}
        title="Trending Movies"
        isNetflix={true}
      />
      <MoviesRow
        movies={TopRatedMovies}
        title="Top Rated Movies"
        isNetflix={true}
      />
      <MoviesRow movies={ActionMovies} title="Action Movies" />
      <MoviesRow movies={ComedyMovies} title="Comedy Movies" />
      <MoviesRow movies={HorrorMovies} title="Horror Movies" />
      <MoviesRow movies={RomanceMovies} title="Romance Movies" />
      <MoviesRow movies={Documentaries} title="Documentaries" />
    </div>
  );
}

export default Contents;
