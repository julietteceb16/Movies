import React, { useEffect, useState } from "react";
import MovieCarousel from "../../components/MovieCarrusel/MovieCarrusel";
import { IMovieResponse } from "../../components/MovieCard/types";
import { getPlaying, getPopular } from "../../services";
import { getRated } from "../../services/movies/getRatedMovies";

const Home = () => {
    const [moviesP, setMoviesP] = useState<IMovieResponse[]>([]);
    const [MoviesRated, setMoviesRated] = useState<IMovieResponse[]>([]);
    const [moviesPlaying, setMoviesPlaying] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const getPopularMovies = async () => {
        try {
            const data = await getPopular();
            if (data && data.data) {
                setMoviesP(data.data.results);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getPlayingMovies = async () => {
        try {
            const data = await getPlaying();
            if (data && data.data) {
                setMoviesPlaying(data.data.results);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getRatedMovies = async () => {
        try {
            const data = await getRated();
            if (data && data.data) {
                setMoviesRated(data.data.results);
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getPopularMovies();
        getPlayingMovies();
        getRatedMovies();
    }, []);

    return (
        <div className="w-full bg-gradient-to-r from-gray-100 to-indigo-950 min-h-screen text-white">
            <div className="text-left py-10 px-8 md:px-20 lg:px-40">
                <h1 className="mb-4 text-6xl font-bold leading-tight tracking-tighter text-gray-900 md:text-7xl lg:text-8xl dark:text-black">
                    Las mejores <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-indigo-950 italic">películas</span>
                </h1>
            </div>
            <div className="space-y-10 bg-indigo-950 text-white p-3 w-full top-10">
            <section className="pl-10"> 
                <h3 className="text-4xl font-semibold mb-5 mt-3 italic">Popular</h3>  
                <div className="w-1/6 border-t-4 mb-7 border-indigo-300" style={{height: '2px'}}></div> 
                <MovieCarousel movies={moviesP} />
                </section>


                <section className="pl-10"> 
                <h3 className="text-4xl font-semibold mb-5 mt-3 italic">Playing</h3>  
                <div className="w-1/6 border-t-4 mb-7 border-indigo-300" style={{height: '2px'}}></div> 
                <MovieCarousel movies={MoviesRated} />
                </section>
                <section className="pl-10"> 
                <h3 className="text-4xl font-semibold mb-5 mt-3 italic">Rated Movies</h3>  
                <div className="w-1/6 border-t-4 mb-7 border-indigo-300" style={{height: '2px'}}></div> 
                <MovieCarousel movies={moviesPlaying} />
                </section>
            </div>
        </div>
        

    );
};

export default Home;




