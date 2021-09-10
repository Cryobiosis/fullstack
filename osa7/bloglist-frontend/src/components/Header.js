import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutActionCreator } from '../reducers/loginReducer'
import {
  Link,
} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Header = () => {

  const dispatch = useDispatch()
  const handleLogout = async () => {
    // Redux
    dispatch(logoutActionCreator())
    window.location.reload(false)
  }

  // User data from redux
  const state = useSelector(state => state)
  const user = (state.login.length === 0) ? null : state.login.user

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">Blogs app</Navbar.Brand>
        <Nav defaultActiveKey="/" className="me-auto">
          <Nav.Item>
            <Nav.Link><Link to="/blogs">blogs</Link></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link><Link to="/users">users</Link></Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link> {user === null
              ? <Link to="/login">login</Link>
              :
              <p><strong>{user.name}</strong> <Button onClick={() => handleLogout()} type="submit"variant="primary">logout</Button>{' '}
              </p>
            }
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header