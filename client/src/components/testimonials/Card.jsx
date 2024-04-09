import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CardImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const StarImage = styled.img`
  width: 20px;
  height: 20px;
  // margin-left: auto;
`;

const RatingContainer = styled.span`
  display: flex;
  align-items: center;
`;

const Card = ({ comment, rating, avatar, username, address }) => {
  return (
    <CardContainer>
      <CardImage src={require("../../assets/quotes.jpg")} alt="" />
      <p>{comment}</p>
      <RatingContainer>
        <span>{rating}</span>
        <StarImage src={require("../../assets/rating.png")} alt="" />
      </RatingContainer>
      <CardContent>
        <AvatarImage src={avatar} alt="" />
        <p>{username}</p>
      </CardContent>
      <p>{address}</p>
    </CardContainer>
  );
}

export default Card;