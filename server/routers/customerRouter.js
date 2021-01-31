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
                rcrdSet = await req.query(`select * from get_products`)
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

router.get('/getOrders', async (r, res) => {
    let customerid = r.query.ID
    try {

        var conn = new sql.ConnectionPool(dbConfig);
        conn.connect(async function (error) {

            if (error) {
                throw error;
            }
            var req = new sql.Request(conn);
            let rcrdSet

            try {

                rcrdSet = await req.query(`select * from Orderr where Orderr.CustomerID = ${customerid}`)
                res.send(rcrdSet.recordset)
                await conn.close()

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

router.get('/getProductByID', async (r, res) => {
    let productid = r.query.productid
    console.log(productid)
    try {

        var conn = new sql.ConnectionPool(dbConfig);
        conn.connect(async function (error) {

            if (error) {
                throw error;
            }
            var req = new sql.Request(conn);
            let rcrdSet

            try {

                rcrdSet = await req.query(`select * from Product where Product.ProductID = ${productid}`)
                res.send(rcrdSet.recordset)
                await conn.close()

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

router.get('/getCustomer', async (r, res) => {

    let CustomerUID = r.query.CustomerUID

    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet
        let id = 1

        try {

            req.input('CustomerUID', sql.VarChar, CustomerUID)
            req.output('ID', sql.Int, id)
            rcrdSet = await req.execute('getCustomer')

            console.log("out:", rcrdSet)
            res.send(rcrdSet.output)
        } catch (e) {
            console.log("error has occured ->", e)
        }
    });

})

router.get('/getCustomerByID', async (r, res) => {
    let customerid = r.query.customerid
    console.log("customerid: ", customerid)

    try {

        var conn = new sql.ConnectionPool(dbConfig);
        conn.connect(async function (error) {

            if (error) {
                throw error;
            }
            var req = new sql.Request(conn);
            let rcrdSet

            try {
                rcrdSet = await req.query(`select * from Customer where Customer.CustomerID = ${customerid}`)
                res.send(rcrdSet.recordset)

            } catch (e) {
                console.log("error has occured ->", e)
            }
        });

    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }

})

router.post('/addCustomer', async (r, res) => {

    const { CustomerID, FullName, CustomerEmail, CustomerPassword, CustomerAddress, CustomerPhone, CustomerUID } = r.body.params

    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('CustomerID', sql.Int, CustomerID)
            req.input('FullName', sql.VarChar(255), FullName)
            req.input('CustomerEmail', sql.VarChar(255), CustomerEmail)
            req.input('CustomerPassword', sql.VarChar(255), CustomerPassword)
            req.input('CustomerAddress', sql.VarChar(255), CustomerAddress)
            req.input('CustomerPhone', sql.VarChar(255), CustomerPhone)
            req.input('CustomerUID', sql.VarChar(255), CustomerUID)
            rcrdSet = await req.execute('addNewCustomer')

            console.log(rcrdSet)
        } catch (e) {
            console.log("error has occured ->", e)
        }
    });
})

router.post('/addOrder', async (r, res) => {

    const { OrderID, ProductID, CustomerID, OrderAmount, isShipped, isValidated, ProductName, imgURL, price } = r.body.params

    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('OrderID', sql.Int, OrderID)
            req.input('ProductID', sql.Int, ProductID)
            req.input('CustomerID', sql.Int, CustomerID)
            req.input('OrderAmount', sql.Int, OrderAmount)
            req.input('isShipped', sql.Bit, isShipped)
            req.input('isValidated', sql.Bit, isValidated)
            req.input('ProductName', sql.VarChar(255), ProductName)
            req.input('imgURL', sql.VarChar(255), imgURL)
            req.input('price', sql.Int, price)
            rcrdSet = await req.execute('newOrder')

            conn.close()
            console.log(rcrdSet)

        } catch (e) {
            await conn.close()
            console.log("error has occured ->", e)
        }
    });
})

router.post('/deleteOrder', async (r, res) => {
    console.log("inside deleteOrder")
    const { orderid } = r.body.params

    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('orderid', sql.Int, orderid)
            rcrdSet = await req.execute('deleteOrder')

            conn.close()
            console.log(rcrdSet)

        } catch (e) {
            await conn.close()
            console.log("error has occured ->", e)
        }
    });
})

router.post('/deleteOrders', async (r,res)=>{
    console.log("inside deleteOrderssss")
    const { customerid } = r.body.params

    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('customerid', sql.Int, customerid)
            rcrdSet = await req.execute('deleteOrders')

            conn.close()
            console.log(rcrdSet)
            res.send(rcrdSet)

        } catch (e) {
            await conn.close()
            console.log("error has occured ->", e)
        }
    });
})

router.post('/deleteProduct', async (r, res) => {
    console.log("Inside deleteProduct")
    const { productid } = r.body.params
    console.log("productid: ", r.body.params)

    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect(async function (error) {

        if (error) {
            throw error;
        }
        var req = new sql.Request(conn);
        let rcrdSet

        try {

            req.input('productid', sql.Int, productid)
            rcrdSet = await req.execute('deleteProduct')

            conn.close()
            //console.log(rcrdSet)

        } catch (e) {
            await conn.close()
            console.log("error has occured ->", e)
        }
    });
})



module.exports = router