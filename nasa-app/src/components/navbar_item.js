import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { logout } from '../actions/auth'

const NavbarItem = ({ auth: { isAuthenticated }, logout }) => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Navbar.Brand as={Link} to='/'>
				Home
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link as={Link} to='/register'>
						Register
					</Nav.Link>
					<Nav.Link as={Link} to='/login'>
						Login
					</Nav.Link>
					<Nav.Link as={Link} to='/nasagallery'>
						Gallery
					</Nav.Link>
					<Nav.Link as={Link} to='/listview'>
						ListView
					</Nav.Link>
					<Nav.Link as={Link} to='/profile'>
						MyProfile
					</Nav.Link>
					<Nav.Link as={Link} to='/library'>
						MyLibrary
					</Nav.Link>
					<Nav.Link onClick={logout} as={Link} to='/'>
						Logout
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

NavbarItem.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavbarItem);
