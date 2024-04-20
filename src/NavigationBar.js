import React from 'react';
import styled from 'styled-components';

const Navbar = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 10px;
`;

const NavItem = styled.a`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const NavigationBar = () => {
  return (
    <Navbar>
      <NavItem href="/">Home</NavItem>
      <NavItem href="/about">About</NavItem>
      <NavItem href="/services">Services</NavItem>
      <NavItem href="/contact">Contact</NavItem>
      <NavItem href="/account">Account</NavItem>
    </Navbar>
  );
};

export default NavigationBar;
