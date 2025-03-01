const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticate = require("../middleware/auth"); //  Middleware to check if user is logged in

//  Add Recipe to Favorites
router.post("/add", authenticate, async (req, res) => {
  try {
    const { recipeId } = req.body;
    const user = await User.findById(req.user.userId);

    
    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }

    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: "Error adding to favorites" });
  }
});

//  Remove Recipe from Favorites
router.post("/remove", authenticate, async (req, res) => {
  try {
    const { recipeId } = req.body;
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
    await user.save();

    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ error: "Error removing from favorites" });
  }
});


//  Get User's Favorite Recipes
router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("favorites"); // ✅ Populate recipe details
    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("✅ Sending Favorite Recipes:", user.favorites); // Debugging
    res.json(user.favorites);
  } catch (error) {
    console.error("❌ Error fetching favorites:", error);
    res.status(500).json({ error: "Error fetching favorites" });
  }
});

module.exports = router;
