import React, { createContext, useState } from 'react';

// 사용자 컨텍스트 생성
export const UserContext = createContext();

// 사용자 컨텍스트 제공자 생성
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // 사용자 컨텍스트 업데이트 함수
  const updateUser = (userData) => {
    setUser(userData);
  };

  const updateRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const userContextValue = { user, updateUser, refresh, updateRefresh };

  return <UserContext.Provider value={userContextValue}>{children}</UserContext.Provider>;
};
