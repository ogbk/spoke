const { Router } = require('express');
const path = require('path');

const home = Router();

const PROFILES = require('../../assets/profiles.json');

home.get('/:id', (request, response) => {
  const { id: inputId } = request.params;
  const profile = PROFILES.find(({ id }) => (id === inputId));

  if (!profile) {
    return (response.status(404).send('Profile with given ID not found'));
  }

  return (response.send(profile));
});

home.get('/img/:id', (request, response) => {
  const { id: inputId } = request.params;
  const profile = PROFILES.find(({ id }) => (id === inputId));

  if (!profile) {
    return (response.status(404).send('Profile with given ID not found'));
  }

  return (
    response.sendFile(
      path.resolve(
        __dirname,
        '../../assets/img',
        `${request.params.id}.jpg`,
      ),
    )
  );
});

module.exports = home;
