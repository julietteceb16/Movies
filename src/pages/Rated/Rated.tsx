import React, { useEffect, useState } from "react";
import { MovieCard } from "../../components/MovieCard";
import { IMovieResponse } from "../../components/MovieCard/types";
import { getTop } from "../../services/movies/getTop";

const Rated: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getTopRatedMovies = async () => {
        await getTop().then((data) => {
            if (data && data.data){
                setMovies(data.data.results);
            }
        })
        .catch((err) => {
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        setIsLoading(true);
        getTopRatedMovies();
    }, []);

    return(
        <div>
            {isLoading && <div>Loading...</div>}
            {movies?.length > 0 && 
                movies.map((movie) => (
                    <MovieCard
                    title={movie.title}
                    genreId={movie.genre_ids[0]}
                    movieId={movie.id}
                    voteAvergae={movie.vote_average}
                    posterPath={movie.poster_path}
                />)
                )}
        </div>
    )
}

export default Rated;