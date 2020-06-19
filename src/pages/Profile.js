import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'
import swal from 'sweetalert2'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    const data = JSON.parse(localStorage.getItem('userData'))
    this.state = {
      username: data.username,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      password: data.password,
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/160528_U%ED%81%B4%EB%A6%B0%EC%BD%98%EC%84%9C%ED%8A%B8_%EC%8B%9C%ED%81%AC%EB%A6%BF_%EC%86%A1%EC%A7%80%EC%9D%80_%281%29.jpg'
    }
    this.logoutAuth = this.logoutAuth.bind(this)
    this.goHome = this.goHome.bind(this)
  }
  logoutAuth() {
    localStorage.removeItem('userData')
    localStorage.removeItem('auth')
    this.props.history.push('/')
  }
  goHome() {
    this.props.history.push(`/welcome/${this.state.username}`)
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
  componentDidMount() {
    this.checkAuth()
  }
  render() {
    return(
      <>
        <div className='register-bg d-flex justify-content-center align-items-center'>
          <div className='profile-wrapper p-3'>
            <div className='d-flex'>
              <div className='profile-header'>
                <img src={this.state.image} alt="profile" />
              </div>
              <div className='ml-3 mt-3'>
                <h4>{this.state.name}</h4>
                <h6>{this.state.address}</h6>
              </div>
            </div>
            <hr/>
            <div>
              <h5>Your Profile</h5>
              <Table bordered>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{this.state.name}</td>
                  </tr>
                  <tr>
                    <th>Username</th>
                    <td>{this.state.username}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{this.state.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{this.state.phone}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div>
              <Button className='btn btn-register' onClick={this.goHome}>Home</Button>
              <Button className='btn btn-edit' onClick={this.goHome}>Edit Profile</Button>
              <Button className='btn btn-logout mt-2' onClick={this.logoutAuth}>Logout</Button>
            </div>
          </div>
        </div>
      </>
    )
  }
}