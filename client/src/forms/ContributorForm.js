import React from 'react';
import { useState,useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import './ContributorForm.css';


const animatedComponents = makeAnimated();

const ContributorForm = () => {
    const [formData, setFormdata] = useState({});
    const [type, setType] = useState(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormdata((prevFormData) => ({ ...prevFormData, [name]: value }));
        if(name==="kind") {
            if(value === "C") {
                setType(false);
                setPlaceholderString("Write the correct answer");
            } else if(value === "A"){
                setType(true);
                setPlaceholderString("Write the correct option");
            } else {
                setType(true);
                setPlaceholderString("Write all the correct option seperated by /, eg: A/B/D");
            }
        }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await axios.post("http://localhost:8000/api/v1/createProblem", formData);
        console.log(response);
    }

    const [placeholder_string, setPlaceholderString] = useState("Write the correct option");

    const levelOptions = [
        {value:"easy", label: "Easy"},
        {value:"medium", label: "Medium"},
        {value:"hard", label: "Hard"}
    ]
    const subjectOptions = [
        {value:"physics", label: "Physics"},
        {value:"chemistry", label: "Chemistry"},
        {value:"mathematics", label: "Mathematics"}
    ]

    const topicOptions = [
        {value:"kinematics", label: "Kinematics"},
        {value:"newton's law", label: "Newton's law"},
        {value:"circular motion", label: "Circular Motion"},
        {value:"wpe", label: "WPE"},
        {value:"rotational motion", label: "Rotational Motion"},
        {value:"momentum", label: "Momentum"},
        {value:"shm", label: "SHM"},
        
    ]
    
    const [selectedLevel, setSlectedLevel] = useState([]);
    const [selectedSubject, setSlectedSubject] = useState([]);
    const [selectedTopic, setSlectedTopic] = useState([]);

    const handleLevel = (event) => {
        setSlectedLevel(event);
    };
    const handleSubject = (event) => {
        setSlectedSubject(event);
    };
    const handleTopic = (event) => {
        setSlectedTopic(event);
    };

    useEffect(()=>{
        let arr=[];
        selectedLevel&&arr.push(selectedLevel.value);
        selectedSubject&&arr.push(selectedSubject.value);
        for (let index = 0; index < selectedTopic.length; index++) {
            arr.push(selectedTopic[index].label);
        }
        setFormdata((prevFormData) => ({ ...prevFormData, ["tags"]: arr }));
    },[selectedLevel,selectedSubject,selectedTopic])

    return (
        <div className='cont'>
            <form className="contributor-form" onSubmit={handleSubmit}>
            {/* question */}
            <div className="form-group">
                <label htmlFor="question" className="form-label">
                    Question:
                </label>
                <div className='come_center'>
                <textarea id="question" name="question" value={formData.question} onChange={handleChange} className="form-control" />
                </div>
            </div>
            {/* Image upload  */}
            <div className="form-group">
                <label htmlFor="image" className="form-label">
                    Upload Image:
                </label>
                <div className='come_center'>
                    <input type="file" accept="image/*" id="image" name="image" value={formData.img} onChange={handleChange} className="form-control" />
                </div>
            </div>

            {/* question type  */}
            <div className="form-group">
                <label htmlFor="kind" className="form-label">
                    Select question type:
                </label>
                <div className='come_center'>
                <select id="kind" name="kind" value={formData.kind} onChange={handleChange} className="form-control">
                    <option value="A">Single Correct</option>
                    <option value="B">Multiple Correct</option>
                    <option value="C">Fill in the blanks</option>
                </select>
                </div>
                
            </div>

            {/* option  */}
            {type && 
                <div className="form-group">
                    <div className="options">
                        <div className='option_cont'>
                            <label htmlFor="option1" className="option-label">
                                A:
                            </label>
                            <textarea id="option1" name="option1" value={formData.option1} onChange={handleChange} className="form-control" />
                        </div>
                        <div className='option_cont'>
                            <label htmlFor="option2" className="option-label">
                                B:
                            </label>
                            <textarea id="option2" name="option2" value={formData.option2} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="options">
                        <div className='option_cont'>
                            <label htmlFor="option3" className="option-label">
                                C:
                            </label>
                            <textarea id="option3" name="option3" value={formData.option3} onChange={handleChange} className="form-control" />
                        </div>
                        
                        <div className='option_cont'>
                            <label htmlFor="option4" className="option-label">
                                D:
                            </label>
                            <textarea id="option4" name="option4" value={formData.option4} onChange={handleChange} className="form-control" />
                            
                        </div>
                    </div>
                </div>
            }


            {/* Correct answer */}
            <div className="form-group">
                <label htmlFor="answer" className="form-label">
                    Correct Answer: 
                </label>
                <div className='come_center'>
                <textarea id="answer" name="answer" value={formData.answer} onChange={handleChange} placeholder={placeholder_string} className="form-control" />
                </div>
            </div>

            {/* solution  */}
            <div className="form-group">
                <label htmlFor="solution" className="form-label">
                    Solution:
                </label>
                <div className='come_center'>
                <textarea id="solution" name="solution" value={formData.solution} onChange={handleChange} className="form-control" />
                </div>
            </div>

           
           <div className="select-container">
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={levelOptions}
                    value={selectedLevel}
                    onChange={handleLevel}
                    isSearchable={true}
                    isClearable={true}
                    placeholder="Level"
                />


                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={subjectOptions}
                    value={selectedSubject.Sub}
                    onChange={handleSubject}
                    isSearchable={true}
                    placeholder="Subject"
                />

                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={topicOptions}
                    value={selectedTopic.Topic}
                    onChange={handleTopic}
                    isSearchable={true}
                    placeholder="Topic"
                />
                
           </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    );
}

export default ContributorForm;