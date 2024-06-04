import React, { useState } from 'react'

const Answer = ({questions,answers}) => {
  const [score,setScore] =useState(0);
  questions.map((question,index)=>{
    if(answers[question._id]) {
      if(question.kind==="A") {
        if(answers[question._id]==question.answer) setScore((prevScore)=>(prevScore+4))
        else setScore((prevScore)=>(prevScore-1))
      }
      else if(question.kind==="B") {
        const arr1 = question.answer.split("/").map(item => item.trim()).sort();
        const arr2 = answers[question._id].sort();
        if(arr1===arr2) setScore((prevScore)=>(prevScore+4));
        else setScore((prevScore)=>(prevScore-1))
      }
      else {
        let a=parseFloat(answers[question._id]),b=parseFloat(question.answer);
        if(Math.abs(a-b)<=0.1) setScore((prevScore)=>(prevScore+4));
        else setScore((prevScore)=>(prevScore-1));
      }
    }
  })
  return (
    <div>
      <h1>Your Score is : {score}</h1>
    </div>
  )
}

export default Answer