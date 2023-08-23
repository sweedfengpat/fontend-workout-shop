import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import axios from "axios";
import { baseURL }from '../../url'


function createData(
    id: number,
    code: string,
    price: string,
    date: string,
    status: string,
  ) {
    return { id, code, price, date, status};
  }
  


function History() {

    const [rows, setRows] = React.useState<any>([]);
    const [email, setEmail] = React.useState<string>('');

    useEffect(() => {
      let e :any = localStorage.getItem('email');
      setEmail(atob(e));
      const formData = new FormData();
      formData.append('email', email);
      axios.post(`${baseURL}/history`, formData).then((response: any) => {
        let new_rows:any = [];
        let data = JSON.parse(response.data);
        data.forEach((item: any) => {
          new_rows.push(createData(item.id, item.code, item.total, item.day, item.status));
        })
        setRows(new_rows);
      });
      }
    , [email]);
  
  
    return (
      <div>
          <div style={{textAlign: 'center', marginTop: '20px'}}>
              <h1>History</h1>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>รหัส</TableCell>
                      <TableCell align="center">วันที่ทำรายการ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row:any) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell><Link to={'/order/'+row.id}><SearchIcon color='success'></SearchIcon></Link>{row.code}</TableCell>
                        <TableCell align="center">{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </TableContainer>
          </div>
      </div>
    )
}

export default History