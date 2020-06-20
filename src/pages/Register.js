import React, { Component } from 'react'
import { Row, Col, Form, Input, Button } from 'reactstrap'
import swal from 'sweetalert2'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      username: '',
      email: '',
      phone: '',
      address: '',
      password: ''
    }
    this.registerStore = this.registerStore.bind(this)
  }
	handlerChange = (e) =>{
		this.setState({[e.target.name]: e.target.value})
  }
  registerStore() {
    const { name, username, email, phone, address, password } = this.state
    // [{
    //   name: this.state.name,
    //   username: this.state.username,
    //   email: this.state.email,
    //   phone: this.state.phone,
    //   address: this.state.address,
    //   password: this.state.password
    // }]
    if (!((this.state.name === '') || (this.state.username === '') || (this.state.password === ''))) {
      if ((this.state.password.match(/^(?=.*[0-9a-zA-Z][!@#$%^&*])[0-9a-zA-Z!@#$%^&*]/))  && this.state.password.length > 8) {
          if(JSON.parse(localStorage.getItem(this.state.username))) {
            swal.fire({
              icon: 'error',
              title: 'Ouch!',
              text: 'Username has been taken!'
            })
          } else {
            localStorage.setItem(this.state.username, JSON.stringify({name, username, email, phone, address, password}))
            this.props.history.push('/login')
          }
      } else {
        swal.fire({
          icon: 'error',
          title: 'Ouch!',
          text: 'Password must contain char, number and > 8 length!'
        })  
      }
    } else {
      swal.fire({
        icon: 'error',
        title: 'Ouch!',
        text: 'Please fill the form'
      })
    }
  }
  checkAuth() {
    if (JSON.parse(localStorage.getItem('auth'))) {
      this.props.history.goBack()
      swal.fire({
        icon: 'warning',
        title: 'Wait!',
        text: 'Please logout first'
      })
    }
  }
  componentDidMount() {
    this.checkAuth()
  }
  render() {
    return(
      <>
        <div className='register-bg d-flex justify-content-center align-items-center'>
          <div className='form-wrapper'>
            <Row className='d-flex flex-column p-3'>
              <Col>
                <h3>Register</h3>
              </Col>
              <Col>
                <Form>
                  <Input className='mt-1' type='text' name='name' onChange={this.handlerChange} placeholder='Your Name' />
                  <Input className='mt-1' type='text' name='username' onChange={this.handlerChange} placeholder='Username' />
                  <Input className='mt-1' type='email' name='email' onChange={this.handlerChange} placeholder='you@mail.com' />
                  <Input className='mt-1' type='text' name='phone' onChange={this.handlerChange} placeholder='Phone Number' />
                  <Input className='mt-1' type='text' name='address' onChange={this.handlerChange} placeholder='Address' />
                  <Input className='mt-1' type='password' name='password' onChange={this.handlerChange} placeholder='Password' />
                    <Button className='btn btn-register mt-2' onClick={this.registerStore}>Register</Button>
                    <Button className='btn btn-register mt-2' onClick={() => this.props.history.push('/login')}>Login</Button>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </>
    )
  }
}