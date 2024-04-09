import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 36%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  margin: 3rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
  display: flex;
  flex-direction: column;
`;
const CardLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align the logo to the left */
`;
const CardImage = styled.img`
  width: 25%;
  height: 37%;
  border-radius: 50%;
`;
const CardP = styled.p`
  font-weight: bolder;
  font-size: x-large;
`;


const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Center the description and rating */
  margin-bottom: 10px;
`;


const StarImage = styled.img`
  width: 15%;
  height: 15%;
  // margin-left: 1px;
`;
const RatingWala = styled.span`
  display:flex;
  justify-content: end;
  align-items:end;
`;



const CardButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff; /* blue */
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  
  &:hover {
    cursor: pointer;
    background-color: #0056b3; /* Darker Green */
    transform: scale(1.1); /* Increase size on hover */
  }
  
  &:focus {
    outline: none;
  }
`;

const PracCard = (props) => {
  return (
    <CardContainer>
      <CardLogo>
        <CardImage src={props.loc} alt="" />
        <CardP>{props.title}</CardP>
      </CardLogo>
      <p>{props.description}</p>
      <CardContent>
        <CardButton>Practice</CardButton>
        <RatingWala>
            <span>{props.rating}</span>
           <StarImage src={require('../../assets/rating.png')} alt="" />
        </RatingWala>
      </CardContent>
    </CardContainer>
  );
};

export default PracCard;
