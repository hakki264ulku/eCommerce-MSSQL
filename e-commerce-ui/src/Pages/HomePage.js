import '../App.css';
import tw from 'twin.macro'
import NavBar from './NavBar'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'

import { getProducts, getCategories } from '../utils/sellerUtils'

function HomePage() {
    const history = useHistory()
    let path = window.location.pathname.split('/')

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState("")

    const getProds = async () => {
        const data = await getProducts()
        console.log(data.data)
        setProducts(data.data)
    }

    const getCats = async () => {
        const data = await getCategories()
        setCategories(data.data)
        return data.data
    }

    // RUNS When the page is first mounted
    useEffect(() => {
        getProds()
        getCats()
    }, [])

    const handleChangeSelect = async (value) => {
        // let data = await getProductsByCategory(parseInt(value.split(".")[1]))
        // let newArr = data.data.recordsets
        history.push(`/categories/${value.split(".")[1]}`)
    }


    return (
        <Container>
            <NavBar />
            <SelectContainer>
                <SelectTitle>Choose Category To List Products</SelectTitle>
                <Select onChange={(e) => handleChangeSelect(e.target.value)} >
                    <Option>{`Categories`}</Option>
                    {categories.map(c => (
                        <Option key={c.CategoryID}>{`${c.CategoryName}.${c.CategoryID}`}</Option>
                    ))}
                </Select>
            </SelectContainer>

            <ProductsContainer>

                {products.map(p => (
                    <ProductCardContainer key={p.ProductID}>
                        <ProductIMG src={p.imgURL} />
                        <ProductName>{p.ProductName}</ProductName>
                        <ProductDesc>{p.ProductDescript}</ProductDesc>
                        <ProductPrice>150$</ProductPrice>
                        
                        <ButtonContainer>
                            <ProductButton>ORDER</ProductButton>
                        </ButtonContainer>
                    </ProductCardContainer>
                ))}

            </ProductsContainer>


        </Container>
    );
}

const Container = tw.div`font-sans w-screen ml-auto mr-auto`
const ProductsContainer = tw.div`flex flex-wrap justify-center`

const ProductCardContainer = tw.div`p-4 flex flex-col w-1/4 rounded-lg shadow-lg`
const ProductIMG = tw.img`w-1/2 rounded-lg ml-auto mr-auto`
const ProductName = tw.h2`text-center text-xl font-bold mt-3`
const ProductDesc = tw.h2`text-center mt-3`
const ProductPrice = tw.h2`font-bold text-lg mt-3 text-center`

const ButtonContainer = tw.div`flex items-stretch h-1/2`
const ProductButton = tw.button`font-bold text-lg py-1 rounded bg-indigo-400 border-blue-500 w-1/3 mr-auto ml-auto mt-2
hover:cursor-pointer focus:outline-none self-end`

const SelectContainer = tw.div`p-4`
const SelectTitle = tw.h2`text-xl font-bold mt-2 mb-4 ml-1`
const Select = tw.select`p-1 w-1/4 mb-4`
const Option = tw.option``

export default HomePage;
