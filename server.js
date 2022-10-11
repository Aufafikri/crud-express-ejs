const express = require ('express')
const mysql = require ('mysql')
const port = 3000
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.set ("view engine", "ejs")
app.set ("views", "views")

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'database_ms'
})

db.connect((err) => {
    if (err) throw err
    console.log ('database connected')

    app.get ('/', (req, res) => {
    const sql = "SELECT * FROM mahasiswa"

        db.query (sql, (err, result) => {
            const users = JSON.parse(JSON.stringify(result))
            res.render("index", { users: users, title: "DAFTAR MURID KELAS" })
        })
    })

    app.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO mahasiswa (nama_lengkap, kelas, alamat) VALUES ('${req.body.nama}', '${req.body.kelas}', '${req.body.alamat}');`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/")
        })
    })
})

app.listen (port, () => {
    console.log (`server run at port ${port}`)
})