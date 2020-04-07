import React, {createContext, useState, useCallback} from 'react';

const initialUser = {
  firstname: 'Not',
  lastname: 'Defined'
};

export const UserContext = createContext(initialUser);

export const UserProvider = props => {
  const [user, setUser] = useState({});

  return (
    //@ts-ignore
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
}
