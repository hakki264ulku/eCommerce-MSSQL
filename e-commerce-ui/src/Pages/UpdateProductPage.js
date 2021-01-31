import '../App.css';
import tw from 'twin.macro'
import Axios from 'axios'
import UUID from 'uuid-int'
import { useHistory } from 'react-router-dom'
import AdminNavBar from './AdminNavBar'
import AdminProductsNavBar from './AdminProductsNavBar'
import { useEffect, useState } from 'react';
import { getCategories, getProductByID, handleImportImage, addProduct, updateProduct } from '../utils/sellerUtils'


function UpdateProductPage() {
    const history = useHistory()

    const [ProductID, setProductid] = useState(-1)
    const [Categoryid, setCategoryid] = useState(-1)
    const [ProductName, setProductName] = useState("")
    const [ProductDesc, setProductDesc] = useState("")
    const [imgURL, setImgURL] = useState("")
    const [price, setPrice] = useState(-1)
    const [stock, setStock] = useState(-1)
    const [categories, setCategories] = useState([])

    const [product, setProduct] = useState({})
    let path = window.location.pathname.split('/')

    const getPr = async () => {
        let productid = path[4]
        let data = await getProductByID(productid)
        let p = data.data[0]
        setProductid(p.ProductID)
        setCategoryid(p.CategoryID)
        setProductName(p.ProductName)
        setProductDesc(p.ProductDescript)
        setImgURL(p.imgURL)
        setPrice(p.price)
        setStock(p.stock)

        setProduct(data.data[0])
    }

    const getCats = async () => {
        const data = await getCategories()
        console.log(data.data)
        setCategories(data.data)
      }


    // GET ALL Products when the page is first mounted
    useEffect(() => {
        getPr()
        getCats()
    }, [])

    const handleImage = async (e) => {

        let url = await handleImportImage(e)
        setImgURL(url)
    }

    const handleUpdateProduct = async () => {

        let CategoryID = parseInt(Categoryid)
        let returnData = await updateProduct(ProductID, CategoryID, ProductName, ProductDesc, imgURL, price, stock)
        console.log(returnData)
        if (returnData.data) {
            alert("The product has been Updated succesfully...")
            history.push("/admin/products/viewAll")
        }
    }



        return (
            <Container>
                <AdminNavBar />
                <AdminProductsNavBar />
                <MainContainer>
                    <FormContainer>
                        <InputContainer>
                            <InputName>Product Name: </InputName>
                            <Input value={ProductName} onChange={(e) => setProductName(e.target.value)} />
                        </InputContainer>

                        <InputContainer>
                            <InputName>Product Description: </InputName>
                            <TextArea value={ProductDesc} onChange={(e) => setProductDesc(e.target.value)} />
                        </InputContainer>

                        <InputContainer>
                            <InputName>Price: </InputName>
                            <Input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                        </InputContainer>

                        <InputContainer>
                            <InputName>Stock: </InputName>
                            <Input value={stock} onChange={e => setStock(e.target.value)} type="number" />
                        </InputContainer>

                        <InputContainer>
                            <InputName>Category & CategoryID: </InputName>
                            <Select onChange={e => setCategoryid(e.target.value.split('.')[1])}>
                                <Option>{`Choose the category otherwise, there'll be error`}</Option>
                                {categories.map(c => (
                                    <Option key={c.CategoryID} id={c.CategoryID}>{`${c.CategoryName}.${c.CategoryID}`}</Option>
                                ))}
                            </Select>
                        </InputContainer>

                        <InputContainer>
                            <InputName>Add Image: </InputName>
                            <Input type="file" onChange={(e) => handleImage(e)} />
                            <IMG src={imgURL}/>
                        </InputContainer>

                        <AddButton onClick={() => handleUpdateProduct()}>Update Product</AddButton>

                    </FormContainer>
                </MainContainer>




            </Container>
        )
    }

const Container = tw.div`font-sans`


const MainContainer = tw.div``
const FormContainer = tw.div`flex flex-col p-4 bg-gray-200 rounded-lg shadow-2xl m-4 w-3/5`
const InputContainer = tw.span`flex p-1 mb-4`
const InputName = tw.h2`font-bold mt-1 w-32 sm:w-48`
const Input = tw.input`ml-2 border-2 rounded-lg p-2 w-5/6`
const TextArea = tw.textarea`ml-2 border-2 rounded-lg p-2 w-5/6 max-h-32`

const IMG = tw.img`w-24 h-auto rounded-xl`

const Select = tw.select`p-1 w-1/4`
const Option = tw.option``

const AddButton = tw.button`py-1 text-lg text-white bg-gray-800 font-bold rounded-lg border-none w-48
hover:bg-gray-300 hover:text-gray-900 hover:cursor-pointer`

export default UpdateProductPage
