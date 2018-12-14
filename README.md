# Node.js-MySQL


#1: Customer View (bamazonCustomer)
Link to video of bamazonCustomer:
https://drive.google.com/file/d/1GWA_3aREhTf7q905yhRmJAh3n8GgbY0a/view


MySQL Database called bamazon.
Table inside of that database called products with the following columns:

item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)

Running this application will first display all of the items available for sale, including the ids, names, and prices of products for sale.

The app will then prompt users with two messages.

The first will ask them the ID of the product they would like to buy.
The second message will ask how many units of the product they would like to buy.



Once the customer has placed the order, the application will check if your store has enough of the product to meet the customer's request. If not, the app will Insufficient quantity, let you know how many are available, and then the order from going through.



If there is enough product on hand, the customer's order is fulfilled and the SQL database is modified to reflect the remaining quantity and the customer is shown the total cost of their purchase.



#2: Manager View (bamazonManager)
Link to video of bamazonManager:
https://drive.google.com/file/d/1gLj1QilSy38heDvupVRFi7CwsccDCof4/view

Using the same bamazon database, the following list of menu option appear at the start of the app:

- View Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product


If View Products for Sale is selected, the app will list every available item: the item IDs, names, prices, and quantities.
If View Low Inventory is selectd, then it will list all items with an inventory count lower than five.
If Add to Inventory is selected, the app will display a prompt that will let you "add more" of any item currently inventory.
If Add New Product is selected, the app will  allow you to add a completely new product to inventory.

