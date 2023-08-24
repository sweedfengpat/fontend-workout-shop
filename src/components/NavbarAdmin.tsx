import React from 'react';
import { Link } from 'react-router-dom';

function NavbarAdmin() {

  return (
    <div style={{width: '200px'}}>
        <div style={{display: 'flex', alignItems: 'start', justifyItems: 'start', flexDirection: 'column'}} className="mb-5">
            <Link to={"/admin/manage-product"}>
                <button style={{marginLeft: 'auto', minWidth:"160px"}} className="btn btn-warning me-2 mt-3 ">
                    จัดการสินค้า
                </button>
            </Link>
            <Link to={"/admin/add-product"}>
                <button style={{marginLeft: 'auto', minWidth:"160px"}} className="btn btn-warning me-2 mt-3">
                    เพิ่มสินค้า
                </button>
            </Link>
            <Link to={"/admin/category"}>
                <button style={{marginLeft: 'auto', minWidth:"160px"}} className="btn btn-warning me-2 mt-3">
                    ประเภทสินค้า
                </button>
            </Link>
            <Link to={"/admin/order"}>
            <button className="btn btn-warning me-2 mt-3" style={{ minWidth:"160px"}}>
                ตรวจสอบการสั่งซื้อ
            </button>
            </Link>
            <Link to={"/admin/shipping"}>
            <button className="btn btn-warning me-2 mt-3" style={{ minWidth:"160px"}}>
                ตรวจสอบการส่งสินค้า
            </button>
            </Link>
            <Link to={"/admin/all-payment"}>
            <button style={{marginRight: 'auto', minWidth:"160px"}} className="btn btn-warning me-2 mt-3">
                ยอดขายรายเดือน
            </button>
            </Link>
            <Link to={"/admin/about"}>
            <button style={{marginRight: 'auto', minWidth:"160px"}} className="btn btn-success me-2 mt-3">
                เกี่ยวกับร้าน
            </button>
            </Link>
        </div>
    </div>
  )
}

export default NavbarAdmin