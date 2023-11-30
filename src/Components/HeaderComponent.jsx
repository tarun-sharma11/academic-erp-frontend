import { Navbar } from 'react-bootstrap';

const HeaderComponent = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand >Organisations Management System</Navbar.Brand>
      {/* <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav> */}
    </Navbar>
  );
};
 
export default HeaderComponent;
