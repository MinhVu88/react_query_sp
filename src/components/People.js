import React from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import Person from "./Person";

const queryClient = new QueryClient();

const FetchPeople = () => {
  const { data, status } = useQuery("planets", () =>
    fetch("http://swapi.dev/api/people/").then(response => response.json())
  );

  console.log("\npeople ->", data, " | status ->", status);

  return (
    <div>
      <h2>People</h2>

      {status === "loading" && <div>Loading Data...</div>}

      {status === "error" && <div>Error Fetching Data</div>}

      {status === "success" && (
        <div>
          {data.results.map(person => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

const People = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FetchPeople />
    </QueryClientProvider>
  );
};

export default People;
