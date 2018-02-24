// Require node packages
var inquirer = require('inquirer');
var mysql = require("mysql");

// Link to MySQL Database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

// Make connection to Database
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  queryAllProducts();
});

// Query db 'products' table for all items and display to the customer
function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res){
// Error Handler
    if(err) throw err;
  console.log("Here is the list of items to choose from: \n");
  console.log("ID | Product Name | Price | Quantity Available");
  console.log("==============================================");

//loop through database to get all items and console log to customer
    for (var i = 0; i < res.length; i++) {
    console.log (res[i].item_id + "  |  " + res[i].product_name + "  |   " + res[i].price + "   |   " + res[i].stock_quantity);
    //console.log("==============================================");
    }
startBuying();
  });
};
var newQuantity; 
var itemID;
//Ask the user to choose from inventory list you just diaplyaed using the ID number and enter a quantity.
function startBuying(){ 
  connection.query("SELECT * FROM products", function(err, res) {
    if(err) throw err;
  // once you have the items, prompt the user for items they would like to buy
  inquirer.prompt([
  {
    type: "input",
      message: "Enter the ID of the item you wish to buy: ",
      name: "product"
    },
  {
      type: "input",
      message: "Enter quantity you would like: ",
      name: "quantity"
    }
  ]).then(function(answer) {
    //store the users answers in variables
    var quantityEntered = answer.quantity;
    // console log user's quantity and ID of selected item.
      console.log("\nYou selected " + answer.quantity + " each of ID#" + answer.product);

    //Query DB to check if enough quantity in stock to fulfill order and if not respond to customer to try again.
      connection.query("SELECT * FROM products WHERE ?", 
        [
        {item_id: answer.product}
        ], 
        function(err,res) {
        if(err) throw err; //error handler
          if(answer.quantity > res[0].stock_quantity) {
            console.log("Sorry, insufficent quantity in stock to fulfill your request. Please review the quantity available and try again.\n");
            startBuying();

      //If sufficient quantity in inventory, process order by displaying to customer how much their total is and update db inventory accordingly.
          } else {
            var itemPrice = res[0].price;
            var total = itemPrice  * answer.quantity;
            console.log("Thank you for your ordering " + res[0].product_name+"!");
            console.log("Your total is: $" + total);
            
          newQuantity = res[0].stock_quantity - answer.quantity;
          itemID = answer.product; 
          // console.log(itemID);
            console.log("\nThere are now " + newQuantity + " left in stock after your purchase.");
        
          updateProduct();
              }
            });


          }) 
        });
      }

        function updateProduct(){
          var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [ 
              {stock_quantity: newQuantity},
              {item_id: itemID}
            ],
          function(err,res){
            if(err) throw err;
            connection.end();
          })
          console.log(query.sql);
        } 
// Update mySQL database with reduced inventory
//             var newInventory = parseInt(bamazonQuantity) - parseInt(buyItemQuantity); 
//             connection.query('UPDATE Products SET ? WHERE ?', [{stock_quantity: newInventory}, {ItemID: buyItemID}], function(err, res){
//               if(err) throw err; // Error Handler
//             }); // end inventory update query
//       connection.end(); // end the connection