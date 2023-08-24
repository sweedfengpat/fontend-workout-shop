import React, { useEffect } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { baseURL, baseURLstatic }from '../../url'

function createData(
    id: number,
    code: string,
    price: string,
    amount: string,
    total: string,
  ) {
    return { id, code, price, amount, total};
  }

function OrderID() {

    const [rows, setRows] = React.useState<any>([]);
    const [code, setCode] = React.useState<string>("");
    const [price, setPrice] = React.useState<string>("");
    const [amount, setAmount] = React.useState<string>("");
    const [total, setTotal] = React.useState<string>("");
    const [date, setDate] = React.useState<string>("");
    const [image, setImage] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [address, setAddress] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    let { orderId } = useParams();

    useEffect(() => {

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
              if (response.data.Token !== "admin"){
                  window.location.href = "/";
              }
            }
          });
        }


      let id: string = orderId?.toString() || "";
      const formData = new FormData();
      formData.append('id', id);
      axios.post(`${baseURL}/get-order`, formData).then((response: any) => {
            setCode(response.data.code);
            setPrice(response.data.listPrice);
            setAmount(response.data.listAmount);
            setDate(response.data.day);
            setImage(response.data.slipImage);
            setName(response.data.listName);
            setAddress(response.data.address);
            setStatus(response.data.status);

        });
        let new_rows:any = [];
        let listprice = price.split(",");
        let listamount = amount.split(",");
        let listname = name.split(",");
        if (listprice.length === 0){
            listprice = [price];
            listamount = [amount];
            listname = [name];
        }
        let t = 0;
        for (let i = 0; i < listprice.length; i++) {
            let total = parseInt(listprice[i]) * parseInt(listamount[i]);
            new_rows.push(createData(i, listname[i], listprice[i], listamount[i], total.toString()));
            t += total;
        }
        setTotal(t.toString());
        setRows(new_rows);
        
      }
    , [price, amount, name, orderId, rows, email, password]);
  
  
    return (
      <div className='ctotTable'>
          <NavbarAdmin />
          <div style={{textAlign: 'center'}}>
              <div className='row' style={{textAlign: 'left'}}>
                <div className='col-6'>
                    <h1>รหัสการสั่งซื้อ : {code}</h1>
                    <h1>วันที่สั่งซื้อ : {date}</h1>
                    <br />
                    <h1>ที่อยู่ : {address}</h1>
                    <br />
                    <h1>ราคารวม : {total}</h1>
                    <h1>สถานะ : {status}</h1>
                </div>
                <div className='col-6'>
                    <img src={baseURLstatic + "/" + image} alt="" />
                </div>

              </div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>รหัส</TableCell>
                      <TableCell align="center">สินค้า</TableCell>
                      <TableCell align="center">ราคา</TableCell>
                      <TableCell align="center">จำนวน</TableCell>
                        <TableCell align="center">รวม</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row:any) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{row.code}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">{row.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </TableContainer>
             <div style={{textAlign: 'right', marginTop: '10px'}}>
                <h4>ราคารวม {total}</h4>
             </div>
          </div>
      </div>
    )
}

export default OrderID