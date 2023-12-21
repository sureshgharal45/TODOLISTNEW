const express = require('express');
const { createRecord, getRecordsByDue } = require('../controllers/userController');

const router = express.Router();

//create task || POST 
router.post("/create", createRecord);
//gte all records by due date || GET
router.get('/allrecords', getRecordsByDue);

module.exports = router;