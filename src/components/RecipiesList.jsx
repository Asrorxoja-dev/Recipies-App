import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/fireBaseConfig";
import toast from "react-hot-toast";

function RecipiesList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipies"));
      const recipesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesData);
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = confirm("Do you want to delete this recipe?");
    if (confirmed) {
      await deleteDoc(doc(db, "recipies", id));
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
      toast.success("Recipe deleted successfully");
    }
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card mb-10 bg-base-100  shadow-xl">
          <button
            onClick={() => handleDelete(recipe.id)}
            className="flex justify-end pr-5 mt-5">
            ✖️
          </button>
          <Link to={`/singleRecipie/${recipe.id}`}>
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              <p className="line-clamp-3">{recipe.method}</p>

              <div className="card-actions  flex justify-end">
                <p className=" btn btn-sm btn-accent text-white max-w-28 ">
                  {recipe.cookingTime} minutes
                </p>
              </div>
            </div>

            <figure>
              <img
                src={recipe.image}
                className=":md-h-auto h-[200px] w-full rounded-b-md object-cover"
                alt="food image"
              />
            </figure>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RecipiesList;
