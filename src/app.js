const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');
//const axios = require('axios');


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title } = request.query;
  const result = title
  ? repositories.filter(repositorie => repositories.title.includes(title))
  : repositories;
  
  return response.json(result);
});

app.post("/repositories", (request, response) => {
  const { title, tech, urlRepo } = request.body;
  //const response = await axios.get(`http://api.github.com/repos/DenisMedeirosSDK/${urlRepo}`)
  
  const repositorie = {
    id: uuid(),
    title,
    tech,
    urlRepo
  };

  repositories.push(repositorie);
  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, tech } = request.body;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Repositorie not found' })
  }
  const repositorie = {
    id,
    title,
    tech
  }
  repositories[repositorieIndex] = repositorie;
  return response.json(repositorie);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return res.status(400).json({ error: 'Repositorie not found' })
  }
  repositories.splice(repositorieIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

});

module.exports = app;
