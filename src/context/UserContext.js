import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unveilingLoading = async () => {
      try {
        const storedUnveilingUser = await AsyncStorage.getItem('currentUser');
        if (storedUnveilingUser) {
          setUser(JSON.parse(storedUnveilingUser));
        }
      } catch (error) {
        console.error('Error User Storage:', error);
      }
    };
    unveilingLoading();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
