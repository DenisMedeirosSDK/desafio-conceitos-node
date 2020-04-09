const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');
//const axios = require('axios');


const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, techs, url } = request.body;
  //const response = await axios.get(`http://api.github.com/repos/DenisMedeirosSDK/${urlRepo}`)

  const repository = {
    id: uuid(),
    title,
    techs,
    url,
    likes: 0,
  };

  repositories.push(repository);
  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, techs, url } = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(400).json({ error: 'Repositorie not found' })
  }
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  }
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex >= 0) {
    repositories.splice(repositoryIndex, 1);
  } else {

    return res.status(400).json({ error: 'Repositorie not found' })
  }

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(400).json({ error: 'Repositorie not found' })
  }
  repositories[repositoryIndex].likes++;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
