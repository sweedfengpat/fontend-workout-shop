import React, { useEffect } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import { baseURL }from '../../url'



function EditCategory() {

    const [name, setName] = React.useState<any>("");

    useEffect(() => {
      document.title = "แก้ไขประเภทสินค้า";
      const formData = new FormData();
        // get param
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        formData.append('id', id?.toString()|| "");
        axios.post(`${baseURL}/get-category`, formData).then((response: any) => {
            let data = response.data;
            setName(data.name);
            }
        );
      }
    , []);
  

    const handleChange = (event: any) => {
        let text = "คุณต้องการเปลี่ยนชื่อประเภทสินค้าใช่หรือไม่";
        if (window.confirm(text)) {
            const formData = new FormData();
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            formData.append('id', id?.toString()|| "");
            formData.append('name', name);
            axios.post(`${baseURL}/update-category`, formData).then((response: any) => {
                    alert("เปลี่ยนชื่อประเภทสินค้าเรียบร้อย");
                    window.location.reload();
            });
        } else {
            event.target.value = "รอตรวจสอบ";
        }
    }

            
    return (
        <div className='ctotTable'>
        <NavbarAdmin />
        <div style={{textAlign: 'center'}}>
            <h1>แก้ไขประเภทสินค้า</h1>

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
                <Button variant="contained" color='success' sx={{marginTop: '10px'}} onClick={handleChange}>แก้ไขประเภทสินค้า</Button>
            </div>
        </div>
    </div>
    )
}

export default EditCategory