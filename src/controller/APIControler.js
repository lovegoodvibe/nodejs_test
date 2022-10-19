import pool from "../configs/connectDB";
let getAllUsers = async (req,res) => {
    let [data] = await pool.execute(`select * from tbl`)
    return res.status(200).json({
        message: "ok",
        data: data
    })
}
let createUser = async (req,res) => {
    let {name, email, age} = req.body;
    if(!name || !email || !age)
        return res.status(200).json({
            message: "missing data",
        })
    await pool.execute('INSERT INTO tbl(name, email, age) VALUES (?, ?, ?)', [name, email, age]);
    let [data] = await pool.execute(`select * from tbl`)
    return res.status(200).json({
        message: "ok",
        data: data
    })
}
let deleteUser = async (req, res) => {
    let {id} = req.body;
    if(!id)
        return res.status(200).json({
            message: "missing data",
        })
    await pool.execute('delete from tbl where id = ?',[id]);
    return res.status(200).json({
        message: "ok"
    })
}
let updateUser = async (req, res) => {
    let id = req.params.id;
    let { name, email, age} = req.body;
    await pool.execute(`update tbl set name = ?, email = ?, age= ? where id = ?`,[name, email, age, id] );
    return res.status(200).json({
        message: "ok"
    })
}
module.exports = {
    getAllUsers, createUser, updateUser, deleteUser
}