import { Navbar, Nav, Container,NavDropdown,Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt,FaUsers } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../features/usersApiSlice';
import { logout } from '../features/authSlices';
import { adminLogout } from '../features/adminAuthSlice';
import { useAdminLogoutMutation } from '../features/adminApiSlice';


const Header = () => {
    const {userInfo} = useSelector((state)=>state.auth)
    const {adminInfo} = useSelector((state)=>state.adminAuth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();
    const [adminLogoutApiCall] = useAdminLogoutMutation();

    const logoutHandler = async()=>{
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }
    console.log("Admin Info:", adminInfo);

    const logoutAdmin = async(e)=>{
        try {
            await adminLogoutApiCall()
            dispatch(adminLogout());
            navigate('/admin/login')
        } catch (error) {
            console.error("Admin logout error:", error);

            
        }
    }

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {adminInfo ? (
                                 <NavDropdown title={adminInfo.name} id='adminMenu'>
                                 <NavDropdown.Item onClick={logoutAdmin}>
                                     Logout
                                 </NavDropdown.Item>
                                 <LinkContainer to='/admin/userList'>
                                     <NavDropdown.Item>
                                         Users
                                     </NavDropdown.Item>
                                 </LinkContainer>
                                 <LinkContainer to='/admin/newUser'>
                                     <NavDropdown.Item>Add User</NavDropdown.Item>
                                 </LinkContainer>
                             </NavDropdown>

                            ) : userInfo ? (
                                <>
                                  <NavDropdown title = {userInfo.name} id='username'>
                                   <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                  </NavDropdown>

                                </>
                            ):(
                            <>
                              <LinkContainer to='/login'>
                                <Nav.Link>
                                    <FaSignInAlt /> Sign In
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/register'>
                                <Nav.Link>
                                    <FaSignOutAlt /> Sign Up
                                </Nav.Link>
                            </LinkContainer>

                            </>

                            )}
                        

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;