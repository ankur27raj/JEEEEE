import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  text-align: center;
  // position: fixed;
  bottom: 0;
  width: 100%;
`;

const FooterText = styled.span`
  display: inline-block;
  margin-bottom: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        <h3 style={{ display: 'inline', margin: '0' }}>JEEEEE</h3>
        &nbsp;&nbsp;&nbsp;&copy; Copyright.
      </FooterText>
      <p>All Rights Reversed</p>
    </FooterContainer>
  );
}

export default Footer;