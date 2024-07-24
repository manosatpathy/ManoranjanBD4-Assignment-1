const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = 3000;
let db;
app.use(cors());

// Connection to the DB
(async () => {
  db = await open({
    filename: "./BD4_Assignment1/database.sqlite",
    driver: sqlite3.Database,
  });
  if (db) console.log("Successfully connected to Sqlite Database");
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4 - Assignment 1 - FoodieFinds" });
});

// Exercise 1: Get All Restaurants
async function getAllRestaurants() {
  const query = "SELECT * FROM restaurants";
  const response = await db.all(query, []);
  return { restaurants: response };
}

app.get("/restaurants", async (req, res) => {
  try {
    const result = await getAllRestaurants();
    if (result.restaurants.length === 0) {
      res.status(404).json({ message: "No Restaurants Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Get Restaurant by ID
async function GetRestaurantById(id) {
  const query = "SELECT * FROM restaurants WHERE id = ?";
  const response = await db.all(query, [id]);
  return { restaurant: response };
}

app.get("/restaurants/details/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await GetRestaurantById(id);
    if (result.restaurant.length === 0) {
      res.status(404).json({ message: "No Restaurant Found by this ID " + id });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get Restaurants by Cuisine
async function GetRestaurantByCuisine(cuisine) {
  const query = "SELECT * FROM restaurants WHERE cuisine = ?";
  const response = await db.all(query, [cuisine]);
  return { restaurants: response };
}

app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  const cuisine = req.params.cuisine;
  try {
    const result = await GetRestaurantByCuisine(cuisine);
    if (result.restaurants.length === 0) {
      res
        .status(404)
        .json({ message: "No Restaurants Found by this Cuisine " + cuisine });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Get Restaurants by Filter
async function GetRestaurantsByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  const query =
    "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?";
  const response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}

app.get("/restaurants/filter", async (req, res) => {
  const isVeg = req.query.isVeg;
  const hasOutdoorSeating = req.query.hasOutdoorSeating;
  const isLuxury = req.query.isLuxury;
  try {
    const result = await GetRestaurantsByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury,
    );
    if (result.restaurants.length === 0) {
      res
        .status(404)
        .json({ message: "No Restaurants Found by these filters" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 5: Get Restaurants Sorted by Rating
async function GetRestaurantsSortedByRating() {
  const query = "SELECT * FROM restaurants ORDER BY rating DESC";
  const response = await db.all(query, []);
  return { restaurants: response };
}

app.get("/restaurants/sort-by-rating", async (req, res) => {
  try {
    const result = await GetRestaurantsSortedByRating();
    if (result.restaurants.length === 0) {
      res.status(404).json({ message: "No Restaurants Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 6: Get All Dishes
async function getAllDishes() {
  const query = "SELECT * FROM dishes";
  const response = await db.all(query, []);
  return { dishes: response };
}

app.get("/dishes", async (req, res) => {
  try {
    const result = await getAllDishes();
    if (result.dishes.length === 0) {
      res.status(404).json({ message: "No Dishes Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 7: Get Dish by ID
async function GetDishById(id) {
  const query = "SELECT * FROM dishes WHERE id = ?";
  const response = await db.all(query, [id]);
  return { dish: response };
}

app.get("/dishes/details/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await GetDishById(id);
    if (result.dish.length === 0) {
      res.status(404).json({ message: "No Dish Found by this ID " + id });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 8: Get Dishes by Filter
async function GetDishesByFilter(isVeg) {
  const query = "SELECT * FROM dishes WHERE isVeg = ?";
  const response = await db.all(query, [isVeg]);
  return { dishes: response };
}

app.get("/dishes/filter", async (req, res) => {
  const isVeg = req.query.isVeg;
  try {
    const result = await GetDishesByFilter(isVeg);
    if (result.dishes.length === 0) {
      res.status(404).json({ message: "No Dishes Found by these filters" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 9: Get Dishes Sorted by Price
async function GetDishesSortedByPrice() {
  const query = "SELECT * FROM dishes ORDER BY price";
  const response = await db.all(query, []);
  return { dishes: response };
}

app.get("/dishes/sort-by-price", async (req, res) => {
  try {
    const result = await GetDishesSortedByPrice();
    if (result.dishes.length === 0) {
      res.status(404).json({ message: "No Dishes Found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
