import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, FormControl } from 'rctui'
import { userLogin } from '../actions/user'

class Login extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleSubmit(data) {
    this.props.dispatch(userLogin(data.nickname, data.password))
    this.props.history.push('/')
  }

  handleCancel() {
    this.props.history.push('/')
  }

  render() {
    return (
      <Form
        style={{ marginTop: 40 }}
        buttons={{ submit: 'Submit', cancel: 'Cancel' }}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
      >
        <FormControl type="text" value="Demo" name="nickname" label="nickname" />
        <FormControl type="password" tip="" value="123456" name="password" label="password" />
      </Form>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

export default connect()(Login)
