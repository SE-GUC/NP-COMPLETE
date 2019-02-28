const uuid = require('uuid');
const express = require('express');
const Joi = require('joi');
//const bodyParser=require('body-parser');
const ExternalEntity = require('../../models/ExternalEntity');
const router = express.Router();

//router.use(bodyParser.urlencoded({extended:true}))

const externalEntities = [
    new ExternalEntity('Taxes','@1',1122),
    new ExternalEntity('Insurance','@11',221100),
    new ExternalEntity('Defense','@111',123),
    new ExternalEntity('Security','@1111',112200)
];



// Reading all external entities
    router.get('/',(req, res) => res.json({data: externalEntities }))

// Read a specific external entity
    router.get('/:id', (req, res) => {
        const externalEntityId = req.params.id
        const externalEntity = externalEntities.find(externalEntity => externalEntity.id === externalEntityId)
        res.json({data: externalEntity})
    })

// Deleting an entity  
    router.delete('/:id', (req, res) => {
        const externalEntityId = req.params.id
        const externalEntity = externalEntities.find(externalEntity => externalEntity.id === externalEntityId)
        if(externalEntity)
        {
            const index = externalEntities.indexOf(externalEntity)
            externalEntities.splice(index, 1)
            res.json(externalEntities)
        }
        else
        {
            res.status(400).json({
                status: 'Error',
                message: 'Sorry, This External Entity does not exist!',
                availableExternalEntities: externalEntities
                
            })
        }
    })

//router.get('/', (req, res) => res.json({ data: externalEntities }))



// Create a new external entity
router.post('/', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    
    const schema = {
        name: Joi.string().min(3).required(),
        phone: Joi.number().required(),
        email: Joi.string().required()
    }

    const result = Joi.validate(req.body,schema);

    if(result.error){
        return res.status(400).send({error : result.error.details[0].message});
    }

	

    // if (!name) return res.status(400).send({ err: 'Name field is required' });
	// if (typeof name !== "string") return res.status(400).send({ err: 'Invalid value for Name ' });
	

    // if (!phone) return res.status(400).send({ err: 'Phone field is required' });
    // if (typeof phone !== "number") return res.status(400).send({ err: 'Invalid value for Phone' });
    

    // if (!email) return res.status(400).send({ err: 'Email field is required' });
    // if (typeof email !== "string") return res.status(400).send({ err: 'Invalid value for Email' });
    
	
	const newExternalEntity = {
        id:uuid.v4(),
        name,
		phone,
        email,
    };
    

    externalEntities.push(newExternalEntity);


    return res.json({ data: newExternalEntity });
    
});

// router.post('/joi',(req,res) => {
//     const name = req.body.name;
//     const phone = req.body.phone;
//     const email = req.body.email;
    
//     const schema = {
//         name: Joi.string().min(3).required(),
//         number: Joi.number().required(),
//         email: Joi.string().required()
//     }

//     const result = Joi.validate(req.body,schema);

//     if(result.error){
//         return res.status(400).send({error : result.error.details[0].message});
//     }

//     const newExternalEntity = {
//         id:uuid.v4(),
//         name,
// 		phone,
//         email,
//     };

//     return res.json({ data: newExternalEntity });
// });


// Update a external entity's name,phone & email 
router.put('/:id', (req, res) => {
    const externalEntityId = req.params.id 
    const updatedName = req.body.name
    const updatedPhone = req.body.phone
    const updatedEmail = req.body.email
    const externalEntity = externalEntities.find(ExternalEntity => ExternalEntity.id === externalEntityId)

    const schema1 = {
        name: Joi.string().min(3).required(),     
    }
    const schema2 = {
        phone: Joi.number().required(),
        
    }
    const schema3 = {
        email: Joi.string().required()
    }


    if(!(updatedName===undefined)){
        
        const result = Joi.validate(req.body,schema1);
        if(result.error){
            return res.status(400).send({error : result.error.details[0].message});
        }
        externalEntity.name = updatedName;

    }
    if(!(updatedPhone===undefined)){
        const result = Joi.validate(req.body,schema2);
        if(result.error){
            return res.status(400).send({error : result.error.details[0].message});
        }
        externalEntity.phone = updatedPhone
    }
    if(!(updatedEmail===undefined)){
        const result = Joi.validate(req.body,schema3);
        if(result.error){
            return res.status(400).send({error : result.error.details[0].message});
        } 
       externalEntity.email = updatedEmail
    }
    res.send(externalEntities)
})

module.exports = router;
