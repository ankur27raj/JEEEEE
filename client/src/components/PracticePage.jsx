import React, { useEffect, useState, useContext } from 'react';
import Pagination from './practice_sec/Pagination'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from "axios";
import './PracticePage.css';
import {useLocation, useNavigate } from 'react-router-dom';
import {ModeContext} from '../contexts/ModeContext';
import Cookies from 'js-cookie';

const animatedComponents = makeAnimated();

const Table = () => {
  const { darkMode } = useContext(ModeContext);
  useEffect(() => {
    document.body.className = !darkMode ? 'light-mode' : 'dark-mode';
  }, [darkMode]);
  const [userData, setUserData] = useState({});
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const location = useLocation();
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [all_tags, setTags] = useState("");
  const [probPerPage, setProbPerPage] = useState(2);
  const [text, setText] = useState("");
  const [totalProb, setTotalProb] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [textSearch, setTextSearch] = useState("");
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tagsString = "";
    const topicLen = selectedTopic.length;
    if (selectedLevel != null) {
      tagsString += selectedLevel.value;
      if (selectedSubject != null || topicLen > 0) tagsString += ',';
    }
    if (selectedSubject != null) {
      tagsString += selectedSubject.value;
      if (topicLen > 0) tagsString += ',';
    }
    selectedTopic.forEach((topic, index) => {
      tagsString += topic.value;
      if (index !== topicLen - 1) tagsString += ',';
    });
    setTags(tagsString);
    setCurrentPage(1);
    setText("");
    setTextSearch("");
    location.state = null;
  };


  const levelOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" }
  ]
  const subjectOptions = [
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "mathematics", label: "Mathematics" }
  ]

  const topicOptions = [
    { value: "Kinematics", label: "Kinematics" },
    { value: "newton's law", label: "Newton's law" },
    { value: "circular motion", label: "Circular Motion" },
    { value: "wpe", label: "WPE" },
    { value: "rotational motion", label: "Rotational Motion" },
    { value: "momentum", label: "Momentum" },
    { value: "shm", label: "SHM" },

  ]


  const handleLevel = (event) => setSelectedLevel(event);
  const handleSubject = (event) => setSelectedSubject(event);
  const handleTopic = (event) => setSelectedTopic(event);

  const fetchData = async (tags) => {
    try {
      const response = await axios.get(`https://je-2-backend.onrender.com/api/v1/getProblem?page_no=${currentPage}&probPerPage=${probPerPage}&tags=${tags}`);
      // const response = await axios.get(`http://localhost:8000/api/v1/getProblem?page_no=${currentPage}&probPerPage=${probPerPage}&tags=${tags}`);
      setFilteredData(response.data.data);
      setTotalProb(response.data.length);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleText = (e) => setText(e.target.value);

  const handleTextSubmit = (e) => {
    e.preventDefault();
    setTextSearch(text);
    setCurrentPage(1);
    setTags("");
    location.state = null;
  };

  const handleTextSearch = async (e) => {
    try {
      // const response = await axios.get(`https://je-2-backend.onrender.com/api/v1/getProblemByText?text=${text}&page_no=${currentPage}&probPerPage=${probPerPage}`);
      const response = await axios.get(`https://je-2-backend.onrender.com/api/v1/getProblemByText?text=${text}&page_no=${currentPage}&probPerPage=${probPerPage}`);
      setFilteredData(response.data.data);
      setTotalProb(response.data.length);
    } catch (err) {
      console.log(err);
    }
  }

  const resolveStatus = async () => {
    try {
      const storedData = JSON.parse(Cookies.get('userData'));
      setUserData(storedData);
      const res = await axios.get(`https://je-2-backend.onrender.com/api/v1/getSolvedProblem?userId=${storedData._id}`);
      setArr(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedData = Cookies.get('userData');
    if (storedData) {
      setIsAuthenticate(true);
      resolveStatus();
    }
    else{
      setIsAuthenticate(false);
      setArr([]);
    }
    if (location.state != null) {
      const { subject } = location.state;
      fetchData(subject);
    } else if (textSearch !== "") {
      handleTextSearch();
    } else {
      fetchData(all_tags);
    }
  }, [all_tags, textSearch, probPerPage, currentPage, isAuthenticate]);

  const handlePath = (item) => {
    if (isAuthenticate) {
      const path = "/Problem/" + item.statement;
      navigate(path, { state: { item } });
    } else {
      navigate("/login", { state: { returnPath: "/practice" } });
    }
  };


  return (
    <div className="page-container">
      <div className="header-container">
        <div className="header-item" onClick={() => { setTextSearch(""); setTags("mathematics") }}>
          <img className="header-image" src={require('../assets/mathematics_icon.png')} alt="Math Icon" />
          <div className="header-text">
            <h2>Mathematics</h2>
            <p>Solve most asked question of mathematics</p>
          </div>
        </div>
        <div className="header-item" onClick={() => {setTextSearch(""); setTags("physics") }}>
          <img className="header-image" src={require('../assets/physics_icon.png')} alt="Physics Icon" />
          <div className="header-text">
            <h2>Physics</h2>
            <p>Solve most asked question of physics</p>
          </div>
        </div>
        <div className="header-item" onClick={() => {setTextSearch(""); setTags("chemistry") }}>
          <img className="header-image" src={require('../assets/chemistry_icon.png')} alt="Chemistry Icon" />
          <div className="header-text">
            <h2>Chemistry</h2>
            <p>Solve most asked question of chemistry</p>
          </div>
        </div>
      </div>


      <form className="form form-container" onSubmit={handleSubmit}>
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
            isClearable={true}
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
          <button type="submit" className="submit-button">Filter</button>
        </div>
      </form>

      <form className="search-form" onSubmit={handleTextSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            value={text}
            onChange={handleText}
            className="search-input"
            placeholder="Search..."
          />
          <button type="submit" className="search-button">
            <img src={require("../assets/search_icon.png")} alt="Search" className="search-icon" />
          </button>
        </div>
      </form>


      <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th className="styled-th">Number</th>
              <th className="styled-th">Title</th>
              <th className="styled-th">Difficulty</th>
              <th className="styled-th">Status</th>
              <th className="styled-th">Solution</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr className="table-row" key={index}>
                <td className="styled-td">{index + 1}</td>
                <td className="styled-td">
                  <p className="ques_statement" onClick={() => handlePath(item)}>{item.statement}</p>
                </td>

                <td className="styled-td">{item.tags[0]}</td>
                <td className="styled-td">{arr.indexOf(item._id) !== -1 ? ("Solved") : ("Todo")}</td>
                <td className="styled-td">{item.solution ? item.solution : <p>--</p>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination probPerPage={probPerPage} setProbPerPage={setProbPerPage} 
            totalProb={totalProb} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    </div>
  );
};

export default Table;
