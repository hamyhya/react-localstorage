import React, { Component } from 'react'
import { Row, Col, Form, Input, Button } from 'reactstrap'
import swal from 'sweetalert2'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.loginAuth = this.loginAuth.bind(this)
  }
	handlerChange = (e) =>{
		this.setState({[e.target.name]: e.target.value})
  }
  loginAuth() {
    const username = this.state.username
    const password = this.state.password
    if (username === '' && password === '') {
      swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Please fill the form!'
      })
    } else {
      if (JSON.parse(localStorage.getItem(username))) {
        const data = JSON.parse(localStorage.getItem(username))
        if (username === data.username && password === data.password) {
          localStorage.setItem('auth', JSON.stringify(username))
          this.props.history.push(`/welcome/${username}`)
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Incorrect data!'
          })
        }
      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'User not registered!'
        })
      }
    }
    }
  checkAuth() {
    if (JSON.parse(localStorage.getItem('auth'))) {
      swal.fire({
        icon: 'warning',
        title: 'Wait!',
        text: 'Please logout first'
      })
      this.props.history.goBack()
    }
  }
  componentDidMount(){
    this.checkAuth()
  }
  render() {
    return(
      <>
        <div className='register-bg d-flex justify-content-center align-items-center'>
          <div className='login-wrapper'>
            <Row className='d-flex flex-column p-3'>
              <Col>
                <h3>Login</h3>
              </Col>
              <Col>
                <Form>
                  <Input className='mt-1' type='text' name='username' onChange={this.handlerChange} placeholder='Username' />
                  <Input className='mt-1' type='password' name='password' onChange={this.handlerChange} placeholder='Password' />
                    <Button className='btn btn-register mt-2' onClick={this.loginAuth}>Login</Button>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </>
    )
  }
}