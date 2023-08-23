import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FilledInput from '@mui/material/FilledInput';
import axios from "axios";
import { baseURL, baseURLstatic }from '../../url';
import { TextField } from '@mui/material';

function createDataAddress(
  id: number,
  name: string,
  address: string,
) {
  return { id, name, address};
}

function createData(
  id: number,
  productName: string,
  productAmount: number,
  productPrice: number,
  productTotal: number,
  productImage: string,
  productAmountData: number,
) {
  return { id, productName, productAmount, productPrice, productTotal, productImage, productAmountData};
}


const ItemCart = (props: any) => {
  const [amount] = React.useState<number>(props.productAmount);
  const [total] = React.useState<number>(props.productTotal);
  const [productImage] = React.useState<string>(props.productImage);
  const [productName] = React.useState<string>(props.productName);
  const [productPrice] = React.useState<number>(props.productPrice);
  const [id] = React.useState<number>(props.id);

  return (
            <TableRow key={id}>
              <TableCell><img src={productImage} alt="" style={{width: "50px", height: "50px"}} /></TableCell>
              <TableCell component="th" scope="row">
                {productName}
              </TableCell>
              <TableCell align="center">{productPrice}</TableCell>
              <TableCell align="center">{amount}</TableCell>
              <TableCell align="center" id='total'>{total}</TableCell>
            </TableRow>
  );

}


export default function CheckOut() {

  const [rows, setRows] = React.useState<any>([]);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [total, setTotal] = React.useState<number>(0);
  const [address, setAddress] = React.useState<string>('');
  const [day, setDay] = React.useState<string>('');
  const [slipImage, setSlipImage] = React.useState<File>();
  const [listName, setListName] = React.useState<any>([]);
  const [listPrice, setListPrice] = React.useState<any>([]);
  const [listAmount, setListAmount] = React.useState<any>([]);
  const [listImage, setListImage] = React.useState<any>([]);
  const [listId, setListId] = React.useState<any>([]);
  const [addressList, setAddressList] = React.useState<any>([]);

  React.useEffect(() => {
    let e :any = localStorage.getItem('email');
    let p :any = localStorage.getItem('password');
    e = atob(e);
    p = atob(p);

    setPassword(localStorage.getItem('password') as string);
    const data = new FormData();
    data.append('email', e);
    data.append('password', p);
    axios.post(`${baseURL}/all-address`, data).then((response: any) => {
      let new_rows:any = [];
      let data = JSON.parse(response.data);
      data.forEach((item: any) => {
        new_rows.push(createDataAddress(item.id, item.name, item.address));
      })
      setAddressList(new_rows);
    });
    e = localStorage.getItem('email');
    setEmail(atob(e));
    const formData = new FormData();
    formData.append('email', email);
    setTotal(0);
    axios.post(`${baseURL}/get-cart`, formData).then((response: any) => {
      let new_rows:any = [];
      let data = JSON.parse(response.data);
      let num = 0;
      data.forEach((item: any) => {
        new_rows.push(createData(item.id, item.productName, item.productAmount, item.productPrice, item.productTotal, baseURLstatic + "/" + item.productImage, item.productAmountData));
        num += item.productTotal;
        setListName((listName: any) => [...listName, item.productName]);
        setListPrice((listPrice: any) => [...listPrice, item.productPrice]);
        setListAmount((listAmount: any) => [...listAmount, item.productAmount]);
        setListImage((listImage: any) => [...listImage, item.productImage]);
        setListId((listId: any) => [...listId, item.id]);

      })
      setTotal(num);
      setRows(new_rows);
    });

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    setDay(day + "/" + month + "/" + year);    

  }, [email, password]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        setSlipImage(e.target.files[0]);
    }
  };

  return (
    <div style={{marginTop: '10px', padding: '20px'}}>
        <h1 style={{textAlign: 'center'}}>ชำระเงิน</h1>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>รูป</TableCell>
            <TableCell>สินค้า</TableCell>
            <TableCell align="center">ราคา</TableCell>
            <TableCell align="center">จำนวน</TableCell>
            <TableCell align="center">ยอดรวม</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <ItemCart key={row.id} id={row.id} productName={row.productName} productAmount={row.productAmount} productPrice={row.productPrice} productTotal={row.productPrice * row.productAmount} productImage={row.productImage} productAmountData={row.productAmountData} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
    <div style={{marginTop: '10px'}}>
            <h1>ราคารวม {total} บาท</h1>
    </div>
    <hr />
    <div style={{marginTop: '10px'}}>
        <h1>เลือกที่อยู่จัดส่ง</h1>
        <select name="" className='form-control' onChange={(e) => {setAddress(e.target.value)}}>
          <option value=""></option>
          {addressList.map((item: any) => {
            return <option value={item.address}>{item.name}</option>
          })}
        </select>  
    </div>
    <div style={{marginTop: '10px'}}>
            <h1>ที่อยู่จัดส่ง</h1>
            <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={address}
            variant="outlined"
            sx={{width: '100%', marginBottom: '10px'}}
            value={address}
            onChange={(e) => setAddress(e.target.value)} />
            <Button variant="contained" onClick={() => {setAddress('')}}>Clear</Button>
    </div>

    <div style={{marginTop: '10px'}}>
            <h1>วันที่ : {day}</h1>
    </div>
    
    <div style={{marginTop: '10px', textAlign: 'center'}}>
            <h1>ชำระเงิน</h1>
            <img src={require('../../assets/images/sample-promptpay-qr-code-blurred.jpg')} alt="" 
            style={{width: "200px", height: "200px"}}
            />
    </div>

    <div style={{marginTop: '10px', textAlign: 'center'}}>
    <FilledInput 
              type='file'
                onChange={handleFileChange}
                fullWidth
              />
    </div>

    <div style={{marginTop: '10px', textAlign: 'center'}}>

    <Button variant="contained" onClick={() => {
      const formData = new FormData();
      let listNameString = listName.toString();
      let listPriceString = listPrice.toString();
      let listAmountString = listAmount.toString();
      let listImageString = listImage.toString();
      let listIdString = listId.toString();
      formData.append('listName', listNameString);
      formData.append('listPrice', listPriceString);
      formData.append('listAmount', listAmountString);
      formData.append('listImage', listImageString);
      formData.append('listId', listIdString);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('total', total.toString());
      formData.append('day', day);
      formData.append('productImage', slipImage!);
      axios.post(`${baseURL}/add-order`, formData).then((response: any) => {
          alert('สั่งซื้อสำเร็จ');
          window.location.href = '/cart';
      });
    }}>สั่งซื้อ</Button>
    </div>
    </div>
    </div>
    
  );
}