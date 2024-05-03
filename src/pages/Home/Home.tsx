import React from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import { movies } from "../../constants/moviesMock";

const Home = () => {
    return(
        <div style={{marginLeft: "35px", overflow: "hidden"}}>
            <h1 className="text-3xl font-bold mb-4 pt-5">Movie Grid</h1>
            <div>
            {movies.map(movie => (
                <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    voteAvergae={movie.vote_average}
                    genreId={movie.genre_ids[0]}
                />
                ))}
        </div>
        </div>
    )
}

export default Home;