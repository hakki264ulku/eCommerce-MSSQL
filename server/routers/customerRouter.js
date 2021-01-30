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

// GET PRODUCTS
router.get('/getProducts', async (r, res) => {
    try {

        var conn = new sql.ConnectionPool(dbConfig);
        conn.connect(async function (error) {
            if (error) {
                throw error;
            }
            var req = new sql.Request(conn);
            let rcrdSet

            try {
                rcrdSet = await req.query(`select * from Product`)
                console.log("Products are requested")
                res.send(rcrdSet.recordset)

            } catch (e) {
                console.log("error has occured ->", e)
                await conn.close()
            }
        });

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

//GET PRODUCTS BY CATEGORY ID ---> pass the category id via req.query
router.get('/getProductsByCategoryID', async (r, res) => {
    console.log(r.query)
    let categoryID = r.query.categoryID
    try {

        var conn = new sql.ConnectionPool(dbConfig);
        conn.connect(async function (error) {

            if (error) {
                throw error;
            }
            var req = new sql.Request(conn);
            let rcrdSet

            try {

                rcrdSet = await req.query(`select * from Product where CategoryID = ${categoryID}`)
                await conn.close()
                res.send(rcrdSet.recordset)

            } catch (e) {
                console.log("error has occured ->", e)
                await conn.close()
            }
        });

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

// GET CATEGORIES
router.get('/getCategories', async (r, res) => {
    try {

        var conn = new sql.ConnectionPool(dbConfig);
        conn.connect(async function (error) {

            if (error) {
                throw error;
            }
            var req = new sql.Request(conn);
            let rcrdSet

            try {

                rcrdSet = await req.query(`select * from Category`)
                res.send(rcrdSet.recordset)

            } catch (e) {
                await conn.close()
                console.log("error has occured ->", e)
            }
        });

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

module.exports = router