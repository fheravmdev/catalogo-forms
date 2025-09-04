import './App.css'
import { CircularProgress, createTheme, Snackbar } from '@mui/material'
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import instance from './axios-instance';
import useAuth from './hooks/useAuth';
import Login from './pages/Login.jsx';
import Formularios from './pages/Formularios.jsx';
import Manuales from './pages/Manuales.jsx';
import Admin from './pages/Admin.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NavBar from './components/NavBar.jsx';
import FilesAdminPage from './pages/FilesAdminPage.jsx';
import UsersAdminPage from './pages/UsersAdminPage.jsx';
import FormsAdminPage from './pages/FormsAdminPage.jsx';
import MePage from './pages/MePage.jsx';


function App() {
  //para redirigir al login o cosas
  const { auth, setAuth } = useAuth();
  const [unauth, setunAuth] = useState(false);

  const [loading, setLoading] = useState(null)
  //Sólo para usar MontSerrat, por ahora no tengo nada más en el Theme.
  const THEME = createTheme({
    typography: {
      "fontFamily": `"Montserrat", "Helvetica", "Arial", sans-serif`,
      "fontSize": 14
    }
  });

  //SIEMPRE en cada re-render de la app, se verifica el token con /me.
  useEffect(() => {
    setLoading(true);
    if (!auth?.isAuthenticated) {
      instance.get('/me')
        .then(res => {
          if (res.data.success) {
            //Recibe los mismos usuario y roles que envió desde el backend
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

  useEffect( ()=>{
    const kicker = () => setunAuth(true);
    window.addEventListener('unauthorized', kicker);
    return () => window.removeEventListener('unauthorized', kicker);
  }, [])

  const handleLogout = async () => {
    try {
      await instance.post('/logout');
      setAuth({});
    } catch (e) {
      setAuth({});
    }
  };

  if (loading) return (<CircularProgress sx={{ position: 'absolute', top: "50%", left: "50%" }}></CircularProgress>)
  return (
    <>
      <NavBar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={
          auth?.isAuthenticated
            ? <Formularios Theme={THEME} user={auth} />
            : <Login Theme={THEME} />
        } />
        <Route path="/manuales" element={
          <ProtectedRoute>
            <Manuales Theme={THEME} />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Admin />
          </ProtectedRoute>
        }>
          <Route path="" element={<Admin />} />
          <Route path="users" element={<UsersAdminPage />} />
          <Route path="forms" element={<FormsAdminPage />} />
          <Route path="files" element={<FilesAdminPage />} />
        </Route>
        <Route path='/me' element={
          <ProtectedRoute>
            <MePage></MePage>
          </ProtectedRoute>
        }></Route>
      </Routes>
      <Snackbar
        open={unauth}
        autoHideDuration={4000}
        onClose={() => setunAuth(false)}
        message="La sesión caducó, inicie sesión nuevamente."
        anchorOrigin={{vertical: 'top', horizontal:'center'}}
      ></Snackbar>
    </>

  );
}

export default App
