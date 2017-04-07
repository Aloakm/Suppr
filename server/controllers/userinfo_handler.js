const db = require('../db/db');
const config = require('../config');
const Promise = require('bluebird');
const _ = require('lodash');
const query = Promise.promisify(db.query.bind(db));

exports.getUserInfo = function(req, res) {
  const { username } = req.query;
  if (!username) return res.status(422).send({ error: 'No username was given' });
  const getIdForName = name => `SELECT id from users WHERE username = "${name}"`;
  const findFavoritesQuery = `SELECT * from favorites WHERE user_id=(${getIdForName(username)});`
  const userRecipesQuery = `SELECT * FROM recipes WHERE recipes.user_id=(${getIdForName(username)});`
  const getFollowersQuery = `SELECT users.username from followers JOIN users ON followers.user_id = users.id WHERE follow_id=(${getIdForName(username)});`
  const getFollowsQuery = `SELECT users.username from followers JOIN users ON followers.follow_id = users.id WHERE user_id=(${getIdForName(username)});`
  console.log(findFavoritesQuery, userRecipesQuery, getFollowersQuery, getFollowsQuery)
  Promise.all([query(findFavoritesQuery), query(userRecipesQuery), query(getFollowersQuery), query(getFollowsQuery)])
    .then(([favorites, recipes, followers, follows]) => {
      res.status(200).send({
        favoritesCount: favorites.length,
        recipesCount: recipes.length,
        followersCount: followers.length,
        followsCount: follows.length
      })
    })
}