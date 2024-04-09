import React from 'react'
import styled from 'styled-components';
import PracCard from './Prac_Card';
const Cards = styled.div`
    display:flex;
    flex-direction: row;
    align-itmes: center;
    justify-content: space-between;
    width: 75%;
    margin: 0 auto;
`;

const BoldText = styled.div`
    align-items: center;
    font-family: CrimsonText;
    font-size: large;
`;
export default function HomePractice() {
  return (
    <div>
        <BoldText>
            <h1>Practice Problems</h1>
            <p>Dream big, work hard, and you will conquer the JEE sky!</p>
        </BoldText>

        <Cards>
            <PracCard
                loc={require('../../assets/phy_logo.png')}
                title={'Physics'}
                description={'babel-preset-react-app is part of the create-react-app project, which is not maintianed anymore It is thus unlikely that this bug willever be fixed. Add  to your devDependencies to work around this error. This will make this message go away'}
                rating={'4'}
            />
            
            <PracCard
                loc={require('../../assets/chem_logo.png')}
                title={'Chemistry'}
                description={'babel-preset-react-app is part of the create-react-app project, which is not maintianed anymore It is thus unlikely that this bug willever be fixed. Add  to your devDependencies to work around this error. This will make this message go away'}
                rating={'4.2'}
            />
            <PracCard
                loc={require('../../assets/math_logo.png')}
                title={'Mathematics'}
                description={'babel-preset-react-app is part of the create-react-app project, which is not maintianed anymore It is thus unlikely that this bug willever be fixed. Add  to your devDependencies to work around this error. This will make this message go away'}
                rating={'4.7'}
            />
        </Cards>
    </div>
  )
}
