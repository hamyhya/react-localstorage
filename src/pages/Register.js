import React, { Component } from 'react'
import { Row, Col, Form, Input, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

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
  }
	handlerChange = (e) =>{
		this.setState({[e.target.name]: e.target.value})
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
                  <Link to={{
                    pathname: `/welcome/${this.state.username}`,
                    state: {
                      name: `${this.state.name}`,
                      username: `${this.state.username}`,
                      email: `${this.state.email}`,
                      phone: `${this.state.phone}`,
                      address: `${this.state.address}`,
                      password: `${this.state.password}`
                    }
                  }}>
                    <Button className='btn btn-register mt-2'>Register</Button>
                  </Link>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </>
    )
  }
}