//var sql = require("mssql/msnodesqlv8")
import sql from "mssql/msnodesqlv8"
var dbConfig = {
    server: "DESKTOP-B4725JB\\SQLEXPRESS",
    instanceName: "SQLEXPRESS",
    database: "eCommerce",
    user: "hakki",
    password: "123hakki",
    port: 1433,
    options: {
        encrypt: false,
        enableArithAbort: true,
        trustedConnection: true
    }
};

async function addNewSeller(id, fullname, email, password) {
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet
        
        try {
            
            req.input('SellerID', sql.Int, id)
            req.input('fullName', sql.VarChar(255), fullname)
            req.input('email', sql.VarChar(255), email)
            req.input('password', sql.VarChar(255), password)
            rcrdSet = await req.execute('addNewSeller')

            await conn.close()

            console.log(rcrdSet)
        } catch (e) {
            console.log("error has occured ->", e)
        }
    });
}

// async function addProduct(ProductID, CategoryID, ProductName, ProductDescript, imgURL, price, stock) {
//     var conn = new sql.ConnectionPool(dbConfig);
//     conn.connect(async function (error) {

//         if (error) {
//             throw error;
//         }
//         var req = new sql.Request(conn);
//         let rcrdSet
        
//         try {
            
//             req.input('ProductID', sql.Int, ProductID)
//             req.input('CategoryID', sql.Int, CategoryID)
//             req.input('ProductName', sql.VarChar(255), ProductName)
//             req.input('ProductDescript', sql.Text, ProductDescript)
//             req.input('imgURL', sql.VarChar(255), imgURL)
//             req.input('price', sql.Int, price)
//             req.input('stock', sql.Int, stock)
//             rcrdSet = await req.execute('addProduct')

//             await conn.close()

//             console.log(rcrdSet)
//         } catch (e) {
//             console.log("error has occured ->", e)
//         }
//     });
// }

// async function updateProduct(ProductID, CategoryID, ProductName, ProductDescript, imgURL, price, stock) {
//     var conn = new sql.ConnectionPool(dbConfig);
//     conn.connect(async function (error) {

//         if (error) {
//             throw error;
//         }
//         var req = new sql.Request(conn);
//         let rcrdSet
        
//         try {
            
//             req.input('ProductID', sql.Int, ProductID)
//             req.input('CategoryID', sql.Int, CategoryID)
//             req.input('ProductName', sql.VarChar(255), ProductName)
//             req.input('ProductDescript', sql.Text, ProductDescript)
//             req.input('imgURL', sql.VarChar(255), imgURL)
//             req.input('price', sql.Int, price)
//             req.input('stock', sql.Int, stock)
//             rcrdSet = await req.execute('updateProduct')

//             await conn.close()

//             console.log(rcrdSet)
//         } catch (e) {
//             console.log("error has occured ->", e)
//         }
//     });
// }

// async function deleteProduct(ProductID) {
//     var conn = new sql.ConnectionPool(dbConfig);
//     conn.connect(async function (error) {

//         if (error) {
//             throw error;
//         }
//         var req = new sql.Request(conn);
//         let rcrdSet
        
//         try {
            
//             req.input('ProductID', sql.Int, ProductID)
//             rcrdSet = await req.execute('deleteProduct')

//             await conn.close()

//             console.log(rcrdSet)
//         } catch (e) {
//             console.log("error has occured ->", e)
//         }
//     });
// }


async function addCategory(CategoryID, CategoryName, CategoryDescription, imgURL) {
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet
        
        try {
            
            req.input('CategoryID', sql.Int, CategoryID)
            req.input('CategoryName', sql.VarChar(255), CategoryName)
            req.input('CategoryDescription', sql.VarChar(255), CategoryDescription)
            req.input('imgURL', sql.VarChar(255), imgURL)
            
            rcrdSet = await req.execute('addCategory')

            await conn.close()

            console.log(rcrdSet)
        } catch (e) {
            console.log("error has occured ->", e)
        }
    });
}

//deleteProduct(566)
//addCategory(555, "TV", "TVs have tv products under itself", "www.asdasdasd.com")
//addProduct(566, 555, "Apple TV", "The brand new Apple TV with its greatest features", "www.aaasssddd.com", 5000, 50)
//updateProduct(566, 555, "Apple Smart TV", "The brand new Apple TV with its greatest features", "www.aaasssddd.com", 5000, 50)


export {
    
}