// Dependencies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();

// Models
const Lawyer = require('../../models/Lawyer');
// temporary data created as if it was pulled out of the database ...
const lawyers = [
	new Lawyer('Barney', 30),
	new Lawyer('Lilly', 27),
	new Lawyer('Ted', 29),
	new Lawyer('Marshal', 27),
	new Lawyer('Robin', 28)
];

// Create a new lawyer
router.post('/', (req, res) => {
	const name = req.body.name
	const age = req.body.age

	const schema = {
		name: Joi.string().min(3).required(),
		age: Joi.number().required(),
	}

	const result = Joi.validate(req.body, schema);

	if (result.error) return res.status(400).send({ error: result.error.details[0].message });

	const newLawyer = {
		name,
		age,
		id: uuid.v4(),
	};
	lawyers.push(newLawyer)
	return res.json({ data: newLawyer });
	
});


router.put('/:id', (req, res) => {
	const lawyerId=req.params.id
	const lawyer = lawyers.find(lawyer => lawyer.id === lawyerId)
	const updatedname = req.body.name
	const updatedage = req.body.age
	
	
	if(!(updatedname===undefined)){
	const schemaName = {
		name: Joi.string().min(3).required(),
	}
	const resultName = Joi.validate(req.body, schemaName);	
	if (resultName.error) return res.status(400).send({ error: resultName.error.details[0].message });
	lawyer.name=updatedname	
	}


	if(!(updatedage===undefined)){
		const schemaAge = {
		age: Joi.number().required(),
	}
	const resultAge = Joi.validate(req.body, schemaAge);

	if (resultAge.error) return res.status(400).send({ error: resultAge.error.details[0].message });
	lawyer.age=updatedage	
	}
	
	
	

	return res.json({ data: lawyer })
});
//get all lawyers
router.get('/', (req, res) => res.json({ data: lawyers }));

// Get a certain lawyer using id
router.get('/:id', (req, res) => {
    const lawyerId = req.params.id
    const lawyer = lawyers.find(lawyer => lawyer.id === lawyerId)
    res.send(lawyer)
})
//delete lawyer using id
 
router.delete('/:id', (req, res) => {
    const lawyerId = req.params.id
    const lawyer = lawyers.find(lawyer => lawyer.id===lawyerId)
    const index = lawyers.indexOf(lawyer)
    lawyers.splice(index,1)
    res.send(lawyers)
})


module.exports=router;
//Updating a Lawyer record.
// router.put('/:id', (req, res) => {
// 	const lawyerId = req.params.id 
	
// 	const updatedname = req.body.name
// 	const updatedage=req.body.age
// 	const lawyer = lawyers.find(lawyer => lawyer.id === lawyerId)
// 	if(!(updatedname===undefined)){
// 		lawyer.name = updatedname}

// 	if(!(updatedage===undefined)){
// 		lawyer.age = updatedage}
	
//     res.send(lawyers)
// })