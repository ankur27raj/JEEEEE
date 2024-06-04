import React, { useState,useEffect,useContext } from 'react'
import axios  from 'axios';
import {Link} from "react-router-dom";
import {io} from 'socket.io-client';
import styled,{css} from 'styled-components';
import UserContext from '../../contexts/UserContext';
import {ModeContext} from '../../contexts/ModeContext';

// Define the light and dark mode colors
const lightModeColors = {
  background: '#f5f5f5',
  text: '#333333',
  tableHeaderBackground: '#007bff',
  tableHeaderColor: '#ffffff',
  tableRowEvenBackground: '#e9ecef',
};

const darkModeColors = {
  background: '#181818',
  text: '#e0e0e0',
  tableHeaderBackground: '#1e3a8a',
  tableHeaderColor: '#ffffff',
  tableRowEvenBackground: '#2e2e2e',
};

const getThemeColors = (theme) => (theme===false ? lightModeColors : darkModeColors);

// Styled components
const Container = styled.div`
  margin: 20px;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  height: 100%;
  ${({ theme }) => {
    const colors = getThemeColors(theme);
    return css`
      background-color: ${colors.background};
      color: ${colors.text};
      transition: background-color 0.3s, color 0.3s;
    `;
  }}
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    ${({ theme }) => {
      const colors = getThemeColors(theme);
      return css`
        background-color: ${colors.tableRowEvenBackground};
        transition: background-color 0.3s;
      `;
    }}
  }
`;

const TableHeader = styled.th`
  padding: 16px;
  text-align: center;
  ${({ theme }) => {
    const colors = getThemeColors(theme);
    return css`
      background-color: ${colors.tableHeaderBackground};
      color: ${colors.tableHeaderColor};
      transition: background-color 0.3s, color 0.3s;
      text-transform: uppercase;
      letter-spacing: 1px;
    `;
  }}
`;

const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    transition: background-color 0.3s;
  }
`;


const MainPage = () => {
  const socket = io('http://localhost:5000');
  const [contests,setContests] =useState([]);
  const [display,setDisplay] =useState({});
  const {isAuthenticate} = useContext(UserContext);
  const { darkMode } = useContext(ModeContext);

  const fetchData=async()=>{
    const response = await axios.get("https://je-2-backend.onrender.com/api/v1/getContest");
    setContests(response.data.data);
    sendDate({tm:response.data.data[0].startTime,i:response.data.data[0]._id,dur:response.data.data[0].duration});
  }
  useEffect(()=>{
    fetchData();
  },[])

  useEffect(()=>{
    socket.on('message', (msg) => {
      alert("Contest is LIVE!!!");
      setDisplay(prevDisplay => ({
        ...prevDisplay,
        [msg]: true
      }));
    });
    socket.on('end',(e)=>{
      alert("Contest Ended!!!");
      setDisplay(prevDisplay => ({
        ...prevDisplay,
        [e]: false
      }));

    })
    return () => {
        socket.disconnect();
    };
  },[])

  const sendDate = (startTime) => {
    socket.emit('clientMessage', startTime);
};

  return (
    <Container theme={darkMode}>
    <Table>
      <tbody>
        <TableRow className='header'>
          <TableHeader theme={darkMode}>Contest Name</TableHeader>
          <TableHeader theme={darkMode}>Writers</TableHeader>
          <TableHeader theme={darkMode}>Start</TableHeader>
          <TableHeader theme={darkMode}>Duration</TableHeader>
        </TableRow>

        {contests.map((contest, index) => {
          const d=new Date(contest.startTime).toLocaleString().split(", ");
          return (
          <TableRow key={index}  theme={darkMode}>
            <TableCell>
              {display[contest._id] ? (
                <Link to={isAuthenticate ? (`/contest/${contest._id}`) : ("/login")} 
                state={isAuthenticate ? ({ ques: contest.questions,
                name:contest.contestName,start:contest.duration }) : ({returnPath:"/compete"})}>
                {contest.contestName}
              </Link>
              ) : (
                <>{contest.contestName}</>
              )}
            </TableCell>
            <TableCell>
              {contest.writers.map((writer, ind) => (
                <p key={ind}>{writer}</p>
              ))}
            </TableCell>
            <TableCell>{d[0]}<br/> {d[1]}</TableCell>
            <TableCell>{contest.duration}</TableCell>
          </TableRow>
        )}
        )}
      </tbody>
    </Table>
  </Container>

  )
}
export default MainPage
