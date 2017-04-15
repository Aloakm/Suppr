import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import AuthorTile from '../AuthorTile';
import RecipeStats from './RecipeStats';
import _ from 'lodash';


class RecipeTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0
    }

    this.handleFavoriteSubmit = this.handleFavoriteSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.username) this.props.getFavorites(this.props.username);
    this.props.getUserInfo(this.props.recipe.username)
  }

  componentWillUpdate(nextProps) {
    if (!_.isEqual(this.props.reviews, nextProps.reviews)) {
      const score = Math.round( ( nextProps.reviews.reduce((acc, val) => { return acc + val.rating;}, 0) / nextProps.reviews.length ) * 10 ) / 10;
      this.setState({ score })
    }
  }

  handleFavoriteSubmit() {
    let favorite = {username: this.props.username, recipeId: this.props.recipe.id};
    this.props.postFavorite(favorite);
  }

  renderHeart() {
    let favorited = this.props.favorites.data.some(favorite => {
      return favorite.recipe_id === this.props.recipe.id
    })
    const src = favorited ? '/assets/favorited.png' : '/assets/unfavorited.png'
    if (!this.props.username) return <div></div>
    return (
      <div className="favorite-button" onClick={this.handleFavoriteSubmit}>
        <img className="favorite-image" src={src} alt=""/>
      </div>
    )
  }

  render() {
    const { name, image } = this.props.recipe;
    const url=`url("${image}")`
    return (
      <div className="flex-body">
        <div className="food-img" style={{backgroundImage:url}}>

          {this.renderHeart()}

        </div>
        <div className="recipe-header-container">
          <div className="recipe-title-box">
            <h6>{name}</h6>
            {/*<img className="rating-img" src="/assets/stars3.png" alt="rating" />*/}
            {/*<h6>{this.state.score}</h6>*/}
          </div>

          <AuthorTile username={this.props.recipe.username} />
          
          <RecipeStats />

        </div>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return {
    recipe: state.recipes.selectedVariation,
    username: state.auth.username,
    favorites: state.favorites,
    reviews: state.reviews.data
  }
}

export default connect(mapStatetoProps, actions)(RecipeTile)
  