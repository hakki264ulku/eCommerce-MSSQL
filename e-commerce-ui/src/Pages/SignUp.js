import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'
import 'twin.macro'
import UUID from 'uuid-int'

import NavBar from './NavBar'
import { signUp } from '../utils/AuthServices'
import firebase from '../utils/firebase'


function SignUp(props) {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                props.history.push('/')
            } else return
        });
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [username, setUsername] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        let CustomerID = UUID(3).uuid()
        //let ProductID = ui.uuid() //uuidv4()
        CustomerID = CustomerID % 100 + parseInt((Math.random() * 10000))



        e.preventDefault()
        if (password !== passwordConfirm) {
            alert('Passwords do not match!')
            return
        }
        if (!username) {
            alert('Please enter your username')
            return
        }
        if (!address) {
            alert('Please enter your address')
            return
        }
        if (!phoneNumber) {
            alert('Please enter your phone number')
            return
        }

        try {
            //setIsLoading(true)
            await signUp(CustomerID, username, email, password, address, phoneNumber)
            //setIsLoading(false)



            //props.history.push('/')
            console.log("Auth is succesfull....")
        } catch (e) {
            alert(e.message)
        }
    }
    //CustomerID, FullName, CustomerEmail, CustomerPassword, CustomerAddress, CustomerPhone
    return (
        <Container>
            <NavBar />
            <FormContainer>
                <Form onSubmit={async (e) => await handleSubmit(e)}>
                    <Label>Email</Label>
                    <Input type='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Label>Password</Label>
                    <Input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Label>Confirm Password</Label>
                    <Input type='password' placeholder='confirm password' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                    <Label>Customer Name</Label>
                    <Input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Label>Customer Address</Label>
                    <TextArea type='text' placeholder="Please enter your address" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <Label>Phone Number</Label>
                    <Input type='text' placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

                    <Button>Sign Up</Button>
                </Form>
            </FormContainer>
        </Container>
    );
}

const Container = tw.div`w-screen h-screen bg-gray-200 font-sans`

const FormContainer = tw.div`w-screen justify-center items-center flex mt-8 sm:mt-12`
const Form = tw.form`flex flex-col justify-center items-center bg-white shadow-lg rounded-md p-4 sm:p-8 w-4/5 sm:w-1/4`
const Label = tw.label`font-bold text-gray-900 text-lg mb-2`
const Button = tw.button`p-2 sm:px-4 sm:py-3 font-bold text-white text-lg bg-indigo-400 hover:bg-indigo-500
focus:outline-none hover:cursor-pointer border-none rounded-lg mt-6`
const Input = tw.input`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight mb-4 focus:outline-none`

const TextArea = tw.textarea`border-2 rounded-lg p-2 w-full max-h-32`


export default SignUp;