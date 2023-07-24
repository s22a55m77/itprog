<?php
  require ('utils.php');

  if(isset($_POST['XMLBtn'])) {
    global $conn;

    // Amount
    $sql = "SELECT
                SUM(o.price) AS total_amount
            FROM orders o
            WHERE DATE(o.completed_at)='".date("Y-m-d")."'
            GROUP BY DATE(o.completed_at);";
    $query = mysqli_query($conn, $sql);
    $amount = 0;
    if (mysqli_num_rows($query) > 0) {
      $result = mysqli_fetch_assoc($query);
      $amount = $result['total_amount'];
    }

    // Discount
    $sql = "SELECT SUM((round((o.price/(1-c.discount*0.01)))-o.price))  AS total_discount
                        FROM orders o
                        JOIN combos c ON o.combo_id = c.id
                        WHERE DATE(o.completed_at)='".date("Y-m-d")."';";
    $query = mysqli_query($conn, $sql);
    $result = mysqli_fetch_assoc($query);
    $discount = 0;
    if ($result['total_discount'] != null) {
      $discount = $result['total_discount'];
    }

    // Total Dishes
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
    }

    $xml = new SimpleXMLElement('<Summary/>');
    $xml->addChild('date', date("Y-m-d"));
    $xml->addChild('amount', $amount);
    $xml->addChild('discount', $discount);
    $dishes = $xml->addChild('Dishes');
    $dishes->addChild('total', $total);

    // dish for loop
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
        $dish = $dishes->addChild('Dish');
        $dish->addChild('name',$row['name'] );
        $dish->addChild('sold',$row['total_sold'] );
      }
    }
    file_put_contents('test.xml', $xml->asXML());

    $file_name = 'test.xml';
    $file_path = __DIR__ . '/' . $file_name;
    header('Content-Description: File Transfer');
    header('Content-Type: application/xml');
    header('Content-Disposition: attachment; filename=' . $file_name);
    header('Content-Length: ' . filesize($file_path));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    readfile($file_path);
  }
?>