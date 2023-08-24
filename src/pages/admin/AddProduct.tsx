import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FilledInput from '@mui/material/FilledInput';
import NavbarAdmin from '../../components/NavbarAdmin';
import axios from "axios";
import { baseURL }from '../../url'

function createData(
  id: number,
  name: string,
) {
  return { id, name};
}


function AddProduct() {

    const [alertError, setAlertError] = React.useState<number>(200);
    const [productType, setProductType] = React.useState<string>('');
    const [productName, setProductName] = React.useState<string>('');
    const [productPrice, setProductPrice] = React.useState<string>('');
    const [productDescription, setProductDescription] = React.useState<string>('');
    const [productImage, setProductImage] = React.useState<File>();
    const [productCode, setProductCode] = React.useState<string>('');
    const [productAmount, setProductAmount] = React.useState<string>('');
    const [productTypeList, setProductTypeList] = React.useState<any>([]);

    React.useEffect(() => {
      const formData = new FormData();
      formData.append('id', '1');
      axios.post(`${baseURL}/all-category`, formData).then((response: any) => {
        let new_rows:any = [];
        let data = JSON.parse(response.data);
        data.forEach((item: any) => {
          new_rows.push(createData(item.id, item.name));
        })
        setProductTypeList(new_rows);
      });
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProductImage(e.target.files[0]);
        }
      };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('upload', productImage!);
    formData.append('productType', productType);
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productDescription', productDescription);
    formData.append('productCode', productCode);
    formData.append('productAmount', productAmount);
    axios.post(`${baseURL}/add-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response: any) => {
          if (response.data.code === 201){
              window.location.href = '/admin/manage-product';
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
            เพิ่มสินค้า
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ประเภทสินค้า</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={productType}
                    label="ประเภทสินค้า"
                    name='productType'
                    onChange={(e) => setProductType(e.target.value)}
                >
                  {productTypeList.map((row: any) => (
                    <MenuItem key={row.name} value={row.name}>{row.name}</MenuItem>
                  ))}
                </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  required
                  fullWidth
                  id="productCode"
                  label="รหัสสินค้า"
                  name="productCode"
                  autoComplete="productCode"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  fullWidth
                  id="productName"
                  label="ชื่อสินค้า"
                  name="productName"
                  autoComplete="productName"
                />
              </Grid>
              <Grid item xs={12}>
              <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="รายละเอียดสินค้า"
                defaultValue={productDescription}
                name='productDescription'
                onChange={(e) => setProductDescription(e.target.value)}
                style={{width: '100%', height: '5rem'}}
                />
              </Grid>
              <Grid item xs={12}>
              <FilledInput 
              type='file'
                onChange={handleFileChange}
                fullWidth
              />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                  required
                  fullWidth
                  id="productPrice"
                  label="ราคาสินค้า"
                  name="productPrice"
                  autoComplete="productPrice"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  value={productAmount}
                  onChange={(e) => setProductAmount(e.target.value)}
                  required
                  fullWidth
                  id="productAmount"
                  label="จำนวน"
                  name="productAmount"
                  autoComplete="productAmount"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              เพิ่มสินค้า
            </Button>
          </Box>
        </Box>
      </Container>
      </div>
  );
  
}

export default AddProduct
