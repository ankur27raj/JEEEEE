import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: fit-content;
`;

const Title = styled.h3`
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
`;

const Timerr = styled.h3`
  color: #666;
  font-size: 18px;
  margin-bottom: 15px;
`;

function Timer({name,start}) {
  const [time, setTime] = useState(parseInt(start)*60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formatTime = val => (val < 10 ? `0${val}` : val);

  return (
    <Container>
    <Title>{name}</Title>
    <p>Time Remaining:</p>
    <Timerr>
      {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
    </Timerr>
  </Container>
  );
}

export default Timer;
