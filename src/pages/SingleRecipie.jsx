import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const loader = async ({ params }) => {
  const docRef = doc(db, "recipies", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

function SingleRecipie() {
  const data = useLoaderData();
  const [cartNumber, setCartNumber] = useState(1);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  return (
    <div>
      {data && (
        <div className="object-cover rounded p-5 mb-10">
          <h1 className="text-3xl mb-5">Recipe elements</h1>
          <div className="carousel carousel-center max-w-l p-4 space-x-4 bg-neutral  rounded-box">
            <div className="carousel-item">
              <img
                src={data.image}
                alt=""
                className="w-96 h-80 object-cover rounded"
              />
            </div>
            <div className="carousel-item">
              <img
                src={data.image}
                alt=""
                className="w-96 h-80 object-cover rounded"
              />
            </div>
            <div className="carousel-item">
              <img
                src={data.image}
                alt=""
                className="w-96 h-80 object-cover rounded"
              />
            </div>
            <div className="carousel-item">
              <img
                src={data.image}
                alt=""
                className="w-96 h-80 object-cover rounded"
              />
            </div>
            {/* other carousel items */}
          </div>
          <h1 className="text-4xl mt-3x mb-5">{data.title}</h1>
          <h2 className="mb-5 text-xl letter">
            Ingredients:{" "}
            {data.ingredients &&
              data.ingredients.map((ingredient, index) => (
                <button key={index} className="btn btn-sm btn-neutral m-1">
                  {ingredient}
                </button>
              ))}{" "}
          </h2>
          <h3 className="text-xl mb-5">
            Cooking time: {data.cookingTime} minutes
          </h3>
          <h3 className="text-xl mb-5">Category: {data.category}</h3>
          <h3 className="text-x mb-5">
            <span className="font-bold">Method:</span> {data.method}
          </h3>
          <div className="flex items-center gap-10 justify-end">
            <div>
              <Link
                className="bg-red-500 p-2 text-white flex justify-center mx-auto w-20 rounded px-4"
                to="/">
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleRecipie;
