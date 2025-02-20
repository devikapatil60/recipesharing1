import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();

  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    setRecipes(allRecipes);

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const deleteRecipe = (id) => {
    if (!loggedInUser) {
      alert("You must be logged in to delete a recipe!");
      return;
    }

    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));
    setRecipes(updatedRecipes);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  const toggleFavorite = (recipe) => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === recipe.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== recipe.id);
    } else {
      updatedFavorites = [...favorites, recipe];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="navbar">
        <h2 className="title">Delicious Recipes</h2>
        {loggedInUser ? (
          <button onClick={handleLogout} className="logout-btn">Sign Out</button>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="recipe-grid">
        {filteredRecipes.length === 0 ? (
          <p className="no-recipes">No recipes found.</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <div className="image-container">
                <img
                  src={recipe.image ? recipe.image : "/default-image.jpg"}
                  alt={recipe.title}
                  className="recipe-img"
                />
              </div>
              <div className="recipe-content">
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-desc">{recipe.description}</p>
                <p className="posted-by"><strong>Posted by:</strong> {recipe.userEmail}</p>

                <div className="recipe-actions">
                  <Link to={`/recipe/${recipe.id}`} className="view-btn">View</Link>
                  {loggedInUser === recipe.userEmail && (
                    <>
                      <Link to={`/edit-recipe/${recipe.id}`} className="edit-btn">Edit</Link>
                      <button onClick={() => deleteRecipe(recipe.id)} className="delete-btn">Delete</button>
                    </>
                  )}

                  {/* Favorite Button */}
                  <button
                    className={`fav-btn ${favorites.some((fav) => fav.id === recipe.id) ? "active" : ""}`}
                    onClick={() => toggleFavorite(recipe)}
                  >
                    {favorites.some((fav) => fav.id === recipe.id) ? "★" : "☆"}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Link to="/add-recipe" className="add-recipe-btn">+ Add Recipe</Link>
    </div>
  );
};

export default Home;
