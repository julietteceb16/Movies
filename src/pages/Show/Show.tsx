import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IMovieResponse } from "../../components/MovieCard/types";
import { getMovieDetail} from "../../services/movies/getMovieDetail";
import { getSimilar } from "../../services/movies/getSimilarMovies";
import { MovieDetail } from "../../components/MovieDetail";
import MovieCarousel from "../../components/MovieCarrusel/MovieCarrusel";
import { IMovieDetail } from "./types";

const Show: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<IMovieDetail | null>(null);
    const [similarMovies, setSimilarMovies] = useState<IMovieResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        setIsLoading(true);
        if (id) {
            getMovieDetail(id).then((data) => {
                if (data && data.data) {
                    setMovie(data.data);
                    setIsLoading(false);
                }
            });
            getSimilar(id).then((data) => {
                if (data && data.data) {
                    setSimilarMovies(data.data.results);
                    setIsLoading(false);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [id]);

    return (
        <div className="w-full bg-gradient-to-r from-gray-100 to-indigo-950 min-h-screen text-white">
            <div className="flex justify-end py-10 px-8 md:px-20 lg:px-40">
                <button 
                    onClick={goBack}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-lg"
                >
                    Back
                </button>
            </div>
            {isLoading && <div className="text-center text-white">Loading...</div>}
            {movie && (
                <div className="space-y-10 bg-indigo-950 text-white p-8 md:p-24 w-full">
                    <section>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold italic mb-5">Información de Movies</h1>
                        <div className="w-1/6 border-t-4 mb-7 border-indigo-300" style={{height: '2px'}}></div>
                        <MovieDetail {...movie} />
                    </section>
                    <section>
                        <h3 className="text-4xl font-semibold mb-5 mt-3 italic">Recomendaciones</h3>
                        <div className="w-1/6 border-t-4 mb-7 border-indigo-300" style={{height: '2px'}}></div>
                        {similarMovies.length > 0 && <MovieCarousel movies={similarMovies} />}
                    </section>
                </div>
            )}
        </div>
    );
};

export default Show;
