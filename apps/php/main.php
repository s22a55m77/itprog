<!DOCTYPE html>
<html lang='en'>
<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>

<!-- TODO add the session guard here
          redirect to login.php if not login
-->
<?php
    require("utils.php");

    checkLogin();
?>

<body>
  <!-- NAVBAR -->
  <div class="navbar">
    <div>
      <span> Dish Management System <span>
    </div>
    <div>
        <?php
            echo getUsername();
        ?>
    </div>
  </div>

  <!-- CONTAINER -->
  <div class="container">
    <!-- SIDEBAR -->
    <div class="sidebar">
      <a class="menu" href="category.php">
        Category
      </a> 
      <a class="menu" href="dish.php">
        Dish
      </a> 
      <a class="menu" href="combo.php">
        Combo
      </a> 
    </div>
    
    <!-- BODY -->
    <div class="body">
      1
        <?php
            /*
            SELECT
                d.name, SUM(od.quantity) AS total_sold, current_date() AS date
            FROM
                orders o LEFT JOIN `order-details` od ON o.order_number=od.order_number
                        LEFT JOIN dishes d ON od.dish_id=d.id
            WHERE DATE(o.completed_at)=current_date() -- '2023-06-27' for test
            GROUP BY od.dish_id


            name   total_sold  date
            Steak	6	2023-07-17
            Steamed Vegetables	8	2023-07-17
            Root Beer	8	2023-07-17
            Salmon	2	2023-07-17
            Chicken	2	2023-07-17

            SELECT SUM((round((o.price/(1-c.discount*0.01)))-o.price))  AS total_discount
            FROM orders o
            JOIN combos c ON o.combo_id = c.id
            WHERE DATE(o.completed_at)='2023-06-27';

            SELECT
                SUM(o.price) AS total_amount
            FROM orders o
            WHERE DATE(o.completed_at)='2023-06-27'
            GROUP BY DATE(o.completed_at);

             * */
        ?>
    </div>
  </div>
</body>
</html>