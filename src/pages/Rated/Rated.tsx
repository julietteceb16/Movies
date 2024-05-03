import React, { useEffect, useState } from "react";
import MovieCarousel from "../../components/MovieCarrusel/MovieCarrusel";
import { IMovieResponse } from "../../components/MovieCard/types";
import {  getRated } from "../../services/movies/getRatedMovies";


const Rated = () => {
    const [MoviesRated, setMoviesRated] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const getRatedMovies = async () => {
        await getRated().then((data) => {
            if (data && data.data){
                setMoviesRated(data.data.results);
                setIsLoading(false);
            }
        })

        .catch((err) => {
            console.log(err);
        })
    };



    useEffect(() => {
        setIsLoading(true);
        getRatedMovies();
   
    }, []);

    return(
        <div className="w-full bg-gradient-to-r from-gray-100 to-indigo-950 min-h-screen text-white">
        <div className="text-left py-10 px-8 md:px-20 lg:px-40">
            <h1 className="mb-4 text-6xl font-bold leading-tight tracking-tighter text-gray-900 md:text-7xl lg:text-8xl dark:text-black">
                Top <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-indigo-950 italic">Rated</span>
            </h1>
        </div>
        <div className="space-y-10 bg-indigo-950 text-white p-24 w-full  top-10">
        <section > 
            <h3 className="text-4xl font-semibold mb-5 mt-3 italic"> Top del Mes</h3>  
            <div className="w-1/6 border-t-4 mb-7 border-indigo-300" style={{height: '2px'}}></div> 
            <MovieCarousel movies={MoviesRated} />
            </section>
        </div>
        </div>
    )
}

export default Rated;
