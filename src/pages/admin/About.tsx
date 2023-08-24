import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import FilledInput from '@mui/material/FilledInput';
import NavbarAdmin from '../../components/NavbarAdmin';
import axios from "axios";
import { baseURL, baseURLstatic }from '../../url'

function About() {

    const [alertError, setAlertError] = React.useState<number>(200);
    const [productImage, setProductImage] = React.useState<File>();
    const [address, setAddress] = React.useState<string>('');
    const [phone, setPhone] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [logo, setLogo] = React.useState<string>('');


    React.useEffect(() => {
      axios.post(`${baseURL}/about`).then((response: any) => {
        setLogo(response.data.logo);
        setName(response.data.name);
        setPhone(response.data.phone);
        setAddress(response.data.address);
      });

    }, []);



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProductImage(e.target.files[0]);
            console.log(productImage);
        }
      };

      const handleFileChange2 = () => {
        if (productImage) {
            setProductImage(productImage);
            const formData = new FormData();
            formData.append('upload', productImage!);
            console.log(productImage);
            axios.post(`${baseURL}/add-about-image`, formData, {

            }).then((response: any) => {
                console.log(response.data);
                window.location.href = '/admin/about';

            });
        }
      };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('name', name);
    axios.post(`${baseURL}/update-about`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response: any) => {
          if (response.data.code === 201){
              window.location.href = '/admin/about';
          } else if (response.data.code === 500){
              setAlertError(500);
          } else {
            window.location.href = '/admin/manage-product';
          }
        });
  };

  return (
    <div className='ctotTable'>
      <NavbarAdmin />
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
            เกี่ยวกับร้าน
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            { (() => {
                if (alertError !== 200){
                    return (<>
                        <Alert severity="error" sx={{mb: '1rem'}}>Error!</Alert>
                    </>)
                }
            })()}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
              <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  id="name"
                  label="ชื่อร้าน"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  fullWidth
                  id="phone"
                  label="เบอร์โทร"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  fullWidth
                  id="address"
                  label="ที่อยู่ร้าน"
                  name="address"
                  autoComplete="address"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            แก้ไข
            </Button>
          </Box>
            <Box sx={{ mt: 5 }}>
              <img src={baseURLstatic + '/' + logo} width={100} height={100} alt="" />
              <form onSubmit={handleFileChange2}>
            <Grid item xs={12}>
              <FilledInput 
              type='file'
                onChange={handleFileChange}
                fullWidth
                required
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            แก้ไข รูป
            </Button>
            </form>
            </Box>

        </Box>
      </Container>
      </div>
  );
  
}

export default About
