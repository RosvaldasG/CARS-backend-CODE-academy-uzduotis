const express = require("express");

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

require("dotenv").config();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("Hello");
// Get All Cars-------------------------------------
app.get("/getAllCars", async (req, res) => {
  try {
    const cars = await db.query("SELECT * FROM cars");
    console.log(cars.rows);

    res.status(200).json({ allCars: cars.rows });
  } catch (err) {
    console.log(err);
  }

  console.log("-----------");
});

// Get Car By Id-------------------------------------
app.get("/getCar/:id", async (req, res) => {
  try {
    const car = await db.query(
      `SELECT * FROM cars WHERE id='${req.params.id}'`
    );
    console.log(car.rows);

    res.status(200).json({ Car: car.rows });
  } catch (err) {
    console.log(err);
  }

  console.log("-----------");
});
// Insert Car-----------------------------------

app.post("/insertCar", async (req, res) => {
  try {
    await db.query(`INSERT INTO public.cars (
          title, image, price, numberPlates)
          VALUES ('${req.body.title}', '${req.body.image}', ${req.body.price}, '${req.body.numberPlates}')`);
    return res.status(200).json({ status: "Insert was made successfully" });
  } catch (err) {
    console.log(err);
  }

  res.status(500).json({ status: "Something went wrong" });
});

// Delete Car---------------------------------

app.delete("/deleteCar/:id", async (req, res) => {
  try {
    const deletedCar = await db.query(
      `DELETE FROM public.cars WHERE id='${req.params.id}'`
    );
    console.log("Istrinta", deletedCar);
    return res.status(200).json({
      status: "Project was successfully deleted",
      deleted: deletedCar,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ status: "Something went wrong" });
  }
});

app.listen(3000, () => {
  console.log("Listed on port 3000");
});
