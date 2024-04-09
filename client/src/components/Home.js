import React from 'react'
import styled from 'styled-components';

import './Home.css';
import HomePractice from './practice_sec/HomePractice';
import Carousell from './testimonials/Carousel';
import Subscriber from './tutor_subscriber/Subscriber';
import ProblemSetter from './tutor_subscriber/ProblemSetter';
const BoldText = styled.div`
    align-items: center;
    font-family: CrimsonText;
    font-size: large;
`;

function Home() {
    return (
        <div>
            <div className="container_1 ">
                <div className="text_1">
                    <h1>Take your learning </h1>
                    <h1>to the next level.</h1>
                </div>
                <div className="student_img">
                <img src={require('../assets/student.png')} alt="Student" />
                </div>
            </div>

            <div className="cont">
                <HomePractice></HomePractice>
            </div>
            <div>
                <BoldText>
                    <h1>Student Testimonials</h1>
                </BoldText>
                <Carousell></Carousell>
            </div>
            
            <div>
                <Subscriber></Subscriber>
            </div>
            <div>
                <ProblemSetter></ProblemSetter>
            </div>

        </div>
    );
  }
  
  export default Home;
  