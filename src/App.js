import ReactDOM from 'react-dom'
import {createRoot} from 'react-dom/client'
// function App() {
//   return 'Hello'
// }
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import {AuthProvider, useAuth} from './components/AuthContext'
import Login from './components/Login'
import QuoteList from './components/QuoteList'
import QuoteCreation from './components/QuoteCreation'

const ProtectedRoute = ({children}) => {
  const {authToken} = useAuth()
  return authToken ? children : <Navigate to="/" />
}

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/quotes"
          element={
            <ProtectedRoute>
              <QuoteList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-quote"
          element={
            <ProtectedRoute>
              <QuoteCreation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  </AuthProvider>
)

export default App
