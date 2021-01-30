import Axios from 'axios'
import firebase from './firebase'

const handleImportImage = async (e) => {
    let storage = firebase.storage()
    let storageRef = storage.ref()
    let image = e.target.files[0]
    let uploadedData = await storageRef.child(image.name).put(image)
    let url = await uploadedData.ref.getDownloadURL()
    return url
  }

async function getProducts() {
    let data = await Axios.get("http://localhost:3003/getProducts")
    return data
}

async function getCategories() {
    let data = await Axios.get("http://localhost:3003/getCategories")
    return data
}

async function getProductsByCategory(categoryID) {
    let data = await Axios.get("http://localhost:3003/getProductsByCategoryID", { params: { categoryID } })
    return data
}

async function addProduct(ProductID, CategoryID, ProductName, ProductDescript, imgURL, price, stock) {
    let data = await Axios.post("http://localhost:3003/addProduct", {params:{ProductID, CategoryID, ProductName, ProductDescript, imgURL, price, stock}})
    return data
}

async function addCategory(CategoryID, CategoryName, CategoryDescription, imgURL) {
    let data = await Axios.post("http://localhost:3003/addCategory", {params:{CategoryID, CategoryName, CategoryDescription, imgURL}})
    return data
}

async function addNewCustomer(email, password) {
    
}

export {
    getProducts, getProductsByCategory, getCategories, addProduct, addCategory,
    handleImportImage
}