const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

//Rutas
app.get("/", (req, res) => {
    let locDate = { temp: "Temp", disc: "Discription", location: "Location", humidity: "Humidity ", feel: "Feel ", speed: "Speed" };
    res.render("index", { locDate: locDate,});
});

//OpenWeather

const APIKEY = '5e733803feab3fcd1a7a450973adb32b';

app.post("/", async (req, res) => {
    try {
        const location = await req.body.city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=es&appid=${APIKEY}&units=metric`;
        let response = await fetch(url);
        let data = await response.json();
        let locDate = {};
        locDate.temp = Math.floor(data.main.temp);
        locDate.disc = data.weather[0].description;
        locDate.feel = data.main.feels_like;
        locDate.humidity = data.main.humidity;
        locDate.speed = data.wind.speed;
        locDate.location = location;
        console.log(locDate);
        res.render("index", { locDate: locDate,});
    } catch (err) {
        console.log(err);
        res.status(400).json({ data: '404, Pagina no encontrada' })
    }
});

app.listen(3000, () => {
    console.log("Servidor corriendo....");
});
