
import { pool } from "../db.js";

 export const getEmployees = async(req, res) => {
    try {
    const [rows] = await pool.query('SELECT * FROM employee')
     res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong' 
        })
    }
 };

 export const getEmployee = async(req, res) =>{
   try {
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id])
    if (rows.length <= 0 ) {
        res.status(404).json({
            message: 'Employee not found'
        });
    }
    console.log(rows);
    res.send(rows[0]);
   } catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
    });
   }
 }
 export const createEmployee = async (req, res) => {
   try {
    const {name, salary} = req.body
    const [rows] = await pool.query('INSERT INTO employee (name, salar) VALUES (?, ?)', [name, salary])
    res.send({
        id: rows.insertId,
        name,
        salary,
    });
   } catch (error) {
    return res.status(500).json({
        message: 'Something goes wrong'
    });
   }
 }
 export const updateEmployee = async(req, res) => {
    try {
        const {id} = req.params
    const {name, salary} = req.body
    const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salar = IFNULL(?, salar) WHERE  id = ?', [name, salary, id])
    console.log(result);

    if (result.affectedRows === 0 ) return res.status(404).json({
        message: 'Employee not found'
    });

    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id])
    console.log(rows[0]);
    res.json('received')
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
 };


 export const deleteEmployee = async(req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id]);
        if (result.affectedRows <= 0) return res.status(404).json({
          message: 'Employee not found'
        })
          res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
 };