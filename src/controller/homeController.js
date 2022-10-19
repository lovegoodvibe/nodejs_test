import pool from "../configs/connectDB";
import multer from 'multer';
let getHomePage = async (req,res) => {
    const [rows,fields] = await pool.execute('SELECT * FROM tbl');
    return res.render('index.ejs',{dataUser : rows});
}
let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute(`select * from tbl where id = ?`, [userId]);
    return res.send(JSON.stringify(user));
}
let createNewUser = async (req,res) => {
    console.log(req.body)
    let {name, email, age} = req.body;
    await pool.execute('INSERT INTO tbl(name, email, age) VALUES (?, ?, ?)', [name, email, age]);
    return res.redirect('/');
}
let deleteUser = async (req, res) => {
    await pool.execute('delete from tbl where id = ?',[req.body.userId]);
    return res.redirect('/');
}
let getEditUser = async (req, res) => {
    let [rows]= await pool.execute(`select * from tbl where id = ?`, [req.params.id])
    console.log(rows)
    return res.render('update.ejs',{dataUser: rows[0]});
}
let updateUser = async (req,res) => {
    let {id, name, email, age} = req.body
    await pool.execute(`update tbl set name = ?, email = ?, age= ? where id = ?`,[name, email, age, id] );
    return res.redirect('/');
}
let uploadFile = async (req,res) => {
    return res.render('upload.ejs');
}
let singleFile = async (req,res) => {
    if (req.fileValidationError) {

        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}
let multipleFile = async (req,res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
}
module.exports = {
    getHomePage, getDetailPage, createNewUser, deleteUser, getEditUser, updateUser, uploadFile, singleFile, multipleFile
}