import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const QuestionHeader = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: flex-start;
  margin-left: 7rem;
`;

const QuestionTypeMessage = styled.h3`
  font-weight: bold;
  color: #2e7d32;
  margin-bottom: 1rem;
`;

const QuestionStatement = styled.p`
  margin-bottom: 1rem;
  display: block;
  align-items: flex-start;
`;

const QuestionQuestion = styled.p`
  margin-bottom: 1rem;
  display: block;
  align-items: flex-start;
`;


const MarkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MarkImage = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const MarkTag = styled.span`
  margin-left: 5px;
  font-size: 14px;
  cursor: pointer;
`;


const OptionLabel = styled.label`
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-left: 7rem;
  margin-bottom: 8px;
  cursor: pointer;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TextArea = styled.textarea`
  width: 30%;
  padding: 10px;
  border: 1px solid #2e7d32;
  border-radius: 5px;
  margin-bottom: 1rem;
  margin-left: 7rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Button = styled.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin: 1rem;
  margin-left: 7rem;
  display: block;
  align-items: flex-start;

  &:hover {
    background-color: #1b5e20;
  }
`;

const CorrectAnswer = styled.div`
  width: 30%;
  margin-top: 1.2rem;
  padding: 0 1rem;
  border: 1px solid #2e7d32;
  border-radius: 5px;
  background-color: #e8f5e9;
  align-items: flex-start;
  margin-left: 7rem;
`;

const AnsPara = styled.p`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: large;
  margin: 1rem 0.7rem;
`;

const AnswerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem 0.7rem;
  font-weight: bold;
`;

const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1.5rem;
  margin-left: 7rem;
  font-weight: bold;
  font-size: large;
  color: green;
`;

const Fail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1.5rem;
  margin-left: 7rem;
  font-weight: bold;
  font-size: large;
  color: red;
`;



export {
  HeaderContainer,
  QuestionHeader,
  QuestionTypeMessage,
  QuestionStatement,
  QuestionQuestion,
  OptionLabel,
  TextArea,
  Button,
  CorrectAnswer,
  AnsPara,
  AnswerBox,
  Success,
  Fail,
  MarkContainer,
  MarkImage,
  MarkTag
};

