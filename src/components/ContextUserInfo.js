import React, { useState, useContext } from 'react';

const UserDataContext = React.createContext();
const UserDataUpdateContext = React.createContext();

export function useUserData() {
    return useContext(UserDataContext);
}

export function useUpdateUserData) {
    return useContext(UserDataUpdateContext);
}

export function UserInfoProvider({ children }) {
    const [userData, setUserData] = useState({
        name: '',
        id: '',
        investment: 0,
        money: 0,
        coins: []
    });

    function updateUserData(userInput, type) {
        // will rcv value + type to check what type of transaction and process accordingly, if no type creates alert
        if (type === "LOGIN") {
            setUserData(userInput);
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