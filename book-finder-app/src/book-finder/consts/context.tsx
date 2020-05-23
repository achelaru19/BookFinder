import React, {createContext, useState} from 'react';
import { UserType } from '../types/userType';

const initialUser = {
  firstname: 'Not defined',
  lastname: 'Not defined',
  birthdate: 'Not defined',
  email: 'Not defined',
  university: 'Not defined',
  faculty: 'Note defined'
};

export const UserContext = createContext<UserType>(initialUser);

export const UserProvider = props => {
  const [user, setUser] = useState({});

  return (
    //@ts-ignore
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
}
