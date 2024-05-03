import React, { useEffect, useState } from "react";
import MovieCarousel from "../../components/MovieCarrusel/MovieCarrusel";
import { IMovieResponse } from "../../components/MovieCard/types";
import { getPlaying } from "../../services/movies/getPlayingMovies";

const Playing: React.FC = () => {
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getPlayingMovies = async () => {
        await getPlaying().then((data) => {
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
        getPlayingMovies();
    }, []);

    return(
        <div>
            {isLoading ? <div>Loading...</div> : <MovieCarousel movies={movies} />}
        </div>
    )
}

export default Playing;
