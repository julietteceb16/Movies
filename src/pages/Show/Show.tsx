import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const Show = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Puedes poner código aquí si necesitas manejar algún efecto al montar o desmontar el componente.
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-gray-100 to-indigo-950 min-h-screen text-white">
      <div className="text-left py-10 px-8 md:px-20 lg:px-40">
        <h1 className="mb-4 text-6xl font-bold leading-tight tracking-tighter text-gray-900 md:text-7xl lg:text-8xl dark:text-black">
          Ahora <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-indigo-950 italic">En Cartelera</span>
        </h1>
      </div>
      <div className="space-y-10 bg-indigo-950 text-white p-24 w-full top-10">
        <section>
          <h3 className="text-4xl font-semibold mb-5 mt-3 italic">Detalles del Show</h3>
          <div className="w-1/6 border-t-4 mb-7 border-indigo-300" style={{ height: '2px' }}></div>
          <div className="text-left text-lg space-y-4">
            <div>show ID: {id}</div>
            <div>titulo desde state: {location.state?.movie || 'No disponible'}</div>
            <button onClick={goBack} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Ir atrás
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Show;
