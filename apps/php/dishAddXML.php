<?php
require("utils.php");
require("icon.php");
checkLogin();
?>
<!DOCTYPE html>
<html lang='en'>
<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>


<?php
  if(isset($_FILES['file']) && !empty($_FILES['file'])) {
    $xml = new DOMDocument();
    $xml->loadXML(file_get_contents($_FILES['file']["tmp_name"]));
    if(!$xml->schemaValidate('menu.xsd')) {
      // xml not valid
      header("location:dishAddXML.php?error=1");
    }
    else {
      // xml valid
      $Menu = simplexml_load_string(file_get_contents($_FILES['file']["tmp_name"]));
      //validate category
      $error = false;
      foreach ($Menu->Category as $Category) {
        if ($Category['exist'] == 'true') {
          // category exist
          global $conn;
          // get category id
          $sql = "SELECT id FROM categories WHERE name = '" . $Category['name'] . "'";
          $query = mysqli_query($conn, $sql);
          $result = mysqli_fetch_object($query);
          $categoryId = $result->id;
          if (mysqli_affected_rows($conn) == 0) {
            $error = true;
            header("location:dishAddXML.php?error=5");
            return;
          }
        }elseif ($Category['exist'] == 'false') {
            // category not exist
            global $conn;
            //test category not exist
            // get category id
            $sql = "SELECT id FROM categories WHERE name = '" . $Category['name'] . "'";
            $query = mysqli_query($conn, $sql);
            $result = mysqli_fetch_object($query);
            $categoryId = $result->id;
            echo $categoryId;
            if (mysqli_affected_rows($conn) > 0) {
              $error = true;
              header("location:dishAddXML.php?error=4");
              return;
            }
          }
      }
      if(!$error) {
        // insert
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
                return;
              }
            }
          }
          elseif($Category['exist'] == 'false') {
            // category not exist
            global $conn;

            // create category
            $categoryName = $Category['name'];
            $sql = "INSERT INTO categories(name) VALUES ('$categoryName') ";
            $query = mysqli_query($conn, $sql);
            if(mysqli_affected_rows($conn) < 1) {
              header("location:dishAddXML.php?error=2");
              return;
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
                return;
              }
            }
          }
        }
        header("location:dishAddXML.php?success=1");
      }
    }
  } else {
      if(isset($_POST['submit'])) {
        header("location:dishAddXML.php?error=3");
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
    <div class="header">
      Upload XML
    </div>
    <div class="add-container" style="padding: 10px">
      <form action="dishAddXML.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" />
        <button type="submit" style="margin-top: 5px" name="submit">Upload</button>
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
        elseif ($error==3) {
          echo "<div class='alert'>No File!<br/></div>";
        }
        elseif ($error==4) {
          echo "<div class='alert'>XML is not valid! Category already exist<br/></div>";
        }
        elseif ($error==5) {
          echo "<div class='alert'>XML is not valid! Category not exist, but exist is true<br/></div>";
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
