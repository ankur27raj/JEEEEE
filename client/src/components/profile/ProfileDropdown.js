import React, { useState, useRef, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
// import './ProfileDropdown.css'; // Import your CSS file


import styled from 'styled-components';

const ProfileContainer = styled.div`
    position: relative;
    display: inline-block;
`;

const ProfilePicture = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 50px; /* Adjust as needed */
    right: 0;
    width: 150px; /* Adjust as needed */
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const DropdownItem = styled.a`
    display: block;
    padding: 0.7rem;
    text-decoration: none;
    color: black;
    cursor : arrow;
    &:first-child{
        font-weight:bolder;
        font-size:1.3rem;
        padding-bottom: 0;
    }
    &:nth-child(2){
        border-bottom: 1px solid #ccc;
        padding-top: 1px;
    }
    &:last-child {
        cursor:pointer;
    }

    &:hover {
        background-color: #f1f1f1;
    }
`;

const ProfileDropdown = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const profileRef = useRef(null);
    const dropdownRef = useRef(null);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownVisible((prevState) => !prevState);
    };

    // Function to close the dropdown if clicked outside of it
    const handleClickOutside = (event) => {
        if (
            profileRef.current &&
            dropdownRef.current &&
            !profileRef.current.contains(event.target) &&
            !dropdownRef.current.contains(event.target)
        ) {
            setDropdownVisible(false);
        }
    };

    // Add event listener for clicks outside of the dropdown
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Function to handle sign out action

    const {userData, remove_Data_from_cookies} = useContext(UserContext);
    const handleSignOut = () => {
        remove_Data_from_cookies();
    };
    return (
        <ProfileContainer ref={profileRef}>
            {/* Profile picture */}
            <ProfilePicture
                src={require("../../assets/profile_img.png")} // Change this to your profile picture URL
                alt="Profile Picture"
                onClick={toggleDropdown}
            />
            {/* <p onClick={toggleDropdown}>{userData.first} {" "} {userData.last}</p> */}
            {/* Dropdown menu */}
            <DropdownMenu visible={isDropdownVisible} ref={dropdownRef}>
                <DropdownItem>{userData.username}</DropdownItem>
                <DropdownItem>{userData.first} {" "} {userData.last}</DropdownItem>
                <DropdownItem onClick={handleSignOut}>
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </ProfileContainer>
    );
};

export default ProfileDropdown;
