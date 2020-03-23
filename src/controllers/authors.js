'use strict';
const AuthorUsers = require('./../services/authors');

let modals, authorAdaptor;

class AuthorsController {
  constructor(modal) {
    authorAdaptor = new AuthorUsers(modal);
    modals = modal;
  }

  //authenticate api
  static async authenticate(req) {
    try {
      return await authorAdaptor.AuthenticateUser(req);
    } catch(e){
      console.log(e);
    }
  }

  //register users api
  static async register(req) {
    try {
      return await authorAdaptor.CreateUser(req);
    } catch(e){
      console.log(e);
    }
  }

  //update users api
  static async modify(req) {
    try {
      return await authorAdaptor.UpdateUser(req);
    } catch(e){
      console.log(e);
    }
  }

  //delete users api
  static async delete(req) {
    try {
      return await authorAdaptor.DeleteUser(req);
    } catch(e){
      console.log(e);
    }
  }
}

module.exports = AuthorsController;
