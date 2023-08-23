import React, { useEffect } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from "axios";
import { baseURL }from '../../url'

function createData(
  id: number,
  productCode: string,
  productName: string,
  productPrice: number,
) {
  return { id, productCode, productName, productPrice};
}



function ManageProduct() {

  const [rows, setRows] = React.useState<any>([]);

  useEffect(() => {
    document.title = "จัดการสินค้า";
    const formData = new FormData();
    formData.append('id', "1");
    axios.post(`${baseURL}/all-product`, formData).then((response: any) => {
      let new_rows:any = [];
      let data = JSON.parse(response.data);
      data.forEach((item: any) => {
        new_rows.push(createData(item.id, item.productCode, item.productName, item.productPrice));
      })
      setRows(new_rows);
    });
    }
  , []);


  const deleteProduct = (id: number) => {
    const formData = new FormData();
    formData.append('id', id.toString());
    axios.post(`${baseURL}/delete-product`, formData).then((response: any) => {
      console.log(response.data);
      window.location.reload();
    });
  };

  const manage = (id: number) => {
    window.location.href = `/admin/product?id=${id}`;
  };

  return (
    <div>
        <NavbarAdmin />
        <div style={{textAlign: 'center'}}>
            <h1>จัดการสินค้า</h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>รหัสสินค้า</TableCell>
                    <TableCell align="center">ชื่อสินค้า</TableCell>
                    <TableCell align="center">ราคา</TableCell>
                    <TableCell align="center">แก้ไข</TableCell>
                    <TableCell align="center">ลบ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row:any) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell>{row.productCode}</TableCell>
                      <TableCell align="center">
                        {row.productName}
                      </TableCell>
                      <TableCell align="center">{row.productPrice}</TableCell>
                      <TableCell align="center"><Button variant="contained" color='success' onClick={() => {manage(row.id)}}>แก้ไข</Button></TableCell>
                      <TableCell align="center"><Button variant="contained" color='error' onClick={() => {deleteProduct(row.id)}}>ลบ</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
           </TableContainer>
        </div>
    </div>
  )
}

export default ManageProduct