import '../App.css';
import tw from 'twin.macro'
import Axios from 'axios'
import AdminNavBar from './AdminNavBar'
import AdminProductsNavBar from './AdminProductsNavBar'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../utils/sellerUtils'


function ViewAllProducts() {
  const history = useHistory()
  let path = window.location.pathname.split('/')

  const [products, setProducts] = useState([])

  const getPrs = async () => {
    const data = await getProducts()

    // assign the array of products
    setProducts(data.data)
  }


  // GET ALL Products when the page is first mounted
  useEffect(() => {
    getPrs()
  }, [])

  const handleDelete = async (productid) => {
    console.log()
    let newProducts = [...products]
    newProducts = newProducts.filter((o) => {
      if (productid === o.ProductID) return false
      return true
    })

    setProducts(newProducts)

    await deleteProduct(productid)
  }

  const handleUpdate = async (productid) => {
    history.push(`/admin/products/update/${productid}`)
  } 



  return (
    <Container>
      <AdminNavBar />
      <AdminProductsNavBar />

      <MainContainer>

        <ProductsTable>
          <TableHead>
            <TableRow>
              <TableHeader>Image</TableHeader>
              <TableHeader>ProductID</TableHeader>
              <TableHeader>Product Name</TableHeader>
              <TableHeader>Product Description</TableHeader>
              <TableHeader>CategoryID</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Stock</TableHeader>
              <TableHeader>Delete</TableHeader>
              <TableHeader>Edit</TableHeader>
            </TableRow>
          </TableHead>
          <ProductContainer>
            {products.map(p => (
              <TableRow>
                <TableData><IMG src={p.imgURL} /></TableData>
                <TableData>{p.ProductID}</TableData>
                <TableData>{p.ProductName}</TableData>
                <TableData>{p.ProductDescript}</TableData>
                <TableData>{p.CategoryID}</TableData>
                <TableData>{p.price}$</TableData>
                <TableData>{p.stock}</TableData>
                <TableData><DelButton onClick={() => handleDelete(p.ProductID)} >X</DelButton></TableData>
                <TableData><EditButton onClick={() => handleUpdate(p.ProductID)} >...</EditButton></TableData>
              </TableRow>
            ))}
          </ProductContainer>
        </ProductsTable>

      </MainContainer>


    </Container>
  );
}

const Container = tw.div`font-sans`

const MainContainer = tw.div`w-screen`
const ProductsTable = tw.table`w-screen table-auto text-center`
const TableHead = tw.thead`bg-gray-200`
const TableHeader = tw.th`font-bold text-yellow-200 text-xl bg-gray-400 p-2`
const TableRow = tw.tr`bg-gray-100`
const TableData = tw.td`text-base items-start align-middle`
const IMG = tw.img`w-16 h-auto rounded-xl`
const ProductContainer = tw.tbody``

const DelButton = tw.button`p-2 font-bold border-none focus:outline-none bg-red-500 rounded-lg
hover:cursor-pointer hover:bg-red-600`
const EditButton = tw.button`p-2 font-bold border-none focus:outline-none bg-green-500 rounded-lg
hover:cursor-pointer hover:bg-green-600`

export default ViewAllProducts;
