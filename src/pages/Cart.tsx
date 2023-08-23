import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from "axios";
import { baseURL, baseURLstatic }from '../url';
import { TextField } from '@mui/material';

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



export default function Cart() {

  const [rows, setRows] = React.useState<any>([]);
  const [email, setEmail] = React.useState<string>('');
  const [total, setTotal] = React.useState<number>(0);

  React.useEffect(() => {
    let e :any = localStorage.getItem('email');
    setEmail(atob(e));
    const formData = new FormData();
    formData.append('email', email);
    axios.post(`${baseURL}/get-cart`, formData).then((response: any) => {
      let new_rows:any = [];
      let data = JSON.parse(response.data);
      let num = 0;
      data.forEach((item: any) => {
        new_rows.push(createData(item.id, item.productName, item.productAmount, item.productPrice, item.productTotal, baseURLstatic + "/" + item.productImage, item.productAmountData));
        num += item.productTotal;
      })
      setTotal(num);
      setRows(new_rows);
    });

  }, [email]);

  const delete_item = (id: number) => {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('email', email);
    axios.post(`${baseURL}/delete-cart`, formData).then((response: any) => {
      console.log(response.data);
      return window.location.reload();
    }
    );
  }

  const addAmount = (amount: number, productAmountData: number, id:number, productPrice: number) => {
    if (amount < productAmountData) {
      setTotal(total + productPrice);
      rows.forEach((item: any) => {
        if (item.id === id) {
          item.productAmount = amount + 1;
          item.productTotal = (amount + 1) * productPrice;
        }
      })
      const formData = new FormData();
      formData.append('id', id.toString());
      formData.append('email', email);
      formData.append('productTotal', (productPrice * (amount + 1)).toString());
      formData.append('productAmount', (amount + 1).toString());
      axios.post(`${baseURL}/update-amount`, formData).then((response: any) => {
      }
      );
    }
}

const minusAmount = (amount: number, productAmountData: number, id:number, productPrice: number) => {
if (amount > 1) {
  setTotal(total - productPrice);
  rows.forEach((item: any) => {
    if (item.id === id) {
      item.productAmount = amount - 1;
      item.productTotal = (amount - 1) * productPrice;
    }
  })
  const formData = new FormData();
  formData.append('id', id.toString());
  formData.append('email', email);
  formData.append('productTotal', (productPrice * (amount - 1)).toString());
  formData.append('productAmount', (amount - 1).toString());
  axios.post(`${baseURL}/update-amount`, formData).then((response: any) => {
  }
  );
}
}


  return (
    <div style={{marginTop: '10px', padding: '20px'}}>
        <h1 style={{textAlign: 'center'}}>ตระกร้า</h1>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>รูป</TableCell>
            <TableCell>สินค้า</TableCell>
            <TableCell align="center">ราคา</TableCell>
            <TableCell align="center">จำนวน</TableCell>
            <TableCell align="center">ยอดรวม</TableCell>
            <TableCell align="center">ลบ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            
            <TableRow key={row.id}>
            <TableCell><img src={row.productImage} alt="" style={{width: '250px'}} /></TableCell>
            <TableCell component="th" scope="row">
              {row.productName}
            </TableCell>
            <TableCell align="center">{row.productPrice}</TableCell>
            <TableCell align="center">
              <Button variant="outlined" color='error' onClick={() => {minusAmount(row.productAmount, row.productAmountData, row.id, row.productPrice)}}>-</Button>
                <TextField type="number" variant="outlined" value={row.productAmount} sx={{marginRight: '10px', marginLeft: '10px'}} 
                 InputProps={{
                  readOnly: true,
                }} />
              <Button variant="outlined" color='error' onClick={() => {addAmount(row.productAmount, row.productAmountData, row.id, row.productPrice)}}>+</Button>
              </TableCell>
            <TableCell align="center" id='total'>{total}</TableCell>
            <TableCell align="center">
            <Button variant="contained" color='error' onClick={() => {delete_item(row.id)}}>ลบ</Button>  
            </TableCell>
          </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
    <div style={{display: 'flex', marginTop: '10px'}}>
        <div style={{width: '50%'}}>
            <button style={{padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px'}} onClick={() => {window.location.href="/checkout"}} >ยืนยันการสั่งซื้อ</button>
        </div>
        <div style={{width: '50%', display: 'flex'}}>
          <div>
            <h1>ราคารวม {total} บาท</h1>
          </div>
          </div>
    </div>
    
    </div>
    </div>
    
  );
}