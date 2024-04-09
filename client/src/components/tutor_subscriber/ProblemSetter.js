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

const ProblemSetter = () => {
    return (
        <Container>
            <TextContainer>
                <Title>Contribute A Problem</Title>
                <Paragraph> Share your brilliance, contribute a problem, and together, </Paragraph>
                <Paragraph>we’ll elevate the learning experience for all.</Paragraph>
                <Button>Add A Problem</Button>
            </TextContainer>
            <ImageContainer>
                <ProImg src={require("../../assets/tutor.png")} alt="" />
            </ImageContainer>
        </Container>
    );
};

export default ProblemSetter;
