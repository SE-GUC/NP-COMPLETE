//Dependancies
const express = require('express');
const Joi = require('joi');
const uuid = require('uuid');
const router = express.Router();


//Investor model
const Investor = require('../../models/Investor');


// temporary data created as if it was pulled out of the database
const investors = [
	new Investor('Bill Gates', 30, 'microsoft@hotmail.com'),
    new Investor('Alan Turing', 36, 'alan@yahoo.com'),
    new Investor('Ahmed', 20, 'ahmed20@gmail.com'),
    new Investor('Omar', 17, 'omar@outlook.com')
];


// Default route ..returns all investors in the array.
router.get('/', (req, res) => res.json({data:investors}));

//Return a specific investor with ID in URL. 
router.get('/:id', (req,res)=> 
{   
    const investorId = req.params.id;
    const returned = investors.find(investor => investor.id === investorId)
    res.json(returned);
})

// Create a new investor
router.post('/joi', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const email = req.body.email;

    const schema = {
     
        name: Joi.string().min(4).required(),
        age: Joi.number().required(),
        email: Joi.string().required()

    }

    const result = Joi.validate(req.body,schema);

    if(result.error) return res.status(400).send({error: result.error.details[0].message});


	const newInvestor = {
        name,
        age,
        email,
        id: uuid.v4(),
    };

    investors.push(newInvestor);
	return res.json({ data: newInvestor});
});

//Update an existing Investor with joi validation
router.put('/:id', (req, res) => {

    const id = req.params.id;
    const investorToBeUpdated = investors.find(Investor => Investor.id === id);
    const newName = req.body.name;
    const newAge = req.body.age;
    const newEmail = req.body.email;

    if(newName)
    {
        const nameSchema = 
        {
            name: Joi.string().min(4).required(),
        }

        const resultName = Joi.validate(req.body,nameSchema);
        if(resultName.error) return res.status(400).send({error: resultName.error.details[0].message});
       
        investorToBeUpdated.name = newName;
    }

    if(newAge)
    {
        const ageSchema = 
        {
            age: Joi.number().required(),
        }

        const resultAge = Joi.validate(req.body,ageSchema);
        if(resultAge.error) return res.status(400).send({error: resultAge.error.details[0].message});
        
        investorToBeUpdated.age = newAge;

    }

    if(newEmail)
    {
        const emailSchema = 
        {
            email: Joi.string().required()
        }

        const resultEmail = Joi.validate(req.body,emailSchema);
        if(resultEmail.error) return res.status(400).send({error: resultEmail.error.details[0].message});
        
        investorToBeUpdated.email = newEmail;
    }

    res.send(investors);

})

//Delete a specific investor with ID in URL 
router.delete('/:id', (req,res)=> 
{   
    const investorId = req.params.id;
    const index = investors.findIndex(investor => investor.id === investorId);
    investors.splice(index,1)
    res.send(investors);
})

module.exports = router;


