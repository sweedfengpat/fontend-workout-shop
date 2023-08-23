import NavbarAdmin from '../../components/NavbarAdmin';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { baseURL }from '../../url'

function createData(
  id: number,
  name: string,
) {
  return { id, name};
}



function ManageCategory() {

  const [rows, setRows] = React.useState<any>([]);
    const [categoryName, setCategoryName] = React.useState<any>('');

  useEffect(() => {
    document.title = "จัดการประเภทสินค้า";
    const formData = new FormData();
    formData.append('id', "1");
    axios.post(`${baseURL}/all-category`, formData).then((response: any) => {
      let new_rows:any = [];
      let data = JSON.parse(response.data);
      data.forEach((item: any) => {
        new_rows.push(createData(item.id, item.name));
      })
      setRows(new_rows);
    });
    }
  , []);


  const addCategory = () => {
    const formData = new FormData();
    if (categoryName === '') {
      alert('กรุณากรอกชื่อประเภทสินค้า');
      return;
    }
    formData.append('name', categoryName);
    axios.post(`${baseURL}/add-category`, formData).then((response: any) => {
      console.log(response.data);
      window.location.reload();
    });
  };


  const deleteProduct = (id: number) => {
    if(!window.confirm('คุณต้องการลบประเภทสินค้านี้ใช่หรือไม่?')) {
      return;
    } else {
    const formData = new FormData();
    formData.append('id', id.toString());
    axios.post(`${baseURL}/delete-category`, formData).then((response: any) => {
      console.log(response.data);
      window.location.reload();
    });
  }
  };

  const manage = (id: number) => {
    window.location.href = `/admin/edit-category?id=${id}`;
  };

  return (
    <div>
        <NavbarAdmin />
        <div style={{textAlign: 'center'}}>
            <h1>จัดการประเภทสินค้า</h1>

            <div>
            <TextField
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                  fullWidth
                  id="categoryName"
                  label="ชื่อประเภทสินค้า"
                  name="categoryName"
                  autoComplete="categoryName"
                />
                <Button variant="contained" color='success' sx={{marginTop: '10px'}} onClick={addCategory}>เพิ่มประเภทสินค้า</Button>
            </div>
            <TableContainer component={Paper} sx={{marginTop: '10px'}}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ประเภทสินค้า</TableCell>
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
                      <TableCell>{row.name}</TableCell>
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

export default ManageCategory