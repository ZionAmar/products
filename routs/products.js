const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const products = [];
let nextID = 1;
//יוצר את התקיה אם אינה קיימת
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}
//מייצר את אובייקט ההוספה ואת השם שלו
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    let id = req.params.id ? req.params.id : nextID;
    let finalFilename = `${id}${path.extname(file.originalname)}`;
    cb(null, finalFilename);
  }
});
const upload = multer({ storage: storage });


router.get('/',(req,res)=>{
    res.json(products)
})

router.post('/',upload.single('myFile'),(req,res)=>{
    let id = nextID++;
    let name = req.body.name;
    let price = req.body.price;
    let filename = req.file ? req.file.filename : null;
    let product = {id,name,price:parseFloat(price),filename}
    products[id] = product;
    res.json({message:"נוסף"})
})

module.exports = router;