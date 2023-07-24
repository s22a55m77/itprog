<?php
require("utils.php");

checkLogin();
?>
<!DOCTYPE html>
<html lang='en'>
<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>


<?php
  if(isset($_POST['file'])) {
    $xml = new DOMDocument();
    $xml->load($_POST['file']);
    if(!$xml->schemaValidate('menu.xsd')) {
      // xml not valid
      header("location:dishAddXML.php?error=1");
    }
    else {
      // xml valid
      $Menu = simplexml_load_file($_POST['file']);
      foreach ($Menu->Category as $Category) {
        if($Category['exist'] == 'true') {
          // category exist
          global $conn;
          // get category id
          $sql = "SELECT id FROM categories WHERE name = '".$Category['name']."'";
          $query = mysqli_query($conn, $sql);
          $result = mysqli_fetch_object($query);
          $categoryId = $result->id;

          foreach ($Category->Dish as $Dish) {
            $name = $Dish->name;
            $price = $Dish->price;
            $description = $Dish->description;
            $image = $Dish->image;
            // insert
            $sql = "INSERT INTO dishes(category_id, name, description, price, image) 
                    VALUES ('$categoryId', '$name', '$description', '$price', '$image');";
            $query = mysqli_query($conn, $sql);
            // insert failed
            if(mysqli_affected_rows($conn) < 1) {
              header("location:dishAddXML.php?error=2");
            }
          }
        }
        else {
          // category not exist
          global $conn;
          // create category
          $categoryName = $Category['name'];
          $sql = "INSERT INTO categories(name) VALUES ('$categoryName') ";
          $query = mysqli_query($conn, $sql);
          if(mysqli_affected_rows($conn) < 1) {
            header("location:dishAddXML.php?error=2");
          }

          // get category id
          $sql = "SELECT id FROM categories WHERE name = '".$Category['name']."'";
          $query = mysqli_query($conn, $sql);
          $result = mysqli_fetch_object($query);
          $categoryId = $result->id;

          foreach ($Category->Dish as $Dish) {
            $name = $Dish->name;
            $price = $Dish->price;
            $description = $Dish->description;
            $image = $Dish->image;
            // insert
            $sql = "INSERT INTO dishes(category_id, name, description, price, image) 
                    VALUES ('$categoryId', '$name', '$description', '$price', '$image');";
            $query = mysqli_query($conn, $sql);
            // insert failed
            if(mysqli_affected_rows($conn) < 1) {
              header("location:dishAddXML.php?error=2");
            }
          }
        }
      }
      header("location:dishAddXML.php?success=1");
    }
  }
?>

<body>
<!-- NAVBAR -->
<div class="navbar">
  <div>
    <a style="color: #fff" href="index.php"><span>Dish Management System</span></a>
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
      Category
    </a>
    <a class="menu active" href="dish.php">
      Dish
    </a>
    <a class="menu" href="combo.php">
      Combo
    </a>
  </div>

  <!-- BODY -->
  <div class="body">
    <div class="header">
      Upload XML
    </div>
    <div class="add-container" style="padding: 10px">
      <form action="dishAddXML.php" method="POST">
        <input type="file" name="file" />
        <button type="submit" style="margin-top: 5px">Upload</button>
      </form>
    </div>
    <?php
      if(isset($_GET["error"])) {
        $error=$_GET["error"];
        if ($error==1) {
          echo "<div class='alert'>XML is not valid!<br/></div>";
        }
        elseif ($error==2) {
          echo "<div class='alert'>Add Failed!<br/></div>";
        }
      }
      if(isset($_GET["success"])) {
        $error=$_GET["success"];
        if ($error==1) {
          echo "<div class='success'>Success!<br/></div>";
        }
      }
    ?>
  </div>
</div>
</body>
</html>
