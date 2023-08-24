import React, { useEffect } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import uuid from 'react-uuid';

import axios from "axios";
import { baseURL }from '../../url'


function createData(
    id: number,
    email: string,
    password: any,
  ) {
    return { id, email, password};
  }
  


function ForgotPassword() {

    const [rows, setRows] = React.useState<any>([]);

    useEffect(() => {
      document.title = "จัดการสินค้า";
      const formData = new FormData();
      formData.append('id', "1");
      axios.post(`${baseURL}/all-forgot`, formData).then((response: any) => {
        let new_rows:any = [];
        let data = JSON.parse(response.data);
        console.log(data);
        data.forEach((item: any) => {
          new_rows.push(createData(item.id, item.email, item.password));
        })
        setRows(new_rows);
      });
      }
    , []);
  

    const change = (id: number, email: string) => {
      let new_rows:any = [];
      let password = uuid();
      rows.forEach((item: any) => {
        if(item.id === id) {
          item.password = password;
        }
        new_rows.push(item);
      })
      setRows(new_rows);
      const formData = new FormData();
      formData.append('id', id.toString());
      formData.append('email', email);
      formData.append('password', password);
      axios.post(`${baseURL}/change-forgot`, formData).then((response: any) => {
        console.log(response.data);

      });
        
    }

    const deleteForgot = (id: number) => {
      const formData = new FormData();
      formData.append('id', id.toString());
      axios.post(`${baseURL}/delete-forgot`, formData).then((response: any) => {
        console.log(response.data);
        window.location.reload();
      });
    }
  
    return (
      <div className='ctotTable'>
          <NavbarAdmin />
          <div style={{textAlign: 'center'}}>
              <h1>ผู้ใช้ที่ลืมรหัสผ่าน</h1>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>email</TableCell>
                      <TableCell align="center">password</TableCell>
                      <TableCell align="center">เปลี่ยนรหัส</TableCell>
                      <TableCell align="center">ลบ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row:any) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>{row.email}</TableCell>
                        <TableCell align="center">{row.password}</TableCell>
                        <TableCell align="center">
                        <button className='btn btn-primary' onClick={() => change(row.id, row.email)}>เปลี่ยนรหัส</button>
                        </TableCell>
                        <TableCell align="center">
                        <button className='btn btn-danger' onClick={() => deleteForgot(row.id)}>ลบ</button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </TableContainer>
          </div>
      </div>
    )
}

export default ForgotPassword