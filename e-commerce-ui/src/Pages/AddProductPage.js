import '../App.css';
import tw from 'twin.macro'
import Axios from 'axios'
import UUID from 'uuid-int'
import { useHistory } from 'react-router-dom'
import AdminNavBar from './AdminNavBar'
import AdminProductsNavBar from './AdminProductsNavBar'
import { useEffect, useState } from 'react';
import { getCategories, addProduct, handleImportImage } from '../utils/sellerUtils'

function AddProductPage() {
  const history = useHistory()

  const [Productid, setProductid] = useState(-1)
  const [Categoryid, setCategoryid] = useState(-1)
  const [ProductName, setProductName] = useState("")
  const [ProductDesc, setProductDesc] = useState("")
  const [imgURL, setImgURL] = useState("")
  const [price, setPrice] = useState(-1)
  const [stock, setStock] = useState(-1)
  const [categories, setCategories] = useState([])




  const getCats = async () => {
    const data = await getCategories()
    console.log(data.data)
    setCategories(data.data)
  }

  // RUNS When the page is first mounted
  useEffect(() => {
    getCats()
  }, [])

  const handleImage = async (e) => {

    let url = await handleImportImage(e)
    setImgURL(url)
  }

  const handleAddProduct = async () => {
    let ProductID = UUID(3).uuid()
    //let ProductID = ui.uuid() //uuidv4()
    ProductID = ProductID % 100 + parseInt((Math.random() * 10000))
    console.log(ProductID)

    let CategoryID = parseInt(Categoryid)
    let returnData = await addProduct(ProductID, CategoryID, ProductName, ProductDesc, imgURL, price, stock)
    if (returnData.data) {
      alert("The product has been added succesfully...")
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
          </InputContainer>

          <AddButton onClick={() => handleAddProduct()}>Add Product</AddButton>




        </FormContainer>
      </MainContainer>


    </Container>
  );
}

const Container = tw.div``
const MainContainer = tw.div``
const FormContainer = tw.div`flex flex-col p-4 bg-gray-200 rounded-lg shadow-2xl m-4 w-3/5`
const InputContainer = tw.span`flex p-1 mb-4`
const InputName = tw.h2`font-bold mt-1 w-32 sm:w-48`
const Input = tw.input`ml-2 border-2 rounded-lg p-2 w-5/6`
const TextArea = tw.textarea`ml-2 border-2 rounded-lg p-2 w-5/6 max-h-32`

const Select = tw.select`p-1 w-1/4`
const Option = tw.option``

const AddButton = tw.button`py-1 text-lg text-white bg-gray-800 font-bold rounded-lg border-none w-32
hover:bg-gray-200 hover:text-gray-900 hover:cursor-pointer`

export default AddProductPage;
