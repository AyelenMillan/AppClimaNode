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
    let locDate = { temp: "Clima", disc: "Descripcion",icon: "Icono", location: "Lugar", humidity: "Humedad ", feel: "Sensacion termica", speed: "Viento", tempFut: "Clima"};
    res.render("index", { locDate: locDate,});
});

//OpenWeather

const APIKEY = '5e733803feab3fcd1a7a450973adb32b';


        app.post("/", async (req, res) => {
            try {
                const location = await req.body.city;
                const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=es&appid=${APIKEY}&units=metric`;
                let response = await fetch(url);
                let data = await response.json();
                let locDate = {};
                const listTemp = data.list.map(l => ({temp: l.main.temp})); 
                console.log(listTemp);
                const iconDay =  data.list.map(l => ({icon: l.weather[0].icon}));
                console.log(iconDay);
                locDate.temp = Math.floor(data.list[0].main.temp);
                locDate.disc = data.list[0].weather[0].description;
                locDate.feel = data.list[0].main.feels_like;
                locDate.humidity = data.list[0].main.humidity;
                locDate.speed = data.list[0].wind.speed;
                locDate.icon = iconDay
                locDate.tempFut = listTemp;
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

