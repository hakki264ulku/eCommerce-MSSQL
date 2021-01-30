import '../App.css';
import tw from 'twin.macro'
import AdminNavBar from './AdminNavBar'
import UUID from 'uuid-int'
import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getCategories, handleImportImage, addCategory } from '../utils/sellerUtils'

function AdminCategoriesPage() {
  const history = useHistory()

  const [CategoryName, setCategoryName] = useState("")
  const [CategoryDescription, setCategoryDescription] = useState("")
  const [imgURL, setImgURL] = useState("")
  //const [CategoryID, setCategoryID] = useState("")
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

  const handleAddCategory = async () => {
    let CategoryID = UUID(3).uuid()
    CategoryID = CategoryID % 100 + parseInt((Math.random() * 10000))

    let returnData = await addCategory(CategoryID, CategoryName, CategoryDescription, imgURL)
    if (returnData.data) {
      alert("The Category has been added succesfully...")
      history.push("/admin/categories")
    }
  }

  const handleImage = async (e) => {
    let url = await handleImportImage(e)
    setImgURL(url)
  }

  return (
    <Container>
      <AdminNavBar />

      <FormContainer>
        <FormTitle>ADD CATEGORY</FormTitle>

        <InputContainer>
          <InputName>Category Name: </InputName>
          <Input value={CategoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </InputContainer>

        <InputContainer>
          <InputName>Category Description: </InputName>
          <Input value={CategoryDescription} onChange={(e) => setCategoryDescription(e.target.value)} />
        </InputContainer>

        <InputContainer>
          <InputName>Add Image: </InputName>
          <Input type="file" onChange={(e) => handleImage(e)} />
        </InputContainer>

        <AddButton onClick={() => handleAddCategory()}>Add Category</AddButton>

      </FormContainer>

      <MainContainer>
        <FormTitle>ALL CATEGORIES</FormTitle>

        <ProductsTable>
          <TableHead>
            <TableRow>
              <TableHeader>Image</TableHeader>
              <TableHeader>CategoryID</TableHeader>
              <TableHeader>Category Name</TableHeader>
              <TableHeader>Category Description</TableHeader>

            </TableRow>
          </TableHead>
          <ProductContainer>
            {categories.map(c => (
              <TableRow>
                <TableData><IMG src={c.imgURL} /></TableData>
                <TableData>{c.CategoryID}</TableData>
                <TableData>{c.CategoryName}</TableData>
                <TableData>{c.CategoryDescription}</TableData>
              </TableRow>
            ))}
          </ProductContainer>
        </ProductsTable>

      </MainContainer>





    </Container>
  );
}

const Container = tw.div`font-sans`
const FormContainer = tw.div`flex flex-col p-4 bg-gray-200 rounded-lg shadow-2xl m-4 w-3/5`
const FormTitle = tw.h2`font-bold text-2xl text-center mt-3 mb-4`
const InputContainer = tw.span`flex p-1 mb-4`
const InputName = tw.h2`font-bold mt-1 w-32 sm:w-48`
const Input = tw.input`ml-2 border-2 rounded-lg p-2 w-5/6`
const TextArea = tw.textarea`ml-2 border-2 rounded-lg p-2 w-5/6 max-h-32`

const Select = tw.select`p-1 w-1/4`
const Option = tw.option``

const AddButton = tw.button`py-1 text-lg text-white bg-gray-800 font-bold rounded-lg border-none w-48
hover:bg-gray-200 hover:text-gray-900 hover:cursor-pointer`

const MainContainer = tw.div`w-screen mt-16`
const ProductsTable = tw.table`w-screen table-auto text-center`
const TableHead = tw.thead`bg-gray-200`
const TableHeader = tw.th`font-bold text-yellow-200 text-xl bg-gray-400 p-2`
const TableRow = tw.tr`bg-gray-100`
const TableData = tw.td`text-base items-start align-middle`
const IMG = tw.img`w-16 h-auto rounded-xl`
const ProductContainer = tw.tbody``

export default AdminCategoriesPage;
