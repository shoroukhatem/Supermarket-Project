const express = require('express')
const router = express.Router()
const mysql = require("mysql")
const pool = mysql.createPool({
    connectionLimit: 10,
    password: "",
    host: "localhost",
    user: "root",
    database: "thecamp_market"
})
router.use(express.json());

// routes for products
router.get("/products", (req, res) => {
    pool.query("SELECT * from thecamp_market", function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
});
router.use(express.json());
router.post("/products", (req, res) => {
    var products = []
    products.push(req.body.product_name)
    products.push(req.body.product_value)
    products.push(req.body.product_quantity)
    pool.query("INSERT INTO thecamp_market (product_name, product_value, product_quantity) VALUES (?,?,?);", products, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })

});
//update
router.post("/products/:id", (req, res) => {
    const id = req.params.id
    const product_quantity = req.body.product_quantity
    const product_value = req.body.product_value
    pool.query("UPDATE thecamp_market SET product_value = ? , product_quantity= ? WHERE Id = ?;", [product_value, product_quantity, id], function (error, results, fields) {
        if (error) throw error;
        res.send("updated")
    })
})

router.delete("/products/:id", (req, res) => {
    const id = req.params.id
    pool.query("DELETE from thecamp_market WHERE Id = ?", id, function (error, results, fields) {
        if (error) throw error;
        res.send("deleted")
    })
})
// routes for sells
router.get("/sells", (req, res) => {
    pool.query("SELECT * from thecamp_market_sells", function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})


router.post("/sells", (req, res) => {

    const product_id = req.body.product_id
    const sells_quantity = req.body.sells_quantity
    pool.query("INSERT INTO thecamp_market_sells (product_id, sells_quantity) VALUES (?,?);", [product_id, sells_quantity], function (error, results, fields) {
        if (error) throw error;
        res.send(
            "added"
        )
    })

});


//update
router.post("/sells/:id", (req, res) => {
    const id = req.params.id
    const product_id = req.body.product_id
    const sells_quantity = req.body.sells_quantity
    pool.query("UPDATE thecamp_market_sells SET product_id = ? , sells_quantity= ? WHERE Id = ?;", [product_id, sells_quantity, id], function (error, results, fields) {
        if (error) throw error;
        res.send("updated")
    })
})

router.delete("/sells/:id", (req, res) => {
    const id = req.params.id
    pool.query("DELETE from thecamp_market_sells WHERE Id = ?", id, function (error, results, fields) {
        if (error) throw error;
        res.send("deleted")
    })
})


module.exports = router