import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { baseURL }from '../../url'


function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();

function Profile() {

    const [alertError, setAlertError] = React.useState<number>(200);
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [address, setAddress] = React.useState<string>('');

    React.useEffect(() => {
        let e :any = localStorage.getItem('email');
        let p :any = localStorage.getItem('password');
        e = atob(e);
        p = atob(p);

        const post_data = {
          email: e,
          password: p,
        };
        axios.post(`${baseURL}/profile`, post_data)
        .then((response: any) => {
            if (response.status === 201){
                setFirstName(response.data.FirstName);
                setLastName(response.data.LastName);
                setEmail(response.data.Email);
                setPassword(response.data.Password);
                setAddress(response.data.Address);
            }
        });

    }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const post_data = {
        FirstName: data.get('firstName'),
        LastName: data.get('lastName'),
        Email: data.get('email'),
        Password: data.get('password'),
        Address: data.get('address'),
        Token: "user",
      };
      console.log(post_data);
      if (post_data.FirstName !== '' && post_data.LastName !== '' && post_data.Email !== '' && post_data.Password !== ''){
        axios.post(`${baseURL}/update-profile`, post_data)
        .then((response: any) => {
            if (response.status === 201){
              let e :any = data.get('email');
              let p :any = data.get('password');
              let hash_email = btoa(e);
              let hash_password = btoa(p);
              localStorage.setItem("email", hash_email);
              localStorage.setItem("password", hash_password);
                window.location.href = "/profile";
            }
        });
      } else {
        setAlertError(500);
      }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            { (() => {
                if (alertError !== 200){
                    return (<>
                        <Alert severity="error" sx={{mb: '1rem'}}>Sign Up Error!</Alert>
                    </>)
                }
            })()}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="text"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  fullWidth
                  name="address"
                  label="address"
                  type="text"
                  id="address"
                  autoComplete="new-address"
                />
              </Grid>
              <Grid item xs={12}>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color='success'
              sx={{ mt: 3, mb: 2 }}
              onClick={() => window.location.href = '/address'}
            >
              Update Address
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Profile