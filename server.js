import fetch from "node-fetch";
import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
const host = "localhost";
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get(`/generation/:id`, async (req, res) => {
  const id = req.params.id;

  const gen = await fetch(`https://pokeapi.co/api/v2/generation/${id}/`);
  const generation = await gen.json();
  const allpokemons = generation.pokemon_species.map((pokemon) => {
    const parts = pokemon.url.split("/");
    const realid = parts[parts.length - 2];
    return {
      name: pokemon.name,
      pokemonid: realid,
    };
  });

  // const genword = generation.generation.name.split("-")[1];/*
  res.render("generation", { allpokemons, id });
});
app.get(`/pokemon/:id`, async (req, res) => {
  const id = req.params.id;
  const vastaus = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const pokemon = await vastaus.json();
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  res.render("pokemon", { pokemon, img });
});
app.listen(port, host, () => console.log(`${host}:${port} kuuntelee...`));
