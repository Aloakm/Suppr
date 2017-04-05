import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class RecipeTile extends Component {
  constructor(props) {
    super(props);

    this.handleFavoriteSubmit = this.handleFavoriteSubmit.bind(this);
  }

  componentWillMount() {
    this.props.getFavorites(this.props.username);
  }

  handleFavoriteSubmit() {
    let favorite = {username: this.props.username, recipeId: this.props.recipe.id};
    this.props.postFavorite(favorite);
  }

  render() {
    const { id, recipeName, imageUrl, difficulty, cookTime, prepTime, servings } = this.props.recipe?this.props.recipe:'';
    const { username } = this.props.username?this.props.username:'';

    let favorited = this.props.favorites.data ? this.props.favorites.data.reduce((result, favorite) => {
      if (favorite.recipe_id === this.props.recipe.id) {
        result = true;
      }
      return result;
    }, false) : false;

    return (
      <div className="card-block">
        <div>
          <img src={imageUrl} alt="recipe image" />
        </div>
        <div>
          <div>
            <h2>{name}</h2>
            <img src="/assets/stars3.png" alt="rating" />
          </div>
          <div>
            <img src="http://i.imgur.com/6jr3M0j.png" alt="profile image" />
            <div>
              <p>{username}</p>
              <p># of recipes, # of followers</p>
            </div>
          </div>
          <div>
            <p>{cookTime}</p>
            <p>{prepTime}</p>

            <p>{servings}</p>
            <p>{difficulty}</p>
            <button
            className={favorited ? "btn btn-warning btn-sm" : "btn btn-success"}
            onClick={this.handleFavoriteSubmit}>
            {favorited ? "Unfavorite" : "Favorite"}
            </button>
            {favorited
              ? <p id="fadeout-text">Favorited!</p>
              : null}
          </div>
        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    recipe: state.recipes.selectedRecipe,
    username: state.auth.username,
    favorites: state.favorites
  }
}

export default connect(mapStatetoProps, actions)(RecipeTile)
  