import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="favorites-container">
      <h1>My Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div className="recipe-list">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <Link to={`/recipe/${recipe.id}`} className="view-btn">View Recipe</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
