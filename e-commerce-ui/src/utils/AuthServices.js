import firebase from './firebase'
import {addNewCustomer} from './sellerUtils'


//import {getUserId} from './UserServices'

const auth = firebase.auth()
const db = firebase.firestore()

const checkUserIsSignedIn = () => {
    return firebase.auth().onAuthStateChanged(function (user) {
        // check whether user is signed in or not
        return !user ? false : true
    });
}

const getUserId = async () => {
    return await new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
                reject('please authenticate first')
            } else {
                resolve(user.uid)
            }
        });
    })
}

// Register a user and save it also to firestore
const signUp = async (CustomerID, FullName, CustomerEmail, CustomerPassword, CustomerAddress, CustomerPhone) => {
    try {
        await auth.createUserWithEmailAndPassword(CustomerEmail, CustomerPassword)
        const CustomerUID = await getUserId()

        // ADD NEW CUSTOMER TO THE MSSQL
        await addNewCustomer(CustomerID, FullName, CustomerEmail, CustomerPassword, CustomerAddress, CustomerPhone, CustomerUID)

    } catch (e) {
        throw new Error(e.message)
    }
}

const login = async (email, password) => {
    try {
        return await auth.signInWithEmailAndPassword(email, password)
    } catch (e) {
        throw new Error(e.message)
    }
}

const logout = async () => {
    try {
        return await auth.signOut()
    } catch (e) {
        throw new Error(e.message)
    }
}


export {
    checkUserIsSignedIn,
    signUp,
    login,
    logout
}