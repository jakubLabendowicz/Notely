import { Route, Routes, Navigate } from "react-router-dom"
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Main from "./pages/Main"
import Tracks from "./pages/Tracks"
import Track from "./pages/Track"
import Favorites from "./pages/Favorites"
import Me from "./pages/Me";
import Group from "./pages/Group";


function App() {
  const user = localStorage.getItem("token")
  const theme = createTheme({
    palette: {
      primary: {
        light: '#1f1f1f',
        main: '#1ED760',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        {user && <Route path="/" element={<Navigate replace to="/tracks" />} />}
        {user && <Route path="/tracks" exact element={<Tracks />} />}
        {user && <Route path="/tracks/:trackId" exact element={<Track />} />}
        {user && <Route path="/users/self/favorites/all/tracks" exact element={<Favorites/>} />}
        {user && <Route path="/users/self" exact element={<Me/>} />}
        {user && <Route path="/users" exact element={<Group />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </ThemeProvider>
  )
}
export default App