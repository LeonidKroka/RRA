import React, { PropTypes } from 'react';
import './style.scss'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '',
                  password: '',
                  checked: false,
                  error: ''};
  }

  emailChange = (event) => {
    this.setState({ email: event.target.value });
  }
  passwordChange = (event) => {
    this.setState({ password: event.target.value });
  }
  check = (event) => {
    this.setState({ checked: !(this.state.checked) });
  }
  handleLogin = (event) => {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: '/login',
      data: {'email': this.state.email,
             'password': this.state.password,
             'remember_me': (this.state.checked? '1' : '0')},
      success: (response) => {
        response.status==true ? this.props.addContactUser(response.user) : this.setState({error: "Invalid email/password"})
        response.status==true ? this.props.addContactId(String(response.user.id)) : ''
      },
    })
  }
  render() {
    return (
      <form className="login-form" data-remote="true">
        <input placeholder="Email" autoFocus="autofocus" ref='email' type="text" onChange={this.emailChange}/><br/>

        <input placeholder="Password" type="password" ref='password' onChange={this.passwordChange}/><br/>

        <input type="checkbox" value="1" className="session_remember_me" onClick={this.check}/>
        <label className="remember-label" ref='remember_me' onClick={this.check}>Remember me</label><br/>

        <p className="error">{this.state.error}</p>
        <button name="button" onClick={this.handleLogin}>Log in</button>
      </form>
    );
  }
};
