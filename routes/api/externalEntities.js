const express = require('express');
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



module.exports = router;
