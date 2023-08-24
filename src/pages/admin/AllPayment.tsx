import React, { useEffect } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
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
    total: string,
    date: string,
    status: string,
    amount: string,
  ) {
    return { id, code, total, date, status, amount};
  }
  

function AllPayment() {

    const [rows, setRows] = React.useState<any>([]);
    const [total, setTotal] = React.useState<any>(0);

    useEffect(() => {
      const formData = new FormData();
      formData.append('id', "1");
      axios.post(`${baseURL}/all-order-payment`, formData).then((response: any) => {
        let new_rows:any = [];
        let data = JSON.parse(response.data);
        let total = 0;
        data.forEach((item: any) => {
            
            let date = [];
            date = item.day.split('/');
            let now = new Date();
            if (parseInt(date[2]) === now.getFullYear() && parseInt(date[1]) === (now.getMonth()+1)){
                let amount = [];
                amount = item.listAmount.split(',');
                if (amount.length === 0) {
                    amount = [item.listAmount];
                }
                let total_amount = 0;
                amount.forEach((item1: any) => {
                    total_amount += parseInt(item1);
                })

                new_rows.push(createData(item.id, item.code, item.total, item.day, item.status, total_amount.toString()));
                total += parseInt(item.total);
            }

        })
        setTotal(total);
        setRows(new_rows);
      });
      }
    , []);

  
    return (
      <div className='ctotTable'>
          <NavbarAdmin />
          <div style={{textAlign: 'center'}}>
              <h1>ยอดขายรายเดือน</h1>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>รหัส</TableCell>
                      <TableCell align="center">จำนวน</TableCell>
                      <TableCell align="center">ราคา</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row:any) => (
                      <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell><Link to={'/admin/order/'+row.id}><SearchIcon color='success'></SearchIcon></Link>{row.code}</TableCell>
                        <TableCell align="center">{row.amount}</TableCell>
                        <TableCell align="center">{row.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
             </TableContainer>

             <div style={{marginTop: '10px'}}>
                <h4>ราคารวม {total}</h4>
             </div>
          </div>
      </div>
    )
}

export default AllPayment