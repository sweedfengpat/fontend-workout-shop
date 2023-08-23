import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import InputAddress from 'react-thailand-address-autocomplete';
import { baseURL } from '../../url'



function createData(
  id,
  name,
  address,
) {
  return { id, name };
}


function Address() {

  const [addressList, setAddressList] = React.useState([]);
  const [address, setAddress] = React.useState('');
  const [name, setName] = React.useState('');

  const [subdistrict, setSubdistrict] = React.useState('');
  const [district, setDistrict] = React.useState('');
  const [province, setProvince] = React.useState('');
  const [zipcode, setZipcode] = React.useState('');

  function onSelect(fullAddress) {
    const { subdistrict, district, province, zipcode } = fullAddress
    setSubdistrict(subdistrict)
    setDistrict(district)
    setProvince(province)
    setZipcode(zipcode)
  }


  useEffect(() => {
    let e = localStorage.getItem('email');
    let p = localStorage.getItem('password');
    e = atob(e);
    p = atob(p);

    const formData = new FormData();
    formData.append('email', e);
    formData.append('password', p);

    axios.post(`${baseURL}/all-address`, formData).then((response) => {
      let new_rows = [];
      let data = JSON.parse(response.data);
      data.forEach((item) => {
        new_rows.push(createData(item.id, item.name, item.address));
      })
      setAddressList(new_rows);
    });

  }, []);

  const deleteAddress = (id) => {
    if (!window.confirm('คุณต้องการลบที่อยู่นี้ใช่หรือไม่?')) {
      return;
    } else {
      const formData = new FormData();
      formData.append('id', id.toString());
      axios.post(`${baseURL}/delete-address`, formData).then((response) => {
        console.log(response.data);
        window.location.reload();
      });
    }
  };

  const manage = (id) => {
    window.location.href = `/edit-address?id=${id}`;
  };

  const addAddress = () => {
    const formData = new FormData();
    let e = localStorage.getItem('email');
    let p = localStorage.getItem('password');
    e = atob(e);
    p = atob(p);

    let newAddress = `${address} แขวง ${subdistrict} เขต ${district} จังหวัด ${province} ${zipcode}`;

    formData.append('address', newAddress);
    formData.append('name', name);
    formData.append('email', e);
    formData.append('password', p);
    axios.post(`${baseURL}/add-address`, formData).then((response) => {
      console.log(response.data);
      alert('เพิ่มที่อยู่เรียบร้อยแล้ว');
      window.location.reload();
    });
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <h1>จัดการที่อยู่</h1>

        <div>
          <div>
            <TextField id="outlined-basic" label="ชื่อที่อยู่" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
            <br />
            <br />
            <TextField id="outlined-basic" label="ที่อยู่" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
            <br />
            แขวง / ตำบล
            <InputAddress
              address="subdistrict"
              value={subdistrict}
              onChange={(e) => setSubdistrict(e.target.value)}
              onSelect={(value) => onSelect(value)}
            />
            เขต / อำเภอ
            <InputAddress
              address="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              onSelect={(value) => onSelect(value)}
            />
            จังหวัด
            <InputAddress
              address="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              onSelect={(value) => onSelect(value)}
            />
            รหัสไปรษณีย์
            <InputAddress
              address="zipcode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              onSelect={(value) => onSelect(value)}
            />
          </div>


          <Button variant="contained" color='success' sx={{ marginTop: '10px' }} onClick={addAddress}>เพิ่มที่อยู่</Button>
        </div>
        <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ชื่อที่อยู่</TableCell>
                <TableCell align="center">แก้ไข</TableCell>
                <TableCell align="center">ลบ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addressList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="center"><Button variant="contained" color='success' onClick={() => { manage(row.id) }}>แก้ไข</Button></TableCell>
                  <TableCell align="center"><Button variant="contained" color='error' onClick={() => { deleteAddress(row.id) }}>ลบ</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Address