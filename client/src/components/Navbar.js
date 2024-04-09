import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: white;
  color: black;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-family:CrimsonText;
`;

const Logo = styled.h1`
  margin: 0;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  margin-right: 20px;
`;

const NavItem = styled.li`
  margin-right: 30px;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>JEEEEE</Logo>
      <NavContainer>
        <NavList>
          <NavItem>Practice</NavItem>
        </NavList>
        <NavList>
          <NavItem>Compete</NavItem>
        </NavList>
        <NavList>
          <NavItem>Login/Singup</NavItem>
        </NavList>
      </NavContainer>
    </NavbarContainer>
  );
}

export default Navbar;