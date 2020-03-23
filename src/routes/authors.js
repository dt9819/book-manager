'use strict';
const Success = require('./../utils/success');
const Controller = require('./../controllers/authors');
const auth = require('../middleware/verifyToken');

module.exports = (router, modals) => {

  const varController = new Controller(modals);
  if (varController) {
    //authenticate author users
    router.post('/author/authenticate', async (req, res) => {
      try {
        const data = await Controller.authenticate(req);
        return Success.send(req, res, 200, data);
      } catch (e) {
        console.log(e);
        return Success.send(req, res, 200, []);
      }
    });

    //register author users
    router.post('/author/register', async (req, res) => {
      try {
        const data = await Controller.register(req);
        return Success.send(req, res, 200, data);
      } catch (e) {
        console.log(e);
        return Success.send(req, res, 200, []);
      }
    });

    //update author user registration data
    router.put('/author/:author_id/update', auth, async (req, res) => {
      try {
        const data = await Controller.modify(req);
        return Success.send(req, res, 200, data);
      } catch (e) {
        console.log(e);
        return Success.send(req, res, 200, []);
      }
    });

    //delete author users
    router.delete('/author/:author_id/delete', auth, async (req, res) => {
      try {
        const data = await Controller.delete(req);
        return Success.send(req, res, 200, data);
      } catch (e) {
        console.log(e);
        return Success.send(req, res, 200, []);
      }
    });

  }
};

