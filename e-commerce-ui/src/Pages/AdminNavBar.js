import '../App.css';
import { useEffect, useState } from "react"
import tw from "twin.macro"
import React from "react";
import {
    Link
} from "react-router-dom";

function AdminNavBar() {

    ///const [bol, setBol] = useState(0) // if one static, if two adaptive
    let path = window.location.pathname.split('/')
    let bol = 0


    if (path[path.length - 1] === 'products') bol = 1
    if (path[path.length - 2] === 'products') bol = 1
    if (path[path.length - 1] === 'categories') bol = 2
    if (path[path.length - 1] === 'orders') bol = 3


    return (
        <NavContainer>
            <NavButtonsContainer>
                <Link to="/admin/products/viewAll">
                    {bol !== 1 && <NavButton>Products</NavButton>}
                    {bol === 1 && <ClickedButton>Products</ClickedButton>}
                </Link>

                <Link to="/admin/categories">
                    {bol !== 2 && <NavButton>Categories</NavButton>}
                    {bol === 2 && <ClickedButton>Categories</ClickedButton>}
                </Link>

                <Link to="/admin/orders">
                    {bol !== 3 && <NavButton>Orders</NavButton>}
                    {bol === 3 && <ClickedButton>Orders</ClickedButton>}
                </Link>
            </NavButtonsContainer>
        </NavContainer>
    );
}

const NavContainer = tw.div`w-screen justify-center font-sans bg-gray-900 py-4`
const NavButtonsContainer = tw.div` flex justify-around`
const NavButton = tw.button`py-2 px-4 font-bold text-white text-xl border-none bg-gray-900 hover:bg-gray-700 rounded-lg hover:cursor-pointer
focus:outline-none hover:shadow-xl`

const ClickedButton = tw.button`py-2 px-4 font-bold text-gray-900 text-xl border-none bg-gray-300 rounded-lg hover:cursor-pointer
focus:outline-none shadow-2xl`


export default AdminNavBar;