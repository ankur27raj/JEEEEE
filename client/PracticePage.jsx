import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import '../forms/ContributorForm.css';
import axios from "axios";


const animatedComponents = makeAnimated();

const TableContainer = styled.div`
  margin: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  background-color: #f2f2f2;
  font-weight: bold;
  padding: 8px;
  border: 1px solid #ddd;
`;

const StyledTd = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }

  &:hover {
    background-color: #ddd;
  }
`;

const Table = () => {

  const [selectedLevel, setSlectedLevel] = useState([]);
  const [selectedSubject, setSlectedSubject] = useState([]);
  const [selectedTopic, setSlectedTopic] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const filterData = data.filter(item => 
      item.tags[0] === selectedLevel.value &&
      item.tags[1] === selectedSubject.value &&
      itemCheck(item)
    );
    setFilteredData(filterData);
  }
  
  const itemCheck = (item) => {
    return selectedTopic.every(topic => item.tags.includes(topic.label));
  }  

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
  

  const handleLevel = (event) => {
      setSlectedLevel(event);
  };
  const handleSubject = (event) => {
      setSlectedSubject(event);
  };
  const handleTopic = (event) => {
      setSlectedTopic(event);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/getProblem");
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='cont'>
            <form className="contributor-form" onSubmit={handleSubmit}>
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
                    value={selectedSubject}
                    onChange={handleSubject}
                    isSearchable={true}
                    placeholder="Subject"
                />

                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={topicOptions}
                    value={selectedTopic}
                    onChange={handleTopic}
                    isSearchable={true}
                    placeholder="Topic"
                />
                
           </div>

            <button type="submit" className="btn btn-primary">Filter</button>
        </form>
        </div>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <StyledTh>Number</StyledTh>
              <StyledTh>Title</StyledTh>
              <StyledTh>Difficulty</StyledTh>
              <StyledTh>Status</StyledTh>
              <StyledTh>Solution</StyledTh>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <StyledTd>{index + 1}</StyledTd>
                <StyledTd>{item.statement}</StyledTd>
                <StyledTd>{item.tags[0]}</StyledTd>
                <StyledTd>{item.status}</StyledTd>
                <StyledTd>{item.solution?item.solution:<p>--</p>}</StyledTd>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
};

export default Table;