import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class FollowTile extends Component {
  constructor(props) {
    super(props)
  }

  renderButtonCaption() {
    const { follows } = this.props.followList;
    if (follows && follows.some(follow => follow === this.props.user)) {
      return 'Unfollow'
    }
    return 'Follow'
  }

  handleFollowButton() {
    this.props.postFollow({ username: this.props.username, followName: this.props.user })
  }

  render() {
    const userLink = `/profile/${this.props.user}`
    return (
      <div className="col-md-4">
        <div className="well well-sm">
            <div className="media">
                <a className="thumbnail pull-left" href="#">
                    <img className="media-object" src="http://placehold.it/80" alt="placeholder" />
                </a>
                <div className="media-body">
                    <h4 className="media-heading">{this.props.user}</h4>
                <p><span className="label label-info">10 photos</span> <span className="label label-primary">89 followers</span></p>
                    <p>
                        <a href={userLink} className="btn btn-xs btn-default">View Profile</a>
                        <a href="#" className="btn btn-xs btn-default" onClick={this.handleFollowButton.bind(this)}>{this.renderButtonCaption()}</a>
                    </p>
                </div>
            </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { 
    userData: state.recipes.userRecipes,
    viewFollows: state.follows.dataForUser,
    username: state.auth.username,
    followList: state.follows.data,
    favorites: state.favorites.dataForUser
  }
}

export default connect(mapStateToProps, actions)(FollowTile);
