const data = require('./data.json')
const query = require('../dbHelper')

function convertToString(array) {
    let string = '';
    for (let i = 0; i < array.length; i++) {
        string = string + array[i] + " | "
    }
    let string2 = string.slice(0, -2)
    return string2;
}

const discountRange = [0, 10, 20, 30, 40]

function generateRandom(quantity) {
    return Math.floor((Math.random() * quantity) + 1)
}
console.log(data.length)
for (let i = 0; i < data.length; i++) {
    async function insertProductRecord() {
        try {
            const brand = data[i].brand
            const seller = data[i].seller ? data[i].seller : data[i].brand
            const ratings = Number(data[i].ratings)
            const noOfRatings = Number(data[i].no_of_ratings)
            const price = data[i].variant_price
            const comparePrice = data[i].variant_compare_at_price
            const size = Array.isArray(data[i].size) ? convertToString(data[i].size) : data[i].size
            const materialAndCare = Array.isArray(data[i].Material_and_Care) ? convertToString(data[i].Material_and_Care) : data[i].Material_and_Care
            const dominantMaterial = data[i].dominant_material
            const productDetails = Array.isArray(data[i].product_details) ? convertToString(data[i].product_details) : data[i].product_details
            const features = data[i].Features
            const sizeFit = Array.isArray(data[i].Size_and_Fit) ? convertToString(data[i].Size_and_Fit) : data[i].Size_and_Fit
            const inStock = data[i].is_in_stock === "In Stock" ? true : false;
            const stock = generateRandom(100);
            const discount = discountRange[generateRandom(discountRange.length - 1)];
            const title = data[i].title
            const productType = data[i].product_type
            const color = data[i].dominant_color

            const category = data[i].ideal_for === 'Unisex' ? 'Home & Living' : data[i].ideal_for
            const categoryIdObject = await query.findCategoryId(category);
            const categoryId = categoryIdObject.rows[0].id
            console.log(categoryId)
            const subcategory = data[i].subcategory;
            const subCatObject = await query.findSubCatId(subcategory, categoryId);
            const subcategoryId = subCatObject.rows[0].id
            const subSubCategory = data[i].type.split('/')[2];
            const subSubCategoryObject = await query.findProductTypeId(categoryId, subSubCategory, subcategoryId);
            const subSubCategoryId = subSubCategoryObject.rows[0].id
            console.log(subSubCategoryId)
            const newProductObject = await query.addProduct(brand, seller, ratings, noOfRatings, price, comparePrice, size, materialAndCare, dominantMaterial, productDetails, features, sizeFit, inStock, stock, discount, title, productType, color, subSubCategoryId)
            console.log('product inserted')
            const newProductId = newProductObject.rows[0].id;
            console.log('new product id : ', newProductId)
            const allImages = Array.isArray(data[i].images) ? data[i].images : data[i].images.split('|')
            for (let j = 0; j < allImages.length; j++) {
                await query.addNewImage(newProductId, allImages[j])
            }
            console.log('product image inserted')
        }
        catch (err) {
            console.log(err)
        }
    }
    insertProductRecord()
}