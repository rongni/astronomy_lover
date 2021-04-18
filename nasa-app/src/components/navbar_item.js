import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarItem = () => {
	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Navbar.Brand as={Link} to='/'>
				Home
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
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
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavbarItem;
