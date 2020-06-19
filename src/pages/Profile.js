import React, { Component } from 'react'
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap'
import swal from 'sweetalert2'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    const data = JSON.parse(localStorage.getItem(props.match.params.username))
    this.state = {
      showModal: false,
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
  handlerChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  logoutAuth() {
    localStorage.removeItem('auth')
    this.props.history.push('/')
  }
  toggleModal = (e) => {
    e.preventDefault()
    this.setState({showModal: !this.state.showModal})
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
  editProfile = (e) => {
    const data = {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address
    }
    localStorage.setItem(this.state.username, JSON.stringify(data))
    this.setState({showModal: !this.state.showModal})
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
              <Button className='btn btn-edit mt-2' onClick={this.toggleModal}>Edit Profile</Button>
              <Button className='btn btn-logout mt-2' onClick={this.logoutAuth}>Logout</Button>
            </div>
          </div>
          
          {/* MODAL */}
          <Modal isOpen={this.state.showModal}>
            <ModalHeader>Modal title</ModalHeader>
            <ModalBody>
              <Form>
                <Input className='mt-2' name='name' value={this.state.name} onChange={this.handlerChange}/>
                <Input className='mt-2' name='email' value={this.state.email} onChange={this.handlerChange}/>
                <Input className='mt-2' name='phone' value={this.state.phone} onChange={this.handlerChange}/>
                <Input className='mt-2' name='address' value={this.state.address} onChange={this.handlerChange}/>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="warning" onClick={this.editProfile}>Edit</Button>
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </>
    )
  }
}