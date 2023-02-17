import React from "react";

export const CurrentUserContext = React.createContext({
  userName: 'name',
  userDescription: 'description',
  userAvatar: 'avatar'
});