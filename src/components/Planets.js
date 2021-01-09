import React, { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Planet from "./Planet";

const queryClient = new QueryClient();

const FetchPlanets = () => {
  const [page, setPage] = useState(1);

  const { data, status } = useQuery(
    ["planets", page],
    () =>
      fetch(`http://swapi.dev/api/planets/?page=${page}`).then(response =>
        response.json()
      ),
    {
      staleTime: 0,
      cacheTime: 10,
      onSuccess: () => console.log("\ndata fetched\n\n")
    }
  );

  console.log("\nplanets ->", data, " | status ->", status);

  return (
    <div>
      <h2>Planets</h2>

      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button>

      {status === "loading" && <div>Loading Data...</div>}

      {status === "error" && <div>Error Fetching Data</div>}

      {status === "success" && (
        <div>
          {data.results.map(planet => (
            <Planet key={planet.name} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

const Planets = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchPlanets />
    </QueryClientProvider>
  );
};

export default Planets;
