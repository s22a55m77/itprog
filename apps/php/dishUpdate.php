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


<body>

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

<?php
  if(isset($_POST["submitBtn"])) {
    global $conn;
    $id = $_POST["id"];
    $changes_occurred = false;

    if (isset($_POST["category_id"])) {
        $categoryId = $_POST["category_id"];
        mysqli_query($conn, "UPDATE dishes SET category_id='$categoryId' WHERE id='$id'");
        $changes_occurred = true;
    }

    if (isset($_POST["name"])) {
      $name = $_POST["name"];
      mysqli_query($conn, "UPDATE dishes SET name='$name' WHERE id='$id'");
      $changes_occurred = true;
    }

    if (isset($_POST["description"])) {
      $description = isset($_POST["description"]) ? $_POST["description"] : null;
      mysqli_query($conn, "UPDATE dishes SET description='$description' WHERE id='$id'");
      $changes_occurred = true;
    }

    if (isset($_POST["price"])) {
      $price = $_POST["price"];
      mysqli_query($conn, "UPDATE dishes SET price='$price' WHERE id='$id'");
      $changes_occurred = true;
    }

    if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
      $image = $_FILES["image"]["tmp_name"];
      $original_name = $_FILES["image"]["name"];

      $file_extension = pathinfo($original_name, PATHINFO_EXTENSION);

      $image = 'data:image/'.$file_extension.';base64,' . base64_encode(file_get_contents($image));
      mysqli_query($conn, "UPDATE dishes SET image='$image' WHERE id='$id'");
      $changes_occurred = true;
    }

    if($changes_occurred) {
      header("location:dish.php");
    } else {
      $_SESSION["id"] = $id;
      header("location:dishUpdate.php?error=1");
    }
  }
?>

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
  <!-- Confirm Modal -->
  <div class="body">
    <div class="add-container">
      <div class="add-header">
        Update Dish
      </div>
      <?php
        if (isset($_POST["id"])) {
          $id = $_POST["id"];
        } else {
            $id = $_SESSION["id"];
            unset($_SESSION["id"]);
        }

        if(isset($_GET["error"])) {
          $error=$_GET["error"];
          if ($error==1) {
            echo "<div class='alert'>Update Failed<br/></div>";
          }
        }
      ?>
      <!-- update function -->
      <div class="add-content">
        <form action="dishUpdate.php" method="POST" id="updateForm" enctype="multipart/form-data">
          <div class="required">Category Name</div>
          <select class="input" style="height: auto" name="category_id">
            <?php
              $sql = "SELECT * FROM dishes WHERE id = $id";
              $query = mysqli_query($conn, $sql);
              $dish = mysqli_fetch_object($query);

              $categorySql = "SELECT c.id, c.name FROM categories c";
              $categoryQuery = mysqli_query($conn, $categorySql);

              while ($row = mysqli_fetch_assoc($categoryQuery)) {
                $categoryId = $row['id'];
                echo "<option value='$categoryId'";
                if ($categoryId===$dish->category_id) echo "selected='selected'";
                echo ">".$row['name']."</option>";
              }
            ?>
          </select>
          <br />
          <div>Dish Name</div>
          <!--       Get Data from database            -->
          <?php
            echo "<input hidden name=\"id\" value=".$id." />";
            echo "<input class=\"input\" name=\"name\" value='".$dish->name."' />"
          ?>
            <br />
            <div>Description</div>
          <?php
            echo "<textarea class='input' name='description'>".$dish->description."</textarea>";
          ?>
            <br />
            <div>Price</div>
          <?php
            echo "<input class='input' type='number' name='price' value='".$dish->price."'/>"
          ?>
            <br />
            <div>Image</div>
          <?php
            echo "<img src='$dish->image' />";
          ?>
            <input class="input" name="image" style="height: auto" type="file" accept="image/png, image/jpeg"/>
        </form>
      </div>
      <div class="add-content">
        <button class="error"><a href="javascript:history.back()" style="color: #fff">Cancel</a></button>
        <button form="updateForm" name="submitBtn">Submit</button>
      </div>
    </div>
  </div>
</body>

</html>