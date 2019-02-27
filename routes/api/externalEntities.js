const uuid = require('uuid');
const express = require('express');
const Joi = require('joi');
//const bodyParser=require('body-parser');
const ExternalEntity = require('../../models/ExternalEntity');
const router = express.Router();

//router.use(bodyParser.urlencoded({extended:true}))

const externalEntities = [
    new ExternalEntity(1,'Taxes',001122,'@1'),
    new ExternalEntity(2,'Insurance',221100,'@11'),
    new ExternalEntity(3,'Defense',002211,'@111'),
    new ExternalEntity(4,'Security',112200,'@1111')
];



// Reading an entity
// this lists all our instances as hypertexts that redirects us to: /externalEntities/about/:id that you clicked on
    router.get('/',(req,res)=> {
        var data="";
        externalEntities.forEach(value => {
            data +=`<a href="/api/externalEntities/about/${value.id}">${value.name}</a></br>` 
        });   
        res.send(data);
    })

    // this displays all the data belonging to the instance that you pressed on
    router.get('/about/:id',function(req,res){ 
        var data="";
        externalEntities.forEach(value => {
            if(value.id==req.params.id) {
            data =`Id:${value.id}
            Name:${value.name}
            phone:${value.phone}
            email:${value.email}`
            return
            }
        });
        res.send(data);
    })


// Deleting an entity   
// Exaclty the same as Reading but the URL is localhost8000/externalEntities/delete instead of  localhost8000/externalEntities
    router.get('/delete',(req,res)=> {
        var data="";
        externalEntities.forEach(value => {
            data +=`<a href="/api/externalEntities/delete/${value.id}">${value.name}</a></br>` 
        }); 
        res.send(data);
    })

    // Delete the entity that you click on
    router.get('/delete/:id',function (req,res) {
        const EEid = externalEntities.find(EEid=>EEid.id==req.params.id);
        externalEntities.splice(externalEntities.indexOf(EEid),1);
        res.redirect('/api/externalEntities/delete')

    } )

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
