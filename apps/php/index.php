<?php
require("utils.php");
require('icon.php');
checkLogin();
?>
<!DOCTYPE html>
<html lang='en'>
<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>

<body>
  <!-- NAVBAR -->
  <div class="navbar">
    <div>
      <span> Dish Management System <span>
    </div>
    <div class="username">
        <div>
            <?php
              echo getUsername();
            ?>
        </div>
        <div class="dropdown">
          <button class="error" name="logout">
            <a href='logout.php' style='color: white'>
              Logout
            </a>
          </button>
        </div>
    </div>
  </div>

  <!-- CONTAINER -->
  <div class="container">
    <!-- SIDEBAR -->
    <div class="sidebar">
      <a class="menu" href="category.php">
        <div style="margin-top: 2px; margin-right: 5px">
            <?php categoryIcon(); ?>
        </div>
        Category
      </a> 
      <a class="menu" href="dish.php">
        <div style="margin-top: 5px; margin-right: 5px">
            <?php dishIcon(); ?>
        </div>
        Dish
      </a> 
      <a class="menu" href="combo.php">
        <div style="margin-top: 3px; margin-right: 5px">
            <?php comboIcon(); ?>
        </div>
        Combo
      </a> 
    </div>
    
    <!-- BODY -->
    <div class="body">
      <div class="main-container">
        <div class="card">
            <div class="card-header">
                Total Amount
            </div>
            <div class="card-content" style="font-size: 40px">
                <?php
                    global $conn;
                    $sql = "SELECT
                                SUM(o.price) AS total_amount
                            FROM orders o
                            WHERE DATE(o.completed_at)='".date("Y-m-d")."'
                            GROUP BY DATE(o.completed_at);";
                    $query = mysqli_query($conn, $sql);
                    if (mysqli_num_rows($query) > 0) {
                        $result = mysqli_fetch_assoc($query);
                        echo "₱".$result['total_amount'];
                    }
                    else {
                        echo "N/A";
                    }
                ?>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                Total Discount
            </div>
            <div class="card-content" style="font-size: 40px">
                <?php
                global $conn;
                $sql = "SELECT SUM((round((o.price/(1-c.discount*0.01)))-o.price))  AS total_discount
                        FROM orders o
                        JOIN combos c ON o.combo_id = c.id
                        WHERE DATE(o.completed_at)='".date("Y-m-d")."';";
                $query = mysqli_query($conn, $sql);
                $result = mysqli_fetch_assoc($query);
                if ($result['total_discount'] != null) {
                    echo "₱".$result['total_discount'];
                }
                else {
                    echo "N/A";
                }
                ?>
            </div>
        </div>
          <div class="card">
              <div class="card-header">
                  Total Dished Sold
              </div>
              <div class="card-content" style="font-size: 40px">
                <?php
                  global $conn;
                  $total = 0;
                  $sql = "SELECT
                            d.name, SUM(od.quantity) AS total_sold, current_date() AS date
                        FROM
                            orders o LEFT JOIN `order-details` od ON o.order_number=od.order_number
                                    LEFT JOIN dishes d ON od.dish_id=d.id
                        WHERE DATE(o.completed_at)=current_date()
                        GROUP BY od.dish_id";
                  $query = mysqli_query($conn, $sql);
                  if (mysqli_num_rows($query) > 0) {
                    while ($row = mysqli_fetch_assoc($query)) {
                        $total += 1;
                    }
                    echo $total;
                  }
                  else {
                    echo "N/A";
                  }
                ?>
              </div>
          </div>
      </div>
        <div class="card" style="margin-top: 10px; margin-left: 15px; width: calc(100% - 15px);">
            <div class="card-header">
                Dishes Sold
            </div>
            <div style="font-size: 40px;">
              <?php
                global $conn;
                $sql = "SELECT
                            d.name, SUM(od.quantity) AS total_sold, current_date() AS date
                        FROM
                            orders o LEFT JOIN `order-details` od ON o.order_number=od.order_number
                                    LEFT JOIN dishes d ON od.dish_id=d.id
                        WHERE DATE(o.completed_at)=current_date()
                        GROUP BY od.dish_id";
                $query = mysqli_query($conn, $sql);
                if (mysqli_num_rows($query) > 0) {
                  echo "<table class='table'>";
                  echo "<tr class='table-header'>";
                  echo "<th>Name</th>";
                  echo "<th>Quantity</th>";
                  echo "</tr>";
                  while ($row = mysqli_fetch_assoc($query)) {
                    echo "<tr>";
                    echo "<td>" . $row['name'] . "</td>";
                    echo "<td>" . $row['total_sold'] . "</td>";
                    echo "</tr>";
                  }
                  echo "</table>";
                }
                else {
                  echo "<div class='card-content'> N/A </div>";
                }
              ?>
            </div>
        </div>
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
        <div style="margin-top: 10px; margin-left: 15px;">
            <form action="exportXML.php" method="POST">
                <button name="XMLBtn"> Export Summary as XML </button>
            </form>
        </div>
    </div>
  </div>
</body>
</html>