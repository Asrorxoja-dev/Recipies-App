import { useCollection } from "../hooks/useCollection";

import RecipiesList from "../components/RecipiesList";

function Home() {
  const { data: recipies } = useCollection();

  return (
    <div>
      {recipies ? (
        <h1 className="text-3xl mt-2 mb-7 ">
          All Recipies - {recipies && recipies.length}
        </h1>
      ) : (
        <h1 className="loading  w-10 mx-auto mt-40 items-center justify-center flex object-cover">
          No Recipies yet
        </h1>
      )}
      {recipies && <RecipiesList recipes={recipies} />}
    </div>
  );
}

export default Home;
