import '../App.css';
import tw from 'twin.macro'
import NavBar from './NavBar'
import UUID from 'uuid-int'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import firebase from '../utils/firebase'

import { getProducts, getCategories, getProductsByCategory, addOrder, getCustomerID } from '../utils/sellerUtils'


function CategoriesPage(props) {
    let path = window.location.pathname.split('/')
    const history = useHistory()

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")
    const [boolean, setBoolean] = useState(false)

    const getProds = async () => {
        console.log("path ", parseInt(path[2]))
        const data = await getProductsByCategory(parseInt(path[2]))
        setProducts(data.data)
    }

    // RUNS When the page is first mounted
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setBoolean(true)
            } else setBoolean(false)
        });
        getProds()
    }, [])

    const handleOrder = async (productID, ProductName, imgURL, price) => {
        let OrderID = UUID(3).uuid()
        OrderID = OrderID % 100 + parseInt((Math.random() * 10000))
        let { ID } = await getCustomerID()
        //console.log(ID)
        await addOrder(OrderID, productID, ID, 1, 0, 0, ProductName, imgURL, price)
    }

    return (
        <Container>
            <NavBar />
            <ProductsContainer>

                {products.map(p => (
                    <ProductCardContainer key={p.ProductID}>
                        <ProductIMG src={p.imgURL} />
                        <ProductName>{p.ProductName}</ProductName>
                        <ProductDesc>{p.ProductDescript}</ProductDesc>
                        <ProductPrice>{p.price}$</ProductPrice>
                        {boolean && <ProductButton onClick={() => handleOrder(p.ProductID, p.ProductName, p.imgURL, p.price)}>ORDER</ProductButton>}
                        {!boolean && <ProductButton onClick={() => alert("In order to order please Login/Sign UP")} >ORDER</ProductButton>}
                    </ProductCardContainer>
                ))}

            </ProductsContainer>


        </Container>
    );
}

const Container = tw.div`font-sans w-screen ml-auto mr-auto`
const ProductsContainer = tw.div`flex flex-wrap justify-center border-solid border-t-2 border-gray-300`
const ProductCardContainer = tw.div`p-4 flex flex-col w-1/4 rounded-lg shadow-lg`
const ProductIMG = tw.img`w-1/2 rounded-lg ml-auto mr-auto`
const ProductName = tw.h2`text-center text-xl font-bold mt-3`
const ProductDesc = tw.h2`text-center mt-3`
const ProductPrice = tw.h2`font-bold text-lg mt-3 text-center`
const ProductButton = tw.button`font-bold text-lg py-1 rounded bg-indigo-400 border-blue-500 w-1/3 mr-auto ml-auto mt-2
hover:cursor-pointer focus:outline-none`


const SelectContainer = tw.div`p-4`
const SelectTitle = tw.h2`text-xl font-bold mt-2 mb-4 ml-1`
const Select = tw.select`p-1 w-1/4 mb-4`
const Option = tw.option``


export default CategoriesPage;
