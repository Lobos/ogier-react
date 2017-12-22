import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { userLogin } from '../actions/user'

{% if sass %}
import _styles from '../styles/login.scss'
{% elseif less %}
import _styles from '../styles/login.less'
{% else %}
import '../styles/login.css'
{% endif %}

class Login extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      nickname: 'Demo',
      password: '111111',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { nickname, password } = this.state
    this.props.dispatch(userLogin(nickname, password))
    this.props.history.push('/')
  }

  handleCancel() {
    this.props.history.push('/')
  }

  handleInputChange(key, e) {
    this.setState({ [key]: e.target.value })
  }

  render() {
    const { nickname, password } = this.state

    return (
      <form
        {% if cssModule %}className={_styles.form}{% else %}className="form"{% endif %}
        {% raw %}style={{ marginTop: 40 }}{% endraw %}
        onSubmit={this.handleSubmit}
      >
        <div>
          <label>nickname: </label>
          <input
            type="text"
            value={nickname}
            onChange={this.handleInputChange.bind(this, 'nickname')}
          />
        </div>
        <div>
          <label>password: </label>
          <input
            type="password"
            value={password}
            onChange={this.handleInputChange.bind(this, 'password')}
          />
        </div>
        {% raw %}<div style={{ paddingLeft: 120 }}>{% endraw %}
          <button type="submit">Submit</button>
          <button type="button" onClick={this.handleCancel}>Cancel</button>
        </div>
      </form>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect()(Login)

