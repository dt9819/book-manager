const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./../config');
const moment = require('moment');

class AuthorService {
  constructor(modals) {
    this.modals = modals;
  }

  //authenticate author user
  async AuthenticateUser(req){
    let { uname, pass} = req.body;
    let user = await this.modals.authors.findOne({where:{ email: uname }});
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password } = user.toJSON();
      const token = jwt.sign({
        id: user.id,
        name: user.full_name,
        email: user.email,
      }, config.jwt_secret, { expiresIn: '24h' });
      console.log(token);
      return {
        token
      };
    }
  }

  //register user
  async CreateUser(req){
    let { full_name, email, pass } = req.body;
    let userExist = await this.modals.authors.findOne({where:{ email}});
    if (userExist === null) {
      const user = await this.modals.authors.create({
        full_name,
        email,
        password: bcrypt.hashSync(pass, 10)
      });
      return JSON.parse(JSON.stringify(user));
    }
    return `${email} already exists. Please try another.`;
  }

  //update user
  async UpdateUser(req){
    let { full_name, uname, pass } = req.body;
    let { author_id }= req.params;
    let userExist = await this.modals.authors.findOne({where:{ id: author_id }});

    if(userExist !== null){
      const user = await this.modals.authors.update({
        full_name,
        username: uname,
        password: bcrypt.hashSync(pass, 10)
      }, {
        where: {
          id: author_id,
        },
      });
      return JSON.parse(JSON.stringify(user));
    }
    return `${uname} doesn't exists. Please check.`;

  }

  //delete user
  async DeleteUser(req){
    let { user_id }= req.params;
    let userExist = await this.modals.authors.findOne({where:{ id: user_id }});

    if(userExist !== null){
      const user = await this.modals.authors.destroy({
        where: { id: user_id },
      });
      return JSON.parse(JSON.stringify(user));
    }
    return `User doesn't exists. Please check.`;
  }
}

module.exports = AuthorService;
