import '../App.css';
import { useEffect, useState } from "react"
import tw from "twin.macro"
import React from "react";
import {
    Link
} from "react-router-dom";

function AdminProductsNavBar() {

    ///const [bol, setBol] = useState(0) // if one static, if two adaptive
    let path = window.location.pathname.split('/')
    let bol = 0


    if (path[path.length - 1] === 'viewAll') bol = 1
    if (path[path.length - 1] === 'addProduct') bol = 2


    return (
        <NavContainer>
            <NavButtonsContainer>
                <Link to="/admin/products/viewAll">
                    {bol !== 1 && <NavButton>View All Products</NavButton>}
                    {bol === 1 && <ClickedButton>View All Products</ClickedButton>}
                </Link>

                <Link to="/admin/products/addProduct">
                    {bol !== 2 && <NavButton>Add Product</NavButton>}
                    {bol === 2 && <ClickedButton>Add Product</ClickedButton>}
                </Link>

            </NavButtonsContainer>
        </NavContainer>
    );
}

const NavContainer = tw.div`w-screen justify-center font-sans bg-gray-900 py-3`
const NavButtonsContainer = tw.div` flex`
const NavButton = tw.button`py-1 px-2 ml-3 font-bold text-white border-none bg-gray-900 hover:bg-gray-700 rounded-lg hover:cursor-pointer
focus:outline-none hover:shadow-xl`

const ClickedButton = tw.button`py-1 px-2 ml-3 font-bold text-gray-900 border-none bg-gray-300 rounded-lg hover:cursor-pointer
focus:outline-none shadow-2xl`


export default AdminProductsNavBar;