import React, { PropTypes } from 'react';

import Avatar from '../resources/image/avatar';
import AvatarIco from '../resources/image/ico_list';
import UserInfo from '../resources/user/info';
import NewPost from '../resources/forms/post';
import Post from '../resources/post/post';
import NewComment from '../resources/forms/comment';
import Comment from '../resources/comment/comment';

import './style.scss'

export default class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {posts: this.props.data.posts,
                  comments: this.props.data.comments};
  }

  addContactGetPosts=(contact) => {
    this.setState({posts: contact})
  }
  addContactGetComments=(contact) => {
    this.setState({comments: contact});
  }

  render() {
    return (
      <div className="user-show">
        <div className="profile-static">
          < Avatar src={this.props.data.avatar} />
          <hr />
          <div className="friends">
            <p className="friends-h1">Friends<a>Show all</a></p>
            {(this.props.data.friends==undefined? [] : this.props.data.friends).map(function(friend, index) {
              return (
                < AvatarIco user={friend.user} img={friend.avatar} key={index} /> )}, this)}
          </div>
          <hr />
        </div>
        <div className="profile-activity">
          < UserInfo user={this.props.data.user} statistics={this.props.data.statistics} />
          < NewPost id={this.props.data.user.id}
                    addContactPosts={this.addContactGetPosts}
                    addContactComments={this.addContactGetComments} />
          {this.state.posts.map(function(post, index){
            return (
              <div key={(new Date()).getTime()+100*index}>
                < Post author={this.props.data.user}
                               img={this.props.data.avatar}
                               current={this.props.id==post.post.user_id}
                               src={post.img}
                               post={post.post}
                               addContactPosts={this.addContactGetPosts}
                               addContactComments={this.addContactGetComments}
                               key={post.post.id}/>
                {(this.state.comments[index]==undefined? [] : this.state.comments[index]).map(function(comment, index) {
                  return (
                    < Comment comment={comment.comment}
                              author={comment.user}
                              current={this.props.id==comment.user.id}
                              key={index}
                              img={comment.avatar}
                              addContactComments={this.addContactGetComments} /> )}, this)}
                < NewComment key={(new Date()).getTime()+index}
                             post_id={post.post.id}
                             id={this.props.id}
                             addContactComments={this.addContactGetComments} />
              </div>
            )}, this)}
        </div>
      </div>
    );
  }
};
