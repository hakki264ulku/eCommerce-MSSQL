import '../App.css';
import tw from 'twin.macro'
import Axios from 'axios'
import AdminNavBar from './AdminNavBar'
import AdminProductsNavBar from './AdminProductsNavBar'
import { useEffect, useState } from 'react';


function AdminProductsPage() {

    const [products, setProducts] = useState([])

    // RUNS When the page is first mounted
    useEffect(()=>{

    }, [])


  return (
    <Container>
        <AdminNavBar />
        <AdminProductsNavBar />
        
    </Container>
  );
}

const Container = tw.div`font-sans`

export default AdminProductsPage;
