import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import axios from "axios";
import { baseURL, baseURLstatic }from '../url'

function createData(
  id: number,
  productCode: string,
  productName: string,
  productDescription: string,
  productImage: string,
  productPrice: number,
  productAmount: number,
) {
  return { id, productCode, productName, productDescription, productImage, productPrice, productAmount};
}


function Home() {

  const [rows, setRows] = React.useState<any>([]);
  const [productType, setProductType] = React.useState<any>([]);

  useEffect(() => {
    document.title = "จัดการสินค้า";
    const formData = new FormData();
    formData.append('id', "1");
    axios.post(`${baseURL}/all-product`, formData).then((response: any) => {
      let new_rows:any = [];
      let listType:any = [];
      let data = JSON.parse(response.data);
      data.forEach((item: any) => {
        new_rows.push(createData(item.id, item.productCode, item.productName, item.productDescription, item.productImage, item.productPrice, item.productAmount));
        if (listType.indexOf(item.productType) === -1)
          {
            listType.push(item.productType);
          }
      })
      setRows(new_rows);
      setProductType(listType);
    });
    }
  , []);

  const addCart = (
    id: number, 
    productName: string,
    productAmount: number,
    productAmountData: number,
    productPrice: number,
    productTotal: number,
    productImage: string,
    ) => {
      if (localStorage.getItem("email") !== "" && localStorage.getItem("email") != null && localStorage.getItem("email") !== undefined) {
        let e :any = localStorage.getItem('email');
        let email = atob(e);
        const formData = new FormData();
        formData.append('email', email);
        formData.append('productID', id.toString());
        formData.append('productName', productName);
        formData.append('productAmount', productAmount.toString());
        formData.append('productPrice', productPrice.toString());
        formData.append('productTotal', productTotal.toString());
        formData.append('productImage', productImage);
        formData.append('productAmountData', productAmountData.toString());
        axios.post(`${baseURL}/add-cart`, formData).then((response: any) => {
          window.location.reload();
        }
      );

    }
  }


  const filterProduct = (e: any) => {
    const formData = new FormData();
    formData.append('id', "1");
    formData.append('productType', e.target.value);
    axios.post(`${baseURL}/filter-product`, formData).then((response: any) => {
      let new_rows:any = [];
      let data = JSON.parse(response.data);
      data.forEach((item: any) => {
        new_rows.push(createData(item.id, item.productCode, item.productName, item.productDescription, item.productImage, item.productPrice, item.productAmount));
      })
      setRows(new_rows);
    });
  }

  return (
        <>
        <div className='mt-5'>
            <h1>สินค้า</h1>
        </div>
        <div className='mt-2' style={{width: '150px'}}>
            <select id="" className='form-control' onChange={(event)=> {filterProduct(event)}}>
                <option value="">เลือกหมวดหมู่</option>
                {productType.map((item: any) => {
                    return (
                        <option value={item}>{item}</option>
                    )
                })}
            </select>
        </div>
      <Grid container spacing={2} sx={{marginTop: '10px'}}>
            {rows.map((row: any) => {
              return (
              <React.Fragment key={row.id}>
                <Grid item xs={3}>
                  <Card sx={{ maxWidth: 345 }} >
                    <img src={baseURLstatic + "/" + row.productImage} style={{width: '100%'}} alt="" />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.productName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.productDescription}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to cart" sx={{marginRight: '1rem'}} onClick={() => {addCart(row.id, row.productName, 1, row.productAmount, row.productPrice, row.productPrice, row.productImage)}}>
                        <AddShoppingCartIcon />
                      </IconButton>
                      <Typography variant="h5" color="primary">
                        ราคา {row.productPrice} บาท
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              </React.Fragment>
              )
            })}

        </Grid>

        </>
  )
}

export default Home