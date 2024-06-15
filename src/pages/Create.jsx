import React, { useEffect, useState } from "react";
import { Form, useActionData, redirect } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useCreateRecipie } from "../hooks/useCreateRecipie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const action = async ({ request }) => {
  try {
    console.log("Processing form data...");
    const formData = await request.formData();
    console.log("Form data received:", formData);

    const title = formData.get("title");
    const image = formData.get("image");
    const cookingTime = formData.get("cookingTime");
    const method = formData.get("method");
    const category = formData.get("category");

    return {
      title,
      image,
      cookingTime,
      method,
      category,
    };

    
  } catch (error) {
    console.error("Error processing form data:", error);
    throw new Error("Failed to process form data");
  }
};

function Create() {
  const createAction = useActionData();
  const { data, addNewDoc } = useCreateRecipie();
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const addIngredients = (e) => {
    e.preventDefault();
    if (!ingredients.includes(ingredient) && ingredient.trim() !== "") {
      setIngredients((prev) => [...prev, ingredient]);
      setIngredient("");
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

 

  useEffect(() => {
    if (createAction && !data) {
      const newRecipe = {
        ...createAction,
        ingredients,
      };
      addNewDoc(newRecipe);
    }
    if (data) {
      navigate("/");
      toast.success("Added new recipe successfully");
    }
  }, [createAction, data, navigate, ingredients, addNewDoc]);

  return (
    <div className="grid place-items-center">
      <div className="max-w-96 w-full">
        <h1 className="text-3xl text-center font-bold">Create New Recipe</h1>
        <Form method="post">
          <FormInput name="title" type="text" label="Title" />
          <div className="flex items-center gap-5">
            <label className="form-control w-full mb-3">
              <div className="label">
                <span className="label-text">Ingredient</span>
              </div>
              <input
                onChange={(e) => setIngredient(e.target.value)}
                type="text"
                name="ingredient"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={ingredient}
              />
            </label>
            <button
              onClick={addIngredients}
              type="button"
              className="btn btn-secondary mt-6">
              Add
            </button>
          </div>
          <p className="mb-3 -mt-2">
            Ingredients:{" "}
            {ingredients.map((ing, index) => (
              <span key={index}>{ing}, </span>
            ))}
          </p>
          <FormInput name="cookingTime" type="number" label="Cooking time" />
          <FormInput name="image" type="url" label="Image" />
          <label className="text-sm mt-2">Category</label>
          <select
            name="category"
            onChange={handleCategoryChange}
            className="select select-bordered mt-3 w-full max-w-xl"
            value={category}>
            <option disabled value="">
              Food category?
            </option>
            <option value="milliyTaom">Milliy taomlar</option>
            <option value="fastFood">Fast food</option>
            <option value="turkTaom">Turk taomlar</option>
            <option value="yaponTaomi">Yapon taomlar</option>
            <option value="yevropaTaomi">Yevropa taomlar</option>
          </select>
          <FormInput name="method" type="text" label="Method" />
          <div className="mt-5">
            <button className="btn btn-secondary w-full mb-3" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Create;
