//do the create and update
const express = require('express');
const Joi = require('joi');
const router = express.Router();

//Admin model
const Admin = require('../../models/Admin');

// temporary data (to act as a mock database)
const admins = [
    new Admin('Lujine', 'lujine@gmail.com', '1998-22-01', 6, 100),
    new Admin('Hosam', 'hosam@gmail.com', '1998-06-05', 10, 150)
];

//Read all Admins
router.get('/', (req, res) => res.json({data:admins}));

//Read specific admin
router.get('/:id', (req, res) => {            
    const adminId = req.params.id
    const admin = admins.find(admins => admins.id === adminId)
    res.send(admin)
});

router.post('/createAdmin', (req, res) => {

    const data = req.body;
	const schema = Joi.object().keys( {

        name: Joi.string().required(),
        email: Joi.string().email().required(),
        dateOfBirth: Joi.date().required().iso(),
        workingHours: Joi.number().min(5),
        salary: Joi.number(),
    });

    Joi.validate(data, schema, (err, value) => {

        if (err)
            return res.status(400).json({
                    status: 'error',
                    message: err.details[0].message,
                    data: data
            });
                
        const newAdmin = new Admin ( value.name, value.email, value.dateOfBirth, value.workingHours, value.salary);
        admins.push(newAdmin);
        return res.json({
            status: 'success',
            message: 'New Admin created',
            data: newAdmin });
    });
});

//update an admin
router.put('/updateAdmin/:id', (req, res) => {
    const data = req.body;
	const schema = Joi.object().keys( {

        name: Joi.string(),
        email: Joi.string().email(),
        dateOfBirth: Joi.date().iso(),
        workingHours: Joi.number().min(5),
        salary: Joi.number(),
    });

    Joi.validate(data, schema, (err, value) => {

        if (err)
            return res.status(400).json({
                    status: 'error',
                    message: err.details[0].message,
                    data: data
            });
            
        const id = req.params.id;
        const adminToUpdate = admins.find(admin => admin.id === id);
        
        if(!adminToUpdate){
            return res.json({
                status: 'error',
                message: 'Error admin not found'
            });
        }
           if(value.hasOwnProperty('name'))
                adminToUpdate.name = value.name;
            if(value.hasOwnProperty('email'))
                adminToUpdate.email = value.email;
            if(value.hasOwnProperty('dateOfBirth'))
                adminToUpdate.dateOfBirth = dateOfBirth;
            if(value.hasOwnProperty('workingHours'))
                adminToUpdate.workingHours = value.workingHours;
            if(value.hasOwnProperty('salary'))
                adminToUpdate.salary = value.salary;

             return res.json({
                message: `Updated admin with id ${id}`,
                data: admins
            });
    });
});

//Delete an Admin
router.delete('/:id', (req, res) => {            
    const adminId = req.params.id 
    const admin = admins.find(admins => admins.id === adminId)
    const index = admins.indexOf(admin)
    admins.splice(index,1)
    res.send(admins)
});

module.exports = router;