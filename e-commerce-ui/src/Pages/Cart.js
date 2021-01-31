import '../App.css';
import tw from 'twin.macro'
import NavBar from './NavBar'
import UUID from 'uuid-int'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import firebase from '../utils/firebase'

import { getOrders, deleteOrder, getCustomer, deleteOrders } from '../utils/sellerUtils'


function Cart(props) {

    const [orders, setOrders] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState("")
    const [customerid, setCustomerID] = useState("")


    const getUserInfo = async () => {
        let data = await getCustomer()
        console.log("customer data: ",data.data[0])
        setAddress(data.data[0].CustomerAddress)
        setCustomerID(data.data[0].CustomerID)

    }

    const getOrd = async () => {
        let data = await getOrders()
        console.log(data.data)
        setOrders(data.data)
        let count = 0
        for (const order of data.data) {
            count += order.price
        }
        setTotal(count)
        return data.data
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                props.history.push('/')
            } else return
        });

        getOrd()
        getUserInfo()

    }, [])

    const handleDelete = async (orderid) => {
        let newOrders = [...orders]
        newOrders = newOrders.filter((o) => {
            if (orderid === o.OrderID) return false
            return true
        })
        let count = 0
        for (const order of newOrders) {
            count += order.price
        }
        setTotal(count)
        setOrders(newOrders)

        await deleteOrder(orderid)

    }

    const handleOrder = async () => {
        try {
            let data = await deleteOrders(customerid)
            console.log(data)
        } catch (e) {
            console.log(e)
            alert("An error occured....")
            return
        }
        alert(`Your orders are taken for sending to the address that you have supplied: ${address}`)

    }


    return (
        <Container>
            <NavBar />
            <MainContainer>

                <ProductsTable>
                    <TableHead>
                        <TableRow>
                            <TableHeader>Image</TableHeader>
                            <TableHeader>Product Name</TableHeader>
                            <TableHeader>Price</TableHeader>
                            <TableHeader>Cancel</TableHeader>
                        </TableRow>
                    </TableHead>
                    <ProductContainer>
                        {orders.map(p => (
                            <TableRow key={p.OrderID}>
                                <TableData><IMG src={p.imgURL} /></TableData>
                                <TableData>{p.ProductName}</TableData>
                                <TableData>{p.price}$</TableData>
                                <TableData><DelButton onClick={() => handleDelete(p.OrderID)} >X</DelButton></TableData>
                            </TableRow>
                        ))}
                    </ProductContainer>
                </ProductsTable>
                <OrderContainer>
                    <OrderTotal>Address of order: {address}</OrderTotal>
                    <OrderTotal>Total Price: ${total}</OrderTotal>
                    <OrderButton onClick={()=>handleOrder()} >Order These</OrderButton>
                </OrderContainer>


            </MainContainer>


        </Container>
    );
}

const Container = tw.div`font-sans`

const MainContainer = tw.div`w-screen`
const ProductsTable = tw.table`w-1/3 table-auto text-center m-3`
const TableHead = tw.thead`bg-gray-200`
const TableHeader = tw.th`font-bold text-yellow-200 text-xl bg-gray-400 p-2`
const TableRow = tw.tr`bg-gray-100`
const TableData = tw.td`text-base items-start align-middle`

const DelButton = tw.button`p-2 font-bold border-none focus:outline-none bg-red-500 rounded-lg
hover:cursor-pointer hover:bg-red-600`

const IMG = tw.img`w-16 h-auto rounded-xl`
const ProductContainer = tw.tbody``

const OrderContainer = tw.div`p-6 mt-2 pr-12 flex flex-col
border-gray-400 border-solid border-2`
const OrderButton = tw.button`p-3 font-bold border-none bg-green-400 rounded-xl
hover:cursor-pointer hover:bg-green-500 focus:outline-none w-1/5`
const OrderTotal = tw.h2`font-bold mb-2`


export default Cart;
