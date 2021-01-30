//var sql = require("mssql/msnodesqlv8")
const sql =  require('mssql/msnodesqlv8')

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

async function addCustomer(id, fullname, email, password, address, phoneNumber) {

    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('id', sql.Int, id)
            req.input('fullName', sql.VarChar(255), fullname)
            req.input('email', sql.VarChar(255), email)
            req.input('password', sql.VarChar(255), password)
            req.input('address', sql.VarChar(255), address)
            req.input('phoneNumber', sql.VarChar(255), phoneNumber)
            rcrdSet = await req.execute('addNewCustomer')

            console.log(rcrdSet)
        } catch (e) {
            console.log("error has occured ->", e)
        }
    });
}

async function getCustomer(id) {
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            rcrdSet = await req.query(`select * from Customer where CustomerID = ${id}`)
            console.log(rcrdSet.recordset)
            return rcrdSet

        } catch (e) {
            console.log("error has occured ->", e)
        }
        await conn.close()
    });
}

async function updateCustomer(customerID, fullName, email, password, address, phoneNumber) {
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('customerID', sql.Int, customerID)
            req.input('fullName', sql.VarChar(255), fullName)
            req.input('email', sql.VarChar(255), email)
            req.input('password', sql.VarChar(255), password)
            req.input('address', sql.VarChar(255), address)
            req.input('phoneNumber', sql.VarChar(255), phoneNumber)
            rcrdSet = await req.execute('updateCustomer')

            console.log(rcrdSet)
        } catch (e) {
            console.log("error has occured ->", e)
        }
    });
}

async function newOrder(orderID, productID, customerID, orderAmount, orderDate, shippingDate, isShipped, isDelivered) {
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('ID', sql.Int, orderID)
            req.input('productID', sql.Int, productID)
            req.input('customerID', sql.Int, customerID)
            req.input('orderAmount', sql.Int, orderAmount)
            req.input('orderDate', sql.DateTime, orderDate)
            req.input('shippingDate', sql.DateTime, shippingDate)
            req.input('isShipped', sql.Bit, isShipped)
            req.input('isDelivered', sql.Bit, isDelivered)
            rcrdSet = await req.execute('newOrder')

            conn.close()
            console.log(rcrdSet)

        } catch (e) {
            await conn.close()
            console.log("error has occured ->", e)
        }
    });
}

async function getOrdersOfCustomer(customerID) {
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            rcrdSet = await req.query(`select * from Orderr where CustomerID=${customerID}`)
            console.log(rcrdSet.recordset)
            await conn.close()
            return rcrdSet

        } catch (e) {
            await conn.close()
            console.log("error has occured ->", e)
        }
    });
}

// async function getCategories() {
//     var conn = new sql.ConnectionPool(dbConfig);
//     conn.connect(async function (error) {

//         if (error) {
//             throw error;
//         }
//         var req = new sql.Request(conn);
//         let rcrdSet

//         try {

//             rcrdSet = await req.query(`select * from Category`)
//             console.log(rcrdSet.recordset)
//             await conn.close()
//             return rcrdSet

//         } catch (e) {
//             await conn.close()
//             console.log("error has occured ->", e)
//         }
//     });
// }

// async function getProductsByCategoryID(categoryID) {
//     var conn = new sql.ConnectionPool(dbConfig);
//     conn.connect(async function (error) {

//         if (error) {
//             throw error;
//         }
//         var req = new sql.Request(conn);
//         let rcrdSet

//         try {

//             rcrdSet = await req.query(`select * from Product where CategoryID = ${categoryID}`)
//             console.log(rcrdSet.recordset)
//             await conn.close()
//             return rcrdSet

//         } catch (e) {
//             console.log("error has occured ->", e)
//             await conn.close()
//         }
//     });
// }

// async function getProducts() {
//     var conn = new sql.ConnectionPool(dbConfig);
//     conn.connect(async function (error) {
//         if (error) {
//             throw error;
//         }
//         var req = new sql.Request(conn);
//         let rcrdSet

//         try {
//             rcrdSet = await req.query(`select * from Product`)
//             console.log("-> ->")
//             console.log(rcrdSet.recordset)
//             return rcrdSet

//         } catch (e) {
//             console.log("error has occured ->", e)
//             await conn.close()
//         }
//     });
// }

// getMyOrders which are not delivered yet
// get

//newOrder(100, 566, 123, 1, Date.now(), null, 0, 0)
//getCustomer(123)
//getProductsByCategoryID(555)
//getOrdersOfCustomer(123)
// getProducts()


module.exports = {
    addCustomer, getCustomer, updateCustomer,
    newOrder, getOrdersOfCustomer, 
    getCategories, getProductsByCategoryID, 
    getProducts
}