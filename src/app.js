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
  const { title, techs, urlRepo, likes } = request.body;
  //const response = await axios.get(`http://api.github.com/repos/DenisMedeirosSDK/${urlRepo}`)

  const repository = {
    id: uuid(),
    title,
    techs,
    urlRepo,
    likes: 0,
  };

  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, tech } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repositorie not found' })
  }
  const repository = {
    id,
    title,
    tech,
    likes: repositories[repositoryIndex].likes,
  }
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({ error: 'Repositorie not found' })
  }
  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  repositories[repositoryIndex].likes += 1;

  return response.json(repositories);
});

module.exports = app;
