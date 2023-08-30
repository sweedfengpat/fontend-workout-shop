import React from 'react'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import NavbarAdmin from '../../components/NavbarAdmin';
import Button from '@mui/material/Button';
import axios from "axios";
import { baseURL }from '../../url'


function Track() {

    let { id } = useParams();

    const [code, setCode] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    
  return (
    <div className='ctotTable'>
            <NavbarAdmin />
          <div style={{textAlign: 'center'}}>
              <h1>ส่งข้อมูลขพัสดุ</h1>

              <form>
                <TextField
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  fullWidth
                  id="code"
                  label="รหัสพัสดุ"
                  name="code"
                  autoComplete="code"
                />
                <br /> <br />
                <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="รายละเอียด"
                defaultValue={description}
                name='description'
                onChange={(e) => setDescription(e.target.value)}
                style={{width: '100%', height: '5rem'}}
                />
                <br />
                <br />
                <Button variant="contained" onClick={() => { 
                 let  id_int : number = parseInt(id as string);
                 const formData = new FormData();
                    formData.append('track', code);
                    formData.append('description', description);
                    formData.append('id', id_int.toString());
                  axios.post(`${baseURL}/track`, formData)
                  .then((response: any) => {
                    console.log(response.data);
                    if (response.data.code === 200){
                      window.location.href = '/admin/shipping'
                    } else {
                      alert('เกิดข้อผิดพลาด');
                    }
                  })
                  .catch((error: any) => {
                    console.log(error);
                  });
                } }>ส่งข้อมูล</Button>

              </form>
          </div>
    </div>
  )
}

export default Track
