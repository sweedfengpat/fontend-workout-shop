import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
import { baseURL, baseURLstatic }from '../url'

const pages = [''];
const settings = ['Profile', 'Address', 'History', 'Logout'];

const Navbar = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [logo, setLogo] = useState<string>('');
    const [name, setName] = useState<string>('');
  
  
    useEffect(() => {
      axios.post(`${baseURL}/about`).then((response: any) => {
        setLogo(response.data.logo);
        setName(response.data.name);
      });

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
            setFirstName(response.data.FirstName);
            setLastName(response.data.LastName);
            if (response.data.code === 500){
              localStorage.removeItem("email");
              localStorage.removeItem("password");
              setEmail('');
              setPassword('');
            } else {
              const formData = new FormData();
              formData.append('email', email);
              axios.post(`${baseURL}/get-cart`, formData).then((response: any) => {
                let data = JSON.parse(response.data);
                setCount(data.length);
              });
              if (response.data.Token !== "admin"){
                if (window.location.pathname === "/admin/manage-product"){
                  window.location.href = "/";
                } else if (window.location.pathname === "/admin/add-product"){
                  window.location.href = "/";
                } else if (window.location.pathname === "/admin/product"){
                  window.location.href = "/";
                } else if (window.location.pathname === "/admin/order"){
                  window.location.href = "/";
                } else if (window.location.pathname === "/admin/shipping"){
                  window.location.href = "/";
                } else if (window.location.pathname === "/admin/all-payment"){
                  window.location.href = "/";
                } else if (window.location.pathname === "/admin/all-forget"){
                  window.location.href = "/";
                }
              }
            }
          });
        }
      } else {
        if (window.location.pathname === "/profile"){
          window.location.href = "/";
        } else if (window.location.pathname === "/admin/manage-product"){
          window.location.href = "/";
        } else if (window.location.pathname === "/admin/add-product"){
          window.location.href = "/";
        } else if (window.location.pathname === "/admin/product"){
          window.location.href = "/";
        } else if (window.location.pathname === "/cart"){
          window.location.href = "/";
        } else if (window.location.pathname === "/history"){
          window.location.href = "/";
        } else if (window.location.pathname === "/checkout"){
          window.location.href = "/";
        } else if (window.location.pathname === "/admin/order"){
          window.location.href = "/";
        } else if (window.location.pathname === "/admin/shipping"){
          window.location.href = "/";
        } else if (window.location.pathname === "/admin/all-payment"){
          window.location.href = "/";
        } else if (window.location.pathname === "/admin/all-forget"){
          window.location.href = "/";
        }
      }
    }, [email, password, count, logo]);
  
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    const getopage = (e: string) =>{
      if (e ===  "Logout"){
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        setEmail('');
        setPassword('');
        window.location.href = "/";
      } else {
        window.location.href = "/" + e.toLowerCase();
      }
  
    };
  
    if (email !== '' && password !== ''){
        return (
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <img src={baseURLstatic + "/" + logo} style={{ width: '60px' }} alt='' />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {name}
                  </Typography>
        
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                      {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                  <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                      mr: 2,
                      display: { xs: 'flex', md: 'none' },
                      flexGrow: 1,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    LOGO
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {page}
                      </Button>
                    ))}
                  </Box>

                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <h4>Wellcome, {firstName}  {lastName}</h4>
                  </Box>
                  

                  <Box sx={{ flexGrow: 0 }}>
                    <IconButton sx={{marginRight: '10px'}} onClick={() => {window.location.href = "/cart"}}>
                      <ShoppingCartIcon fontSize="large" />
                       <label style={{color: 'white', fontSize: '20px', fontWeight: 'bold', backgroundColor: '#bdbdbd',  borderRadius: '25px', width: '50px', height: '30px'}}>{count}</label>
                    </IconButton>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="https://cdn-icons-png.flaticon.com/512/1390/1390992.png" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={() => {
                            handleCloseUserMenu();
                            getopage(setting);
                        }}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                      
                    </Menu>
                  </Box>
                </Toolbar>
              </Container>
              
            </AppBar>
          );
    
    } else {
        return (
            <AppBar position="static">
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                <img src={baseURLstatic + '/' + logo} style={{ width: '60px' }} alt='' />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    {name}
                  </Typography>
        
                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >
                      {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          <Typography textAlign="center">{page}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                  <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                  <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                      mr: 2,
                      display: { xs: 'flex', md: 'none' },
                      flexGrow: 1,
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'inherit',
                      textDecoration: 'none',
                    }}
                  >
                    LOGO
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {page}
                      </Button>
                    ))}
                  </Box>
        
                  <Box sx={{ flexGrow: 0 }}>
                    <Button variant="contained" color="secondary" href="/sign-in">Sign In</Button>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
          );
    
    }
    
 
}

export default Navbar
