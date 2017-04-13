import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { CSSGrid, layout, makeResponsive, measureItems } from 'react-stonecutter';
import RecipeCard from '../landing/RecipeCard';

class SearchPage extends Component {
  renderCards() {
    return this.props.searchResults ? this.props.searchResults.map((recipe, i) => <li key={i}><RecipeCard recipe={recipe._source} key={i}/></li>) : ''
  }
  render() {
    const Grid = makeResponsive(measureItems(CSSGrid, { measureImages: true }), {
      maxWidth: 1920,
      minPadding: 0
    });
    const cards = this.renderCards.call(this);
    return (
      <div className="card-display">
        <Grid
          component="ul"
          columns={5}
          columnWidth={315}
          gutterWidth={5}
          gutterHeight={15}
          layout={layout.pinterest}
          duration={200}
          easing="ease-out"
        >
        {cards||<li></li>}
      </Grid>
    <div className="status"></div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return { username: state.auth.username, searchResults: state.search.searchResults };
}

export default connect(mapStateToProps, actions)(SearchPage);