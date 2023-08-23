import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import axios from "axios";
import { baseURL }from '../../url'



function EditAddress() {

    const [name, setName] = React.useState<any>("");
    const [address, setAddress] = React.useState<any>("");

    useEffect(() => {
      document.title = "แก้ไขที่อยู่";
      const formData = new FormData();
        // get param
        let e :any = localStorage.getItem('email');
        let p :any = localStorage.getItem('password');
        e = atob(e);
        p = atob(p);
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        formData.append('email', e);
        formData.append('password', p);
        formData.append('id', id?.toString()|| "");
        axios.post(`${baseURL}/get-address`, formData).then((response: any) => {
            let data = response.data;
            setName(data.name);
            setAddress(data.address);
            }
        );
      }
    , []);
  

    const handleChange = (event: any) => {
        let text = "คุณต้องการเปลี่ยนข้อมูลใช่หรือไม่";
        if (window.confirm(text)) {
            let e :any = localStorage.getItem('email');
            let p :any = localStorage.getItem('password');
            e = atob(e);
            p = atob(p);
            const formData = new FormData();
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            formData.append('id', id?.toString()|| "");
            formData.append('name', name);
            formData.append('address', address);
            formData.append('email', e);
            formData.append('password', p);
            axios.post(`${baseURL}/update-address`, formData).then((response: any) => {
                    alert("เปลี่ยนข้อมูลเรียบร้อย");
                    window.location.reload();
            });
        } else {
            event.target.value = "รอตรวจสอบ";
        }
    }

            
    return (
        <div>
        <div style={{textAlign: 'center', marginTop: '10px'}}>
            <h1>แก้ไขข้อมูลที่อยู่</h1>

            <div>
            <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  fullWidth
                  id="categoryName"
                  label="ชื่อประเภทสินค้า"
                  name="categoryName"
                  autoComplete="categoryName"
                />
                                <TextareaAutosize
                    aria-label="Address"
                    minRows={4}
                    placeholder="ที่อยู่"
                    style={{width: '100%', marginTop: '10px', marginBottom: '10px', padding: '10px'}}
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    />
                <Button variant="contained" color='success' sx={{marginTop: '10px'}} onClick={handleChange}>แก้ไขข้อมูล</Button>
            </div>
        </div>
    </div>
    )
}

export default EditAddress