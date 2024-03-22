import express, { NextFunction, Request, Response } from "express";
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

app.post("/insertCountries", async (req, res) => {
  const countriesData: Country[] = req.body;
  if (!Array.isArray(countriesData)) {
    return res.status(400).json({ message: 'Invalid data format. Expected an array.' });
  }
  const countries = await insertCountry(countriesData);
  res.send(countries);
});

// app.post("/insertCities", async (req, res) => {
//   const citiesData: City[] = req.body;
//   console.log(citiesData);
//   insertCity(citiesData).then((cities)=> res.status(201).send(cities)).catch((err)=>{
//     throw new Error(err);
//    // res.status(400).send({message : err + "" });
//   });
// });

app.post("/insertCities", async (req, res , next: NextFunction) => {
  try {
      const citiesData: City[] = req.body;
      console.log(citiesData);

      const cities = await insertCity(citiesData);
      res.status(201).send(cities);
  } catch (error) {
      next(error); //
  }
});

app.use((error : Error, req : Request,res : Response, next : NextFunction) => {
  console.error('Global error handler:', error.message);
  res.status(400).send({ message: error.message });
});

app.listen(port, (err) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});
