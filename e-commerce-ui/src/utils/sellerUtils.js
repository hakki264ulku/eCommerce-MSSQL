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

const getCustomerID = async () => {
    let user = firebase.auth().currentUser
    let CustomerUID
    if(user != null) {
        CustomerUID = user.uid

        let data = await Axios.get("http://localhost:3003/getCustomer", {params:{CustomerUID}})
        console.log(data.data)

        return data.data
    }
    return null
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
    let data = await Axios.post("http://localhost:3003/addProduct", { params: { ProductID, CategoryID, ProductName, ProductDescript, imgURL, price, stock } })
    return data
}

async function updateProduct(ProductID, CategoryID, ProductName, ProductDescript, imgURL, price, stock) {
    let data = await Axios.post("http://localhost:3003/updateProduct", {params:{ProductID, CategoryID, ProductName, ProductDescript, imgURL, price, stock}})
    return data
}

async function addCategory(CategoryID, CategoryName, CategoryDescription, imgURL) {
    let data = await Axios.post("http://localhost:3003/addCategory", { params: { CategoryID, CategoryName, CategoryDescription, imgURL } })
    return data
}

async function addNewCustomer(CustomerID, FullName, CustomerEmail, CustomerPassword, CustomerAddress, CustomerPhone, CustomerUID) {
    let data = await Axios.post("http://localhost:3003/addCustomer", {
        params: {
            CustomerID, FullName, CustomerEmail, CustomerPassword,
            CustomerAddress, CustomerPhone, CustomerUID
        }
    })
    return data
}

async function getCustomer() {
    let customerid = await getCustomerID()
    let data = await Axios.get("http://localhost:3003/getCustomerByID", {params:{customerid:customerid.ID}})
    return data
}

async function addOrder(OrderID, ProductID, CustomerID, OrderAmount, isShipped, isValidated, ProductName, imgURL, price) {
    let data = await Axios.post("http://localhost:3003/addOrder", {
        params: {
            OrderID, ProductID, CustomerID,
            OrderAmount, isShipped, isValidated,
            ProductName, imgURL, price
        }
    })
    return data
}

async function getOrders() {
    let CustomerID = await getCustomerID()
    let data = await Axios.get("http://localhost:3003/getOrders", {params:CustomerID})
    return data
}

async function getProductByID(productid) {
    let data = await Axios.get("http://localhost:3003/getProductByID", {params:{productid}})
    return data
}

async function deleteOrder(orderid) {
    let data = await Axios.post("http://localhost:3003/deleteOrder", {params:{orderid}})
    return data
}

async function deleteOrders(customerid) {
    let data = await Axios.post("http://localhost:3003/deleteOrders", {params:{customerid}})
    return data
}

async function deleteProduct(productid) {
    let data = await Axios.post("http://localhost:3003/deleteProduct", {params:{productid}})
    console.log(data)
    return data
}

export {
    getProducts, getProductsByCategory, getCategories, addProduct, addCategory,
    handleImportImage, addNewCustomer, addOrder, getCustomerID, getOrders, getProductByID,
    deleteOrder, getCustomer, deleteProduct, updateProduct, deleteOrders
}