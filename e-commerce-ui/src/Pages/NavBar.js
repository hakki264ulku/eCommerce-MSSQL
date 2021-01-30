import '../App.css';
import { useEffect, useState } from "react"
import tw from "twin.macro"
import React from "react";
import {
    Link
} from "react-router-dom";

function NavBar() {

    ///const [bol, setBol] = useState(0) // if one static, if two adaptive
    let path = window.location.pathname.split('/')
    let bol = 0


    if (path[path.length - 1] === '') bol = 1


    return (
        <NavContainer>
            <NavButtonsContainer>
                <Link to="/">
                    {bol !== 1 && <NavButton>HOME</NavButton>}
                    {bol === 1 && <ClickedButton>HOME</ClickedButton>}
                </Link>

            </NavButtonsContainer>
        </NavContainer>
    );
}

const NavContainer = tw.div`w-screen font-sans bg-indigo-500 py-4`
const NavButtonsContainer = tw.div`flex `
const NavButton = tw.button`py-2 px-4 font-bold text-white text-xl border-none bg-blue-900 hover:bg-blue-300  hover:cursor-pointer
focus:outline-none hover:shadow-xl hover:text-gray-900 ml-3 rounded-lg`

const ClickedButton = tw.button`py-2 px-4 font-bold text-xl border-none bg-blue-300  hover:cursor-pointer
focus:outline-none shadow-xl text-gray-900 ml-3 rounded-lg`


export default NavBar;