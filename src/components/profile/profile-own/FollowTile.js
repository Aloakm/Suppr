import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class FollowTile extends Component {
  componentWillMount() {
    this.props.getUserInfo(this.props.user)
    this.props.getProfileByUsername(this.props.user);
  }

  renderButtonCaption() {
    const { follows } = this.props.followList;
    if (follows && follows.some(follow => follow === this.props.user)) {
      return 'Unfollow';
    }
    return 'Follow';
  }

  renderInfo() {
    const { user } = this.props;
    if(this.props.info[user]) {
      const {favoritesCount, followersCount, followsCount, recipesCount, sporksCount} = this.props.info[user]
      return (
        <div className="author-stats-box">
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/salad.png" alt="Recipes" title="recipes"/>{recipesCount}</div>
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/spork.png" alt="Sporks" title="sporks"/>{sporksCount}</div>
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/follower.png" alt="Followers" title="followers"/>{followersCount}</div>
          <div className="inner-box-item"><img className="author-stats-icon" src="/assets/favorited.png" alt="Favorited count" title="likes"/>{favoritesCount}</div>
        </div>
      )
    }
  }

  handleFollowButton() {
    this.props.postFollow({ username: this.props.username, followName: this.props.user })
  }

  getProfilePic() {
    const { username } = this.props;
    if(this.props.profile[username] && this.props.profile[username].image) {
      return this.props.profile[username].image
    } else {
      return 'https://secure.gravatar.com/avatar/6e9387de9c9dfa657aa9b518d92e6871?d=https%3A//daks2k3a4ib2z.cloudfront.net/img/profile-user.png'
    }
  }

  render() {
    const userLink = `/profile/${this.props.user}`
    return (
      <div className="col-md-4">
        <div className="well well-sm">
            <div className="media">
                <a className="thumbnail pull-left profile-img-container" href="#">
                  <img className="media-object" src={this.getProfilePic.call(this)} alt="placeholder" style={{width:'75px', height:'75px'}}/>
                </a>
                <div className="media-body">
                  <h4 className="media-heading" style={{marginLeft: '15px'}}>{this.props.user}</h4>

                <p>{this.renderInfo()}</p>
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
    favorites: state.favorites.dataForUser,
    profile: state.profile,
    info: state.userInfo
  };
}

export default connect(mapStateToProps, actions)(FollowTile);
