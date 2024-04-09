import React from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
    margin-top: 2rem;
    background-color: #fffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const ImageContainer = styled.div`
    
`;

const ProImg = styled.img`
    width: 100%;
    height: 60vh;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #333;
    font-family: CrimsonText;
`;

const Title = styled.h1`
    font-size: xx-large;
`;

const Paragraph = styled.p`
    font-size: large;
    margin: 0.2rem;
`;

const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    margin-top: 3rem;
    padding: 0.7rem 3.5rem; /* Increased button size */
    border: none;
    border-radius: 1rem; /* Increased button border radius */
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: large;
    font-weight: bolder;
    &:hover {
        background-color: #0056b3;
    }
`;

const Subscriber = () => {
    return (
        <Container>
            <ImageContainer>
                <ProImg src={require("../../assets/prostudent.png")} alt="" />
            </ImageContainer>
            <TextContainer>
                <Title>Get JEEEEE Pro</Title>
                <Paragraph>Unlock your full potential with our Pro subscription!</Paragraph>
                <Paragraph>Gain access to exclusive JEE practice material and personalized tests.</Paragraph>
                <Button>Go Pro</Button>
            </TextContainer>
        </Container>
    );
};

export default Subscriber;
