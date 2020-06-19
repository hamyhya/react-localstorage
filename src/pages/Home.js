import React, { Component } from 'react'
import { Row, Col, Form, Input, Button } from 'reactstrap'
import swal from 'sweetalert2'

export default class Home extends Component {
  constructor(props) {
    super(props)
    const userData = JSON.parse(localStorage.getItem(props.match.params.username))
    this.state = {
      name: userData.name,
      username: userData.username
    }
    console.log(this.state.username)
    this.goProfile = this.goProfile.bind(this)
    this.logoutAuth = this.logoutAuth.bind(this)
  }
  checkAuth() {
    if (!JSON.parse(localStorage.getItem('auth'))) {
      this.props.history.goBack()
      swal.fire({
        icon: 'warning',
        title: 'Wait!',
        text: 'Please login first'
      })
    }
  }
  goProfile() {
    this.props.history.push(`/profile/${this.state.username}`)
  }
  logoutAuth() {
    localStorage.removeItem('auth')
    this.props.history.push('/')
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
                <h3>Welcome, {this.state.name}</h3>
              </Col>
              <Col>
                <Button className='btn btn-register mt-5' onClick={this.goProfile}>Profile</Button>
                <Button className='btn btn-logout mt-2' onClick={this.logoutAuth}>Logout</Button>
              </Col>
            </Row>
          </div>
        </div>
      </>
    )
  }
}