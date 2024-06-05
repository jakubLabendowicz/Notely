import { Route, Routes, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import LogUserLogin from "./pages/UserLogin"
import UserCreate from "./pages/UserCreate"
import UserList from "./pages/UserList";
import UserView from "./pages/UserView";
import UserEdit from "./pages/UserEdit";
import UserDelete from "./pages/UserDelete";
import NoteCreate from "./pages/NoteCreate";
import NoteList from "./pages/NoteList";
import NoteView from "./pages/NoteView";
import NoteEdit from "./pages/NoteEdit";
import NoteDelete from "./pages/NoteDelete";

function App() {
  const token = localStorage.getItem("token")

  return (
    <>
      <Routes>
          {!token && <Route path="/login" exact element={<LogUserLogin />} />}
          {!token && <Route path="/users/create" exact element={<UserCreate />} />}
          {token && <Route path="/users" exact element={<UserList />} />}
          {token && <Route path="/users/:userId" exact element={<UserView />} />}
          {token && <Route path="/users/:userId/edit" element={<UserEdit />} />}
          {token && <Route path="/users/:userId/delete" element={<UserDelete />} />}

          {token && <Route path="/notes/create" element={<NoteCreate />} />}
          {token && <Route path="/notes" element={<NoteList />} />}
          {token && <Route path="/notes/:noteId" element={<NoteView />} />}
          {token && <Route path="/notes/:noteId/edit" element={<NoteEdit />} />}
          {token && <Route path="/notes/:noteId/delete" element={<NoteDelete />} />}
          
          {!token && <Route path="/" element={<Navigate replace to="/login" />} />}    
          {token && <Route path="/" element={<Navigate replace to="/notes" />} />}
      </Routes>
      <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
    </>
  )
}
export default App