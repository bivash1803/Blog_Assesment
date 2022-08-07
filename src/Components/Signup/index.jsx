import React from "react";

import PropTypes from 'prop-types';
import SignUpForm from "./SignupForm";


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: {},
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("request initiated")


    try {
      const user = await this.props.registerUser(this.state);
      this.props.setAuthUser(user)
      // localStorage.setItem('user', JSON.stringfy(user))
      // this.props.history.push('/')
      // console.log('Success')
    }

    catch (errors) {
      console.log(errors)
      this.setState({ errors })
    }

  }
  render() {
    //console.log(this.state);
    return (
      <SignUpForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
      />

    );
  }
}
Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAuthUser: PropTypes.func.isRequired,
  // /history: PropTypes.func.isRequired
}

export default Signup;