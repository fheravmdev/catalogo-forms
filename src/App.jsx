import './App.css'
import { CircularProgress, createTheme } from '@mui/material'
import useAuth from './hooks/useAuth';
import Login from './pages/Login.jsx';
import Formularios from './pages/Formularios.jsx';
import { useEffect, useState } from 'react';
import instance from './axios-instance';

function App() {
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(null)
  const THEME = createTheme({
    typography: {
      "fontFamily": `"Montserrat", "Helvetica", "Arial", sans-serif`,
      "fontSize": 14
    }
  });

  useEffect(() => {
    setLoading(true);
    if (!auth?.isAuthenticated) {
      instance.get('/me')
        .then(res => {
          if (res.data.success) {
            setAuth({
              username: res.data.user.username,
              roles: res.data.user.roles,
              isAuthenticated: true
            });
          }
        })
        .catch(() => {
          setAuth({});
          setLoading(false)
        }).finally(() => {
          setLoading(false)
        });
    }
  }, []);
  if (loading) return (<CircularProgress sx={{ position: 'absolute', top: "50%", left: "50%" }}></CircularProgress>)
  return (
    <>
      {
        auth?.isAuthenticated ?
          <Formularios Theme={THEME} user={auth} />
          :
          <Login Theme={THEME} />
      }
    </>
  )
}

export default App
