import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMovieDetail } from "../Show/types";
import { MovieCard } from "../../components/MovieCard";
import { getDetails } from "../../services/movies/getDetails";

const Favorite = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [favoriteMovies, setFavoriteMovies] = useState<IMovieDetail[]>([]);
    const favorites: string = localStorage.getItem("favorites") || "";

    const goBack = () => {
        navigate(-1);
    };

    const runGetFavorites = async () => {
        if (favorites.length) {
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favorite: string) => {
                    return getDetails(Number(favorite))
                        .then((res) => {
                            if (res && res.data) {
                                return res.data;
                            }
                        })
                        .catch((err) => {
                            console.log(err, "err");
                        });
                })
            );
            setFavoriteMovies(newShows.filter(Boolean) as IMovieDetail[]);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        runGetFavorites();
    }, []);

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
            <div className="space-y-10 bg-indigo-950 text-white p-8 md:p-24 w-full top-10">
                {!loading ? (
                    favoriteMovies.length > 0 ? (
                        <section>
                            <h3 className="text-4xl font-semibold mb-5 mt-3 italic"> Favoritos </h3>
                            <div className="w-1/6 border-t-4 mb-7 border-indigo-300" style={{ height: "2px" }}></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {favoriteMovies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movieId={movie.id}
                                        posterPath={movie.poster_path}
                                        title={movie.title}
                                        voteAvergae={movie.vote_average}
                                        genreId={movie.genres && movie.genres.length > 0 ? movie.genres[0].id : 0}
                                    />
                                ))}
                            </div>
                        </section>
                    ) : (
                        <section>
                            <h3 className="text-4xl font-semibold mb-5 mt-3 italic"> Favoritos </h3>
                            <div className="w-1/6 border-t-4 mb-7 border-indigo-300" style={{ height: "2px" }}></div>
                            <p className="text-xl">Oops... you don't have any favorites yet</p>
                        </section>
                    )
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    );
};

export default Favorite;
