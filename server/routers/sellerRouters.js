const express = require('express');
const router = new express.Router();

const sql = require('mssql/msnodesqlv8')

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

// ADD PRODUCT
router.post("/addProduct", async (r, res) => {
    // use object destructuring
    const { ProductID, CategoryID, ProductName, ProductDescript, imgURL, price, stock } = r.body.params

    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('ProductID', sql.Int, ProductID)
            req.input('CategoryID', sql.Int, CategoryID)
            req.input('ProductName', sql.VarChar(255), ProductName)
            req.input('ProductDescript', sql.VarChar(255), ProductDescript)
            req.input('imgURL', sql.VarChar(255), imgURL)
            req.input('price', sql.Int, parseInt(price))
            req.input('stock', sql.Int, parseInt(stock))
            console.log("before execute !!!")
            rcrdSet = await req.execute('addProduct')

            await conn.close()

            res.send(true)
        } catch (e) {
            console.log("error has occured ->", e)
            res.send(false)
        }
    });

})

//UPDATE PRODUCT
router.post("/updateProduct", async (r, res) => {
    const { ProductID, CategoryID, ProductName, ProductDescript, imgURL, price, stock } = r.query
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('ProductID', sql.BigInt, ProductID)
            req.input('CategoryID', sql.BigInt, CategoryID)
            req.input('ProductName', sql.VarChar(255), ProductName)
            req.input('ProductDescript', sql.Text, ProductDescript)
            req.input('imgURL', sql.VarChar(255), imgURL)
            req.input('price', sql.Int, price)
            req.input('stock', sql.Int, stock)
            rcrdSet = await req.execute('updateProduct')

            await conn.close()

        } catch (e) {
            console.log("error has occured ->", e)
        }
    });
})

//DELETE PRODUCT
router.post("/deleteProduct", async (r, res) => {
    const { ProductID } = r.query
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('ProductID', sql.BigInt, ProductID)
            rcrdSet = await req.execute('deleteProduct')

            await conn.close()

            console.log(rcrdSet)
        } catch (e) {
            console.log("error has occured ->", e)
        }
    });
})

//ADD CATEGORY
router.post("/addCategory", async (r, res)=> {

    const {CategoryID, CategoryName, CategoryDescription, imgURL} = r.body.params

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
})



module.exports = router