const fs = require('fs');
const express = require('express');
const exphbs = require ('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');

app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) =>{
    res.send('Form');
})

app.get('/products', async (req, res) => {
    let result = await getProducts();
    let allProducts = JSON.parse(result);
    res.render('products',{ allProducts });
});

app.post('/', (req, res) => {
    const {style, price, thumbnail} = req.body;
    if (style && price && thumbnail){
        container.getProducts({style, price, thumbnail});
        res.redirect('/products');
    }else {res.send('Missing data')};
})

const getProducts = () => {
    let prods = fs.readFileSync('./products.txt', 'utf8');
    return prods;
}



app.listen(8080, () => {
    console.log(`Server running in port: 8080`);
});