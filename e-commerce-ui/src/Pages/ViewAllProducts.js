import '../App.css';
import tw from 'twin.macro'
import Axios from 'axios'
import AdminNavBar from './AdminNavBar'
import AdminProductsNavBar from './AdminProductsNavBar'
import { useEffect, useState } from 'react';
import { getProducts } from '../utils/sellerUtils'


function ViewAllProducts() {

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

export default ViewAllProducts;
