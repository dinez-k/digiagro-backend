import express from "express";
const bodyParser = require("body-parser")

import {
  getAllCities,
  insertCountry,
  insertCity,
  getAllCountries,
  getAllCountriesWithCities,
  getAllCitiesWithCountry,
} from "./queries";
import { City, Country } from "./schema";

const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
const port = process.env.PORT || "8000";

app.get("/",(req,res)=>{
  res.send("App is working");
})

app.get("/cities", (req, res) => {
  getAllCities().then((allCities) => {
    res.json(allCities);
  });
});

app.get("/countries", (req, res) => {
  getAllCountries().then((allCountries) => {
    res.json(allCountries);
  });
});

app.get("/countriesWithCities", (req, res) => {
  getAllCountriesWithCities().then((allCountriesWithCities) => {
    res.json(allCountriesWithCities);
  });
});

app.get("/citiesWithCountry", (req, res) => {
  getAllCitiesWithCountry().then((allCitiesWithCountry) => {
    res.json(allCitiesWithCountry);
  });
});

// Please use POST for inserting data ;)  
app.post("/insertCountries", async (req, res) => {
  const countriesData: Country[] = req.body;
  if (!Array.isArray(countriesData)) {
    return res.status(400).json({ message: 'Invalid data format. Expected an array.' });
  }
  const countries = await insertCountry(countriesData);
  res.send(countries);
});

// Please use POST for inserting data ;)cls
app.post("/insertCities", async (req, res) => {
  const citiesData: City[] = req.body;
  console.log(citiesData);
  const cities = await insertCity(citiesData);
  res.send(cities);
});

app.listen(port, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});
