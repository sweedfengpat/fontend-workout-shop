import React, { useState, useEffect } from 'react';
import axios from "axios";
import { baseURL }from '../url';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import { Link } from 'react-router-dom';
import NoteAltTwoToneIcon from '@mui/icons-material/NoteAltTwoTone';
import Container from '@mui/material/Container';

function ButtonAdmin() {
    const [token, setToken] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');



    useEffect(() => {
        if (localStorage.getItem("email")) {
          let e :any = localStorage.getItem('email');
          let p :any = localStorage.getItem('password');
          setEmail(atob(e));
          setPassword(atob(p));
          const post_data = {
            email: email,
            password: password,
          };
          if (email !== '' && password !== ''){
            axios.post(`${baseURL}/check-login`, post_data)
            .then((response: any) => {
              if (response.data.code === 500){
                localStorage.removeItem("email");
                localStorage.removeItem("password");
                setEmail('');
                setPassword('');
              } else {
                  setToken(response.data.Token);
              }
            });
          }
        }
      }, [email, password]);

    if(token === "admin"){
        return (
            <Container  maxWidth="xl">
                <Box sx={{position: 'fixed', bottom: '15px', right: '20px'}}>
                  <Link to={"/admin/manage-product"}>
                    <Fab color="secondary" aria-label="add">
                        <NoteAltTwoToneIcon />
                    </Fab>
                  </Link>
                </Box>
            </Container>
        )
    } else {
        return (
            <></>
        )
    }

}

export default ButtonAdmin