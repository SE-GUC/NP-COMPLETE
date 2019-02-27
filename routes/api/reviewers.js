const express = require('express');
const joi = require('joi');
const router = express.Router();

const Reviewer = require('../../models/Reviewer');

const reviewers = 
[
    new Reviewer(1, "Omar", new Date(1998, 9, 7), new Date(2010), 6, 3000.0)
];

//View All
router.get('/', (req, res) =>
{
    res.json(reviewers)
});

//get certain reviewer
router.get('/:id', (req, res) => {
    const revid = req.params.id
    const reviewer = reviewers.find(reviewer => reviewer.id === revid)
    if(!reviewer)
        res.json(reviewer)
    else
        res.status(400).json({
        status: "Error",
        message: "Sorry, This Reviewer does not Exist!",
        avaliablereviewers: reviewers
    })
})



//Create
router.post('/', (req, res) =>
{
    const name = req.body.name;
    const birthdate = req.body.birthdate;
    const starting_year = req.body.starting_year;
    const working_hours = req.body.working_hours;
    const salary = req.body.salary;

    const schema = 
    {
        name: joi.string().min(3).max(20).alphanum().required(),
        birthdate: joi.date().max(Date.now()).required(),
        starting_year: joi.date().max(Date.now()).required(),
        working_hours: joi.number().min(3).max(12).integer().required(),
        salary: joi.number().min(500.0).max(10000.0).required()
    };

    const result = joi.validate(req.body, schema);

    if (result.error) return res.status(400).send({ error: result.error.details[0].message });

    const inserted = new Reviewer(name, birthdate, starting_year, working_hours, salary);
    reviewers.push(inserted);

    return res.json(200, `Reviewer <a href="api/reviewers/${inserted.id}">${name}</a> has ben inserted`);
});

//Update
router.post('/:id', (req, res) =>
{
    const id = req.param.id;
    const name = req.body.name;
    const birthdate = req.body.birthdate;
    const starting_year = req.body.starting_year;
    const working_hours = req.body.working_hours;
    const salary = req.body.salary;

    const updated = reviewers.find(r => r.id === id);

    if (updated === undefined) return res.json(404, `<h3>No such ID exists</h3>`);

    const schema = 
    {
        name: joi.string().min(3).max(20).alphanum(),
        birthdate: joi.date().max(Date.now()),
        starting_year: joi.date().max(Date.now()),
        working_hours: joi.number().min(3).max(12).integer(),
        salary: joi.number().min(500.0).max(10000.0)
    };

    const result = joi.validate(req.body, schema);

    if (result.error) return res.json(400, { error: result.error.details[0].message });

    let changed = false;
    changed |= name !== undefined;
    changed |= birthdate !== undefined;
    changed |= starting_year !== undefined;
    changed |= working_hours !== undefined;
    changed |= salary !== undefined;

    if (!changed) return res.json(400, `<h3>No element was changed</h3>`);

    if (name !== undefined)
        updated.name = name;

    if (birthdate !== undefined)
        updated.birthdate = birthdate;

    if (starting_year !== undefined)
        updated.starting_year = starting_year;

    if (working_hours !== undefined)
        updated.working_hours = working_hours;

    if (salary !== undefined)
        updated.salary = salary;

    return res.json(200, `<a href="api/reviewers/${id}">${updated.name}</a> has been updated`);
});


// Delete a Reviwer
router.delete('/:id', (req, res) => {
    const revid = req.params.id 
    const Reviewer = reviewers.find(reviewer => reviewer.id === revid)
    if(Reviewer !== undefined)
    {
        const index = reviewers.indexOf(Reviewer)
        reviewers.splice(index,1)
        res.json(reviewers)
    }
    else
    {
        res.status(400).json({
            status: "Error",
            message: "Sorry, This Reviewer does not Exist!",
            avaliablereviewers: reviewers
        })
    }
})


module.exports = router;