import React, { PropTypes } from 'react';
import './style.scss'

export default class NewUser extends React.Component {
  render() { return ( <Add /> ); }
};

var User = React.createClass({
  getInitialState: function() {
    return {
      name: '',
      surname: '',
      gender: '',
      email: '',
      password: '',
      password_confirmation: ''
    };
  },

  fieldChange: function(name, event) {
    this.setState({ [''+name]: event.target.value });
  },
  radioClick: function(event) {
    this.setState({ 'gender': event.target.value });
  },
  handleSend: function(event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: '/users',
      data: {'name': this.state.name,
             'surname': this.state.surname,
             'gender': this.state.gender,
             'email': this.state.email,
             'password': this.state.password,
             'password_confirmation': this.state.password_confirmation,},
      success: (response) => { console.log('it worked!', response)
       this.setState({email: response['error'][0]})
       alert(this.state.email)},
    })
  },

  render: function() {
    return (
      <div className="registration">
        <form data-remote="true">
          <input placeholder="Your name" autoFocus="autofocus" type="text" onChange={this.fieldChange(this, 'name')} /><br/>
          <input placeholder="Your surname" autoFocus="autofocus" type="text" onChange={this.fieldChange(this, 'surname')} /><br/>
          <input type="radio" name="gender" value="male" onClick={this.radioClick} /> Male
          <input type="radio" name="gender" value="female" onClick={this.radioClick} /> Female<br>
          <input placeholder="Your email" autoFocus="autofocus" type="text" onChange={this.fieldChange(this, 'email')} /><br/>

          <input placeholder="Your password" type="password" onChange={this.fieldChange.bind(this, 'password')} /><br/>
          <input placeholder="Confirm password" type="password" onChange={this.fieldChange(this, 'password_confirmation')} /><br/>

          <button name="button" onClick={this.handleSend}>It's ok!</button>
        </form>
      </div>
    );
  },
});
