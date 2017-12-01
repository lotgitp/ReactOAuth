import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actionLogin } from '../../../store/user'
import './HomeView.scss'

class HomeView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: 'admin@test.com',
      password: 'testpass',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, type) {
    e.preventDefault();

    this.setState({
      [type]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.dispatch(actionLogin(this.state.email, this.state.password));
  }

  renderLoginForm() {
    return (
      <div>
        {(this.props.user && this.props.user.status === 401) && (
          <h5>{this.props.user.detail}</h5>
        )}
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              value={this.state.email}
              onChange={(e) => this.handleChange(e, 'email')}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              value={this.state.password}
              onChange={(e) => this.handleChange(e, 'password')}
            />
          </label>
          <input
            type='submit'
            value='Submit'
          />
        </form>
      </div>
    )
  }

  render() {
    if (this.props.user && this.props.user.user_id) {
      return <h4>Welcome! You are logged in now.</h4>
    }

    return this.renderLoginForm()
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(HomeView)
