import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { UserStatus } from './actions/user'
import Login from './components/Login'

class App extends PureComponent {
  render() {
    const { user } = this.props

    return (
      <Router>
        <div className="App">
          Hello, {user.info.nickname}.
          {
            user.status === UserStatus.NEED_LOGIN &&
            <span>You need to <Link to="/login">login</Link></span>
          }
          <div>
            <Route path="/login" component={Login} />
          </div>
        </div>
      </Router>
    )
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(App)
