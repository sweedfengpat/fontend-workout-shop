// import * as React from 'react';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Alert from '@mui/material/Alert';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
// import FilledInput from '@mui/material/FilledInput';
// import NavbarAdmin from '../../components/NavbarAdmin';
// import axios from "axios";
import { baseURL, baseURLstatic } from '../../url'

import { useEffect } from "react";
import React from "react";
//import { baseURL, baseURLstatic } from "lib/url";
import axios from "axios";
import Card from "../../components/card";
import { notification } from "antd";

interface DataInput {
    id: number;
    productCode: string;
    productName: string;
    productPrice: string;
    productAmount: string;
    productImage: string;
    productType: string;
    productDescription: string;
}
// function createData(
//   id: number,
//   name: string,
// ) {
//   return { id, name};
// }


function AddProduct() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const [initData, setInitData] = React.useState<DataInput>({} as DataInput);
  const [productTypeList, setProductTypeList] = React.useState<any>([]);
  const [productImage, setProductImage] = React.useState<File>();
  const [alertError, setAlertError] = React.useState<number>();

  useEffect(() => {
      if (id) {
          const formData = new FormData();
          formData.append('id', id?.toString()!);
          axios.post(`${baseURL}/get-product`, formData).then((response: any) => {
              console.log("get-product", response.data);
              setInitData(response.data);
          }).catch((error) => {
              console.log(error);
          });
      }
  }, []);

  useEffect(() => {
      const formData = new FormData();
      axios.post(`${baseURL}/all-category`, formData).then((response: any) => {
          let new_rows: any = [];
          let data = JSON.parse(response.data);
          console.log("all-category", data);

          setProductTypeList(data);
      });

  }, []);

  const handleSubmit = () => {

      if (id) {
          const formData = new FormData();
          formData.append('productType', initData.productType);
          formData.append('productName', initData.productName);
          formData.append('productPrice', initData.productPrice);
          formData.append('productDescription', initData.productDescription);
          formData.append('productCode', initData.productCode);
          formData.append('productAmount', initData.productAmount.toString());
          formData.append('id', id?.toString()!);
          axios.post(`${baseURL}/update-product`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          }).then((response: any) => {
              if (response.data.code === 200) {
                  notification.success({
                      message: 'แก้ไขข้อมูลสำเร็จ',
                      description:

                          'แก้ไขข้อมูลสำเร็จ',
                  });
                  setTimeout(() => {
                      window.location.href = '/admin/product?id=' + id;
                  }, 2000);
              } else if (response.data.code === 500) {
                  setAlertError(500);
              }
          });
      }else{
          const formData = new FormData();
          formData.append('upload', productImage!);
          formData.append('productType', initData.productType);
          formData.append('productName', initData.productName);
          formData.append('productPrice', initData.productPrice);
          formData.append('productDescription', initData.productDescription);
          formData.append('productCode', initData.productCode);
          formData.append('productAmount', initData.productAmount);
          axios.post(`${baseURL}/add-product`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          }).then((response: any) => {
              console.log("add-product", response.data);
              if (response.data.code === 200) {
                  notification.success({
                      message: 'เพิ่มข้อมูลสำเร็จ',
                      description:
                          'เพิ่มข้อมูลสำเร็จ',
                  });
                  //countdown 2 sec
                  setTimeout(() => {
                      window.location.href = '/admin/product';
                  }, 3000);

                  // window.location.href = "/admin/product";
              } else if (response.data.code === 500) {
                  setAlertError(500);
                  notification.error({
                      message: 'เกิดข้อผิดพลาด',
                      description:
                          'Error 500',
                  });
              }
          });
      }
  //   const [alertError, setAlertError] = React.useState<number>(200);
  //   const [productType, setProductType] = React.useState<string>('');
  //   const [productName, setProductName] = React.useState<string>('');
  //   const [productPrice, setProductPrice] = React.useState<string>('');
  //   const [productDescription, setProductDescription] = React.useState<string>('');
  //   const [productImage, setProductImage] = React.useState<File>();
  //   const [productCode, setProductCode] = React.useState<string>('');
  //   const [productAmount, setProductAmount] = React.useState<string>('');
  //   const [productTypeList, setProductTypeList] = React.useState<any>([]);

  //   React.useEffect(() => {
  //     const formData = new FormData();
  //     formData.append('id', '1');
  //     axios.post(`${baseURL}/all-category`, formData).then((response: any) => {
  //       let new_rows:any = [];
  //       let data = JSON.parse(response.data);
  //       data.forEach((item: any) => {
  //         new_rows.push(createData(item.id, item.name));
  //       })
  //       setProductTypeList(new_rows);
  //     });
  //   }, []);

  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //       if (e.target.files) {
  //           setProductImage(e.target.files[0]);
  //       }
  //     };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('upload', productImage!);
  //   formData.append('productType', productType);
  //   formData.append('productName', productName);
  //   formData.append('productPrice', productPrice);
  //   formData.append('productDescription', productDescription);
  //   formData.append('productCode', productCode);
  //   formData.append('productAmount', productAmount);
  //   axios.post(`${baseURL}/add-product`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }).then((response: any) => {
  //         if (response.data.code === 201){
  //             window.location.href = '/admin/manage-product';
  //         } else if (response.data.code === 500){
  //             setAlertError(500);
  //         } else {
  //           window.location.href = '/admin/manage-product';
  //         }
  //       });
  };

  return (
   // <div>

            <div className="mt-5  h-full grid-cols-1 gap-5 md:grid-cols-2">
                {/* creat form edit and post data input for DataInput */}

                <Card extra={"w-full pb-10 p-4 h-full"}>
                    <header className="relative flex items-center justify-between">
                        <div className="text-xl font-bold text-navy-700 dark:text-black">
                            รายการคลังยา
                        </div>

                    </header>

                    <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
                        <div className="flex flex-col px-5">
                            {/* upload picture card and  preview upload picture*/}
                            <div className="flex flex-col">
                                <label className="text-2xl font-bold">รูปสินค้า</label>
                                <div className="w-96 h-96 mt-2 border-2 rounded-md shadow-md">
                                    <img
                                        className="object-contain w-full h-full "
                                        src={
                                            productImage
                                                ? URL.createObjectURL(productImage)
                                                : initData.productImage
                                                    ? `${baseURLstatic}/${initData.productImage}`
                                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-m7gqrK-fc11svfLdibWGh_U2gD3Rb7HFqg90ZJ0&s"
                                        }
                                        alt=""
                                    />
                                </div>
                                <input
                                    type="file"
                                    className="w-96 h-10 pl-4 mt-2 border-2 rounded-md shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    onChange={(e) => setProductImage(e.target.files![0])}
                                />
                            </div>


                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <label className="text-2xl font-bold">รหัสสินค้า</label>
                                    <input
                                        className="w-96 h-10 pl-4 mt-2 border-2 dark:!text-[#000] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="กรอกรหัสสินค้า"
                                        value={initData.productCode}
                                        onChange={(e) => setInitData({ ...initData, productCode: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-2xl font-bold">ชื่อสินค้า</label>
                                    <input
                                        className="w-96 h-10 pl-4 mt-2 border-2 dark:!text-[#000] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="กรอกชื่อสินค้า"
                                        value={initData.productName}
                                        onChange={(e) => setInitData({ ...initData, productName: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <label className="text-2xl font-bold">ราคาสินค้า</label>
                                    <input
                                        className="w-96 h-10 pl-4 mt-2 border-2 text-[#000] rounded-md dark:!text-[#000] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="กรอกราคาสินค้า"
                                        value={initData.productPrice}
                                        onChange={(e) => setInitData({ ...initData, productPrice: e.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-2xl font-bold">จำนวนสินค้า</label>
                                    <input
                                        className="w-96 h-10 pl-4 mt-2 border-2 rounded-md shadow-md dark:!text-[#000]  focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="กรอกจำนวนสินค้า"
                                        value={initData.productAmount}
                                        onChange={(e) => setInitData({ ...initData, productAmount: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <label className="text-2xl font-bold">ประเภทสินค้า</label>
                                    <select
                                        className="w-96 h-10 pl-4 mt-2 border-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:!text-[#000]"
                                        placeholder="กรอกประเภทสินค้า"
                                        onChange={(e) => setInitData({ ...initData, productType: e.target.value })}
                                        value={initData.productType}
                                    >
                                        <option value="0">กรุณาเลือกประเภทสินค้า</option>
                                        {productTypeList.map((item: any) => (
                                            <option value={item.name} key={item.name}>{item.name}</option>
                                        ))}
                                    </select>

                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-2xl font-bold">รายละเอียดสินค้า</label>
                                <textarea
                                    className="w-96 h-40 pl-4 mt-2 border-2 dark:!text-[#000] rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    placeholder="กรอกรายละเอียดสินค้า"
                                    value={initData.productDescription}
                                    onChange={(e) => setInitData({ ...initData, productDescription: e.target.value })}
                                />
                            </div>




                        </div>
                    </div>
                    {/* submit botton */}
                    <div className="flex flex-row justify-center mt-10">
                        <button
                            className="px-6 py-2 text-lg font-bold text-white transition duration-300 ease-in-out bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none"
                            onClick={() => handleSubmit()}
                        >
                            บันทึก
                        </button>
                    </div>

                </Card>

            </div>
       // </div>
    // <div className='ctotTable'>
    //                   <NavbarAdmin />
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Typography component="h1" variant="h5">
    //         เพิ่มสินค้า
    //       </Typography>
    //       <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
    //         { (() => {
    //             if (alertError !== 200){
    //                 return (<>
    //                     <Alert severity="error" sx={{mb: '1rem'}}>Error!</Alert>
    //                 </>)
    //             }
    //         })()}
    //         <Grid container spacing={2}>
    //           <Grid item xs={12} sm={12}>
    //           <FormControl fullWidth>
    //             <InputLabel id="demo-simple-select-label">ประเภทสินค้า</InputLabel>
    //             <Select
    //                 labelId="demo-simple-select-label"
    //                 id="demo-simple-select"
    //                 value={productType}
    //                 label="ประเภทสินค้า"
    //                 name='productType'
    //                 onChange={(e) => setProductType(e.target.value)}
    //             >
    //               {productTypeList.map((row: any) => (
    //                 <MenuItem key={row.name} value={row.name}>{row.name}</MenuItem>
    //               ))}
    //             </Select>
    //             </FormControl>
    //           </Grid>
    //           <Grid item xs={12} sm={12}>
    //             <TextField
    //               value={productCode}
    //               onChange={(e) => setProductCode(e.target.value)}
    //               required
    //               fullWidth
    //               id="productCode"
    //               label="รหัสสินค้า"
    //               name="productCode"
    //               autoComplete="productCode"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               value={productName}
    //               onChange={(e) => setProductName(e.target.value)}
    //               required
    //               fullWidth
    //               id="productName"
    //               label="ชื่อสินค้า"
    //               name="productName"
    //               autoComplete="productName"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //           <TextareaAutosize
    //             maxRows={4}
    //             aria-label="maximum height"
    //             placeholder="รายละเอียดสินค้า"
    //             defaultValue={productDescription}
    //             name='productDescription'
    //             onChange={(e) => setProductDescription(e.target.value)}
    //             style={{width: '100%', height: '5rem'}}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //           <FilledInput 
    //           type='file'
    //             onChange={handleFileChange}
    //             fullWidth
    //           />
    //           </Grid>
    //           <Grid item xs={12}>
    //           <TextField
    //               value={productPrice}
    //               onChange={(e) => setProductPrice(e.target.value)}
    //               required
    //               fullWidth
    //               id="productPrice"
    //               label="ราคาสินค้า"
    //               name="productPrice"
    //               autoComplete="productPrice"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //           <TextField
    //               value={productAmount}
    //               onChange={(e) => setProductAmount(e.target.value)}
    //               required
    //               fullWidth
    //               id="productAmount"
    //               label="จำนวน"
    //               name="productAmount"
    //               autoComplete="productAmount"
    //             />
    //           </Grid>
    //         </Grid>
    //         <Button
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //         >
    //           เพิ่มสินค้า
    //         </Button>
    //       </Box>
    //     </Box>
    //   </Container>
    //   </div>
  );
  
}

export default AddProduct
