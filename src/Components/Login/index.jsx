import React from "react";
import PropTypes from 'prop-types';
import LoginForm from './LoginForm'
class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            errors: {},
        }
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const user = await this.props.loginUser(this.state);
            this.props.setAuthUser(user)
            localStorage.setItem('user', JSON.stringfy(user))
            this.props.history.push('/')
        } catch (errors) {
            this.setState({ errors })
        }
    }
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (<LoginForm
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            errors={this.state.errors}
        />);
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
  setAuthUser: PropTypes.func.isRequired,
  history:PropTypes.func.isRequired,
};

export default Login;