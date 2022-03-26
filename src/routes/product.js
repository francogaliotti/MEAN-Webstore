const router=require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('mean-db', ['product'])

router.get('/product', (req,res,next)=>{
    db.product.find((err, products)=>{
        if (err) next(err);
        res.json(products);
    });
});
router.get('/product/:id', (req,res,next)=>{
    db.product.findOne({_id:mongojs.ObjectID(req.params.id)},(err, product)=>{
        if (err) next(err);
        res.json(product);
    });
});
router.post('/product', (req,res,next)=>{
    const product = req.body;
    if(!product.tittle || !(product.price)){
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.product.save(product, (err, product)=>{
            if(err) return next(err);
            res.json(product);
        });
    }
});
router.delete('/product/:id', (req,res,next)=>{
    db.product.remove({_id:mongojs.ObjectID(req.params.id)}, (err, result)=>{
        if (err) return next(err);
        res.json(result);
    });
});
router.put('/product/:id', (req,res,next)=>{
    const product = req.body;
    if(!product.tittle || !(product.price)){
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
    db.product.update({_id:mongojs.ObjectID(req.params.id)}, product , (err, product)=>{
        if (err) return next(err);
        res.json(product);
    });
}
});

module.exports = router;