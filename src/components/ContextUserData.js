import React, { useState, useContext } from 'react';

const UserDataContext = React.createContext();
const UserDataUpdateContext = React.createContext();

export function useUserData() {
    return useContext(UserDataContext);
}

export function useUpdateUserData() {
    return useContext(UserDataUpdateContext);
}

export function UserDataProvider({ children }) {
    const [userData, setUserData] = useState({
        name: '',
        id: '',
        investment: 0,
        money: 0,
        coins: [],
        isLoggedIn: false
    });

    function updateUserData(userInput, type) {
        // will rcv value + type to check what type of transaction and process accordingly, if no type creates alert
        if (type === "LOGIN") {
            const newUser = {name: userInput[1], id: userInput[0], investment: userInput[2], money: userInput[3], coins: userInput[4] ? userInput[4] : [], isLoggedIn: true}
            setUserData(newUser);
        } else if (type === "TRANSACTION") {

        } else if ( type === "INVESTMENT") {

        } else {
            alert("INVALID TYPE");
        }


    }
    return (
        <UserDataContext.Provider value={userData}>
            <UserDataUpdateContext.Provider value={updateUserData}>
                {children}
            </UserDataUpdateContext.Provider>
        </UserDataContext.Provider>
    )
}