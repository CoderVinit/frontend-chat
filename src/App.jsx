import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { Suspense, lazy, useEffect } from 'react'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { LayoutLoader } from './components/layout/Loader'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line
import { userExists, userNotExists } from './redux/reducres/auth'
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from './socket'

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"))
const Group = lazy(() => import("./pages/Group"))
const NotFound = lazy(() => import("./pages/NotFound"))
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"))
const UserManagement = lazy(() => import("./pages/admin/UserManagement"))
const ChatsManagement = lazy(() => import("./pages/admin/ChatManagement"))



const App = () => {

  const dispatch = useDispatch();
  const { user, loader } = useSelector(state => state.auth)

  useEffect(() => {

    axios.get("http://localhost:4000/api/v1/users/me", { withCredentials: true }).then(({ data }) => dispatch(userExists(data))).catch((err) => dispatch(userNotExists()))

  }, [dispatch])


  return loader ? (<LayoutLoader />) : (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<SocketProvider><ProtectedRoute user={user} /></SocketProvider>} >
            <Route exact path="/" element={<Home />} />
            <Route exact path="/chat/:chatId" element={<Chat />} />
            <Route exact path="/groups" element={<Group />} />
          </Route>
          <Route exact path="/login" element={<ProtectedRoute user={!user} path='/'><Login /></ProtectedRoute>} />
          <Route exact path='/admin' element={<AdminLogin />} />
          <Route exact path='/admin/dashboard' element={<Dashboard />} />
          <Route exact path='/admin/message' element={<MessageManagement />} />
          <Route exact path='/admin/user' element={<UserManagement />} />
          <Route exact path='/admin/chats' element={<ChatsManagement />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position='bottom-center' />

    </Router >
  );
}

export default App;
