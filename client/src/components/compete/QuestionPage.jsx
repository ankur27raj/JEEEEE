import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import {
  StyledButton,
  ButtonContainer,
  QuestionsContainer,
  QuestionItem,
  Statement,
  OptionsContainer,
  OptionLabel,
  OptionInput,
  QuestionText,
  AnswerTextarea,
  ContainerRight,
  Button,
} from './QuestionPageCss';
import Timer from './Timer';

const QuestionPage = () => {
  const location = useLocation();
  const { ques,name,start } = location.state;
  const [questions, setQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [question, setQuestion] = useState({});
  const [subjects, setSubjects] = useState([[], [], []]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [page, setPage] = useState(0);
  const [allSubject,setAllSubject] = useState([]);

  useEffect(() => {
    const concatenatedSubjects = subjects.flatMap(item => item);
    setAllSubject(concatenatedSubjects);
  }, [subjects]);

  const handleOptionChange = (e, questionId) => {
    const { type, value, checked } = e.target;

    setSelectedOptions(prevFormData => {
        const updatedOptions = { ...prevFormData };
        if (type === "radio") {
            updatedOptions[questionId] = value;
        } else {
            updatedOptions[questionId] = updatedOptions[questionId] || [];
            if (checked) {
                updatedOptions[questionId] = [...updatedOptions[questionId], value];
            } else {
                updatedOptions[questionId] = updatedOptions[questionId].filter(option => option !== value);
            }
        }

        return updatedOptions;
    });
};

const handlePage = (num) =>{
  if(num) setPage(page+1);
  else setPage(page-1);
}

const handleButtonPage=(index)=>{
  let a=subjects[0].length,b=subjects[1].length;
  if(index>=a+b) {
    setSelectedSubject(subjects[2]);
    setPage(index-a-b);
  }
  else if(index>=a) {
    setSelectedSubject(subjects[1]);
    setPage(index-a);
  }
  else {
    setSelectedSubject(subjects[0]);
    setPage(index);
  }
}

useEffect(() => {
  setQuestion(selectedSubject[page])
}, [selectedSubject,page]);

  const fetchRes = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/getProblem/${id}`);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching question:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const fetchedQuestions = await Promise.all(ques.map(id => fetchRes(id[0])));
      const validQuestions = fetchedQuestions.filter(question => question !== null);
      setQuestions(validQuestions);
    };
    fetchQuestions();
  }, [ques]);


  useEffect(() => {
    const updatedSubjects = [[], [], []];
    questions.forEach(question => {
      const subjectIndex = ['Physics', 'Chemistry', 'Maths'].indexOf(question.tags[1].charAt(0).toUpperCase() + question.tags[1].slice(1).toLowerCase());
      if (subjectIndex !== -1) {
        updatedSubjects[subjectIndex].push(question);
      }
    });
    setSubjects(updatedSubjects);
    setSelectedSubject(updatedSubjects[0]);
  }, [questions]);

  const handleSubjectClick = (subjectIndex) => {
    setSelectedSubject(subjects[subjectIndex]);
    setPage(0);
  };

  return (
    <div>
      <ButtonContainer>
        <StyledButton color="#4caf50" onClick={() => handleSubjectClick(0)}>Physics</StyledButton>
        <StyledButton color="#2196f3" onClick={() => handleSubjectClick(1)}>Chemistry</StyledButton>
        <StyledButton color="#ff9800" onClick={() => handleSubjectClick(2)}>Maths</StyledButton>
      </ButtonContainer>
      <QuestionsContainer>
        <QuestionItem>
        {question && (
          <>
            <Statement>{question.statement}</Statement>
            <QuestionText>{question.question}</QuestionText>
            {question.kind === "A" && (
              <OptionsContainer>
                  {question.option.map((opt, id) => (
                      <div key={id}>
                          <OptionLabel>
                              <OptionInput
                                  type="radio"
                                  name={`ques-${question._id}`}
                                  value={String.fromCharCode(65 + id)}
                                  checked={selectedOptions[question._id] === String.fromCharCode(65 + id)}
                                  onChange={(e) => handleOptionChange(e, question._id)}
                                  />
                              {opt}
                          </OptionLabel>
                      </div>
                  ))}
              </OptionsContainer>
            )}
            {question.kind === "B" && (
              <OptionsContainer>
                {question.option.map((opt, id) => (
                  <div key={id}>
                    <OptionLabel>
                      <OptionInput
                        type="checkbox"
                        name={`ques-${question._id}`}
                        value={String.fromCharCode(65 + id)}
                        checked={(selectedOptions[question._id] || []).includes(String.fromCharCode(65 + id))}
                        onChange={(e) => handleOptionChange(e, question._id)}
                      />
                      {opt}
                    </OptionLabel>
                  </div>
                ))}
              </OptionsContainer>
            )}
            {question.kind === "C" && (
              <AnswerTextarea
                rows="2"
                cols="20"
                placeholder="Enter your answer..."
                name={`ques-${question._id}`}
                value={selectedOptions[question._id] || ''}
                onChange={(e) => setSelectedOptions({ ...selectedOptions, [question._id]: e.target.value })}
              />
            )}
          </>
        )}
      {
        (page > 0 && (
          <StyledButton color="#4caf50" onClick={() => handlePage(0)}>Previous</StyledButton>
        ))
      }
      {
        (page < selectedSubject.length - 1 && (
          <StyledButton color="#4caf50" onClick={() => handlePage(1)}>Next</StyledButton>
        ))
      }
        </QuestionItem>
      </QuestionsContainer>
      <ContainerRight top="100px" right="90px">
        <Timer name={name} start={start}/>
      </ContainerRight>
      <ContainerRight top="330px" right="100px">
        {allSubject.map((ques, index) => (
          <Button
          style={{ backgroundColor: selectedOptions[ques._id] ? '#3af049' : '#87CEEB' }}
          key={index + 1}
          onClick={()=>handleButtonPage(index)}
        >
          {index + 1}
      </Button>
      ))}
    </ContainerRight>
    </div>
  );
};


export default QuestionPage;
