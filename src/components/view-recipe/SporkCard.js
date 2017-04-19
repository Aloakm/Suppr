import React, { Component } from 'react';

class RecipeCard extends Component {
  render() {
    const {name, image, description} = this.props;
    return (
      <div className="card spork-card" style={{width: '19em', margin: '5px'}}>
  <img className="card-img-top" src={image} alt="Card caption" />
  <div className="card-block">
    <h5 className="card-title">{name}</h5>
    <p className="card-text" style={{wordWrap: 'break-word'}}>{description}</p>
  </div>
</div>
    )
  }
}

export default RecipeCard;
