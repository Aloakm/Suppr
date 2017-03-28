const db = require('../db/db');
const jwt = require('jwt-simple');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

db.connect(err => console.log('DB Connected'));

function generateToken(user) {
  const timeStamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
}

exports.signin = function (req, res, next) {
  res.send({ token: generateToken(req.user) });
};

exports.signup = function (req, res, next) {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    return res.status(422).send({ error: 'You must provide email, username and password' });
  } 
  const usernameQuery = `SELECT * from users WHERE username = "${username}";`
  const emailQuery = `SELECT * from users WHERE email = "${email}";`
  const query = Promise.promisify(db.query.bind(db))
  Promise.all([query(emailQuery), query(usernameQuery)]).then((results) => {
    console.log(results[0])
    if (results[0].length) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    if (results[1].length) {
      return res.status(422).send({ error: 'Username is in use' });
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(password, salt, null, (err, hash) => {
        const saveUserQuery = `INSERT INTO users(email, username, password) VALUES("${email}", "${username}", "${hash}");`
        query(saveUserQuery).then(result => {
          res.status(200).json({ token: generateToken(result) });
        })
      });
    });
    
  })
  
};