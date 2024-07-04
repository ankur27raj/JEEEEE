import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Pagination from '../practice_sec/Pagination';
import '../PracticePage.css'
import {ModeContext} from '../../contexts/ModeContext';

const ProblemList = () => {
    const { darkMode } = useContext(ModeContext);
    useEffect(() => {
        document.body.className = !darkMode ? 'light-mode' : 'dark-mode';
    }, [darkMode]);

    const location = useLocation();
    const navigate = useNavigate();
    let { text } = location.state || {};
    // current url 
    const currentUrl = window.location.href;
    
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [probPerPage, setProbPerPage] = useState(2);
    const [totalProb, setTotalProb] = useState(0);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [arr, setArr] = useState([]);

    const fetchData = async() =>{
        try{
            const storedData = JSON.parse(Cookies.get('userData'));
            const response = await axios.get(`http://localhost:8000/api/v1/${text}?userId=${storedData._id}&currentPage=${currentPage}&probPerPage=${probPerPage}`);
            setData(response.data.data);
            setTotalProb(response.data.length);
        }catch(error){
            console.error(error);
        }
    }
    
    useEffect(()=>{
        if(currentUrl === "http://localhost:3000/myList"){
            text = "getList";
        }
        else if(currentUrl === "http://localhost:3000/submissions"){
            text = "getSubmissions";
        }
        const storedData = JSON.parse(Cookies.get('userData'));
        if(storedData){
            setIsAuthenticate(true);
            resolveStatus();
            fetchData();
        }
        else{
            setIsAuthenticate(false);
            setArr([]);
        }
    }, [probPerPage, currentPage, text]);


    const handlePath = (item) => {
        if (isAuthenticate) {
          const path = "/Problem/" + item.statement;
          navigate(path, { state: { item } });
        } else {
          navigate("/login", { state: { returnPath: "/practice" } });
        }
    };
    
    const resolveStatus = async () => {
        try {
            const storedData = JSON.parse(Cookies.get('userData'));
          const res = await axios.get(`http://localhost:8000/api/v1/getSolvedProblem?userId=${storedData._id}`);
          setArr(res.data.data);
        } catch (error) {
          console.error(error);
        }
    };
    return (
        <div>
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
                        {data.map((item, index) => (
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

export default ProblemList;
