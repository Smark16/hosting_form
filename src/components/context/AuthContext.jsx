import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import axios from 'axios';

const loginurl = 'https://institute-application-backend.onrender.com/form/';
const registerurl = 'https://institute-application-backend.onrender.com/form/register';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => JSON.parse(localStorage.getItem('authtokens')) || null);
  const [user, setUser] =  useState(() => (authTokens ? jwtDecode(authTokens.access) : null));
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState(true);
  const [passwordError, setPasswordError] = useState([]);
  const [usernameError, setUsernameError] = useState([]);
  const [noActive, setNoActive] = useState('')

  const navigate = useNavigate();

  const handleDisplay = () => {
    setDisplay(!display);
  };

  const loginUser = async (username, password) => {
    axios.post(loginurl, { username, password })
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          setAuthTokens(data);
          setUser(jwtDecode(data.access));
          showSuccessAlert("Login successful");
          localStorage.setItem('authtokens', JSON.stringify(data));
          navigate("/institute/information")
        } else {
          showErrorAlert("Please provide correct username/password");
        }
      })
      .catch(err => {
        console.log("Error", err);
        if(err.response.data.detail){
          setNoActive(err.response.data.detail)
        }
        // showErrorAlert("There was a server issue");
      });
  };
  const RegisterUser = async (email, first_name, last_name, middle_name, mobile, password, confirm_password) => {
    setLoading(true);
    axios.post(registerurl, {
      email,
      first_name,
      last_name,
      middle_name,
      mobile,
      password,
      confirm_password
    }).then(response => {
      console.log(response);
      if (response.status === 201) {
        showSuccessAlert("Registration successful, you can Login now");
        navigate("/");
      } else {
        showErrorAlert(`An Error occurred: ${response.status}`);
      }
    }).catch(error => {
      console.error("Registration error:", error);
      if (error.response && error.response.data && error.response.data.password) {
        const passwordErrors = error.response.data.password;
        console.log("Password error:", passwordErrors);
        setPasswordError(passwordErrors);
      }
      if (error.response && error.response.data && error.response.data.email) {
        const usernameErrors = error.response.data.email;
        console.log("Email error:", usernameErrors );
        setUsernameError(usernameErrors);
      }
      showErrorAlert("There was a server issue");
    }).finally(() => {
      setLoading(false);
    });
  };
  
  


  const showSuccessAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "success",
      timer: 6000,
      toast: true,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: true,
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      title: message,
      icon: "error",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: true,
    });
  };

  useEffect(()=>{
      if(authTokens){
        const decodedUser =  jwtDecode(authTokens.access)
        setUser(decodedUser)
        {user && navigate("/institute/information")}
      }
      setLoading(false)
  }, [authTokens])

  const contextData = {
    user, setUser,
    authTokens, setAuthTokens,
    loginUser, RegisterUser,
    showSuccessAlert,
    handleDisplay, display, setDisplay,
    loading, passwordError, usernameError,
    noActive
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
