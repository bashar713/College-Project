const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', (request, response) => {
    response.render('index', {

    });
})
router.get('/dashboard/edit/:_id',async(request,response)=>{
    const categories = await Category.find({"_id" : request.params._id}).populate('accountId');
    // console.log(categories);
    response.render('edit-page',{
        categories : categories
    });
})
router.get('/dashboard/delete/:_id',async(request,response)=>{
    // const categories = await Category.deleteOne({"_id" : request.params._id}).populate('accountId');
    Category.findByIdAndRemove(request.params._id) //findAndModify
    .then(result => {
        response.redirect('/dashboard');
    })
    .catch(err => console.log(err));
    // console.log(categories);
    // response.render('dashboard',{
    //     categories : categories
    // });
})
module.exports = router;