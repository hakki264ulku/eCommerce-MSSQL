import '../App.css';
import { useEffect, useState } from "react"
import tw from "twin.macro"
import React from "react";
import {
    Link
} from "react-router-dom";

import firebase from '../utils/firebase'

import { logout } from '../utils/AuthServices'

function NavBar(props) {

    const [boolean, setBoolean] = useState(false) // if one static, if two adaptive
    let path = window.location.pathname.split('/')
    let bol = 0

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setBoolean(true)
            } else setBoolean(false)
        });
    }, [])


    if (path[path.length - 1] === '') bol = 1
    if (path[path.length - 1] === 'cart') bol = 2
    if (path[path.length - 1] === 'signUp') bol = 3
    if (path[path.length - 1] === 'login') bol = 4

    const handleClick = async () => {
        await logout()
    }


    return (
        <NavContainer>
            <NavButtonsContainer>
                <Link to="/">
                    {bol !== 1 && <NavButton>HOME</NavButton>}
                    {bol === 1 && <ClickedButton>HOME</ClickedButton>}
                </Link>

                {!boolean &&
                    <Container>
                        <Link to="/signUp">
                            {bol !== 3 && <NavButton>Sign Up</NavButton>}
                            {bol === 3 && <ClickedButton>Sign Up</ClickedButton>}
                        </Link>
                        <Link to="/login">
                            {bol !== 4 && <NavButton>Login</NavButton>}
                            {bol === 4 && <ClickedButton>Login</ClickedButton>}
                        </Link>
                    </Container>
                }



                {boolean &&
                    <Container>
                        <Link to="/cart">
                            {bol !== 2 && <NavButton>YOUR CART</NavButton>}
                            {bol === 2 && <ClickedButton>YOUR CART</ClickedButton>}
                        </Link>

                        <NavButton onClick={() => handleClick()}>Log Out</NavButton>
                    </Container>
                }
            </NavButtonsContainer>
        </NavContainer>
    );
}

const NavContainer = tw.div`w-screen font-sans bg-indigo-500 py-4`
const NavButtonsContainer = tw.div`flex justify-between`
const NavButton = tw.button`py-2 px-4 font-bold text-white text-xl border-none bg-blue-900 hover:bg-blue-300  hover:cursor-pointer
focus:outline-none hover:shadow-xl hover:text-gray-900 ml-3 rounded-lg mr-2`

const Container = tw.div`flex`

const ClickedButton = tw.button`py-2 px-4 font-bold text-xl border-none bg-blue-300  hover:cursor-pointer
focus:outline-none shadow-xl text-gray-900 ml-3 rounded-lg mr-2`


export default NavBar;