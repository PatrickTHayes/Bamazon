# bamazon
mysql and node, utilize npms to make a working mock store. levels Customer, manager, supervisor

Steps to using bamazon.
1. run npm install. package.json will make sure you get the right dependencies.
2. set up the basic database schema and some dummy values by running bamazonSeeds.sql file (mysql -u root <bamazonSeeds.sql)
3.
3. Run the bamazonCustomer.js in node
    --on load it will display a list of products and some general info
    --it will prompt the user what they would like to buy based on the id from the previous list
    --after selecting an ID they will be prompted for the quantity they wish to buy
        --if there is enough stock it will print out the cost, "success", and bring up the updated list of products if the
        customer wants to buy more items
        --if there isn't enough stock it will print "We dont have that many, please place a different order" and bring back
        the list of items the customer can order
![img1](/bamazonImages/bamCustomerImg1.PNG)
![img2](/bamazonImages/bamCustomerImg2.PNG)
4. In order for Supervisor to work, its important to make at least one succesful transaction in each department!
5. Run the bamazonManager.js in node
    -- it will display a list of 4 choices and prompt the user to choose one.
                'View Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product'
    Selecting the first one will list inside a table all of the current products and some information before bringing up the menu again
    The second will only show inventory in a table will fewer than 5 in quantity
    The third will bring up a list of product names and prompt the user to select one. After it will prompt for a number being added
        It then adds the quantity and updates the database with the new total.
    The fourth will prompt the user for a name of an item to be added, the department it belongs in, the price, and quantity.
        After user input will update the database products table with a new item.
![img1](/bamazonImages/bamManagerImg1.PNG)
![img2](/bamazonImages/bamManagerImg2.PNG)
![img3](/bamazonImages/bamManagerImg3.PNG)
![img4](/bamazonImages/bamManagerImg4.PNG)
![img5](/bamazonImages/bamManagerImg5.PNG)

6. Run the bamazonSupervisor.js in node
        Make sure you did steps 1,2,4 first
        It will prompt the user for one of two options
                'View Product Sales by Department',
                'Create New Department'
        The first option will bring up a table like this:

──────────────────────────────┬──────────────────────────────┬──────────────────────────────┬──────────────────────────────┬──────────────────────────────┐
│ department id                │ department name              │ Over Head Costs              │ total sales                  │ total profit                 │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 1                            │ Furniture                    │ 1000                         │ 1800                         │ 800                          │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 3                            │ Electronics                  │ 3000                         │ 2400                         │ -600                         │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ 2                            │ Produce                      │ 250                          │ 86                           │ -664                         │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
        The second option will just output a "running create" line
![img1](/bamazonImages/bamSuperImg1.PNG)
![img2](/bamazonImages/bamSuperImg2.PNG)





screenshots

