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
    $categoryId = $_POST["category_id"];
    $name = $_POST["name"];
    $description = isset($_POST["description"]) ? $_POST["description"] : null;
    $price = $_POST["price"];
    $image = isset($_FILES["image"]) ? $_FILES["image"]["tmp_name"] : null;
    if (isset($_FILES["image"])) {
      // Get the original name of the uploaded file
      $original_name = $_FILES["image"]["name"];

      // Get the file extension from the original name using pathinfo
      $file_extension = pathinfo($original_name, PATHINFO_EXTENSION);

      $image = 'data:image/'.$file_extension.';base64,' . base64_encode(file_get_contents($image));

    }
    $sql = "INSERT INTO dishes(category_id, name, description, price, image) 
                    VALUES ('$categoryId', '$name', '$description', '$price', '$image');";
    $query = mysqli_query($conn, $sql);

    if(mysqli_affected_rows($conn) >= 1) {
      header("location:dish.php");
    } else {
      header("location:dishAdd.php?error=1");
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
                Add Dish
            </div>
            <!-- add function  -->
            <div class="add-content">
                <form action="dishAdd.php" method="POST" id="addForm" enctype="multipart/form-data">
                    <div class="required">Category Name</div>
                    <select class="input" style="height: auto" name="category_id">
                        <?php
                            global $conn;
                            $sql = "SELECT c.id, c.name FROM categories c";
                            $query = mysqli_query($conn, $sql);

                            while ($row = mysqli_fetch_assoc($query)) {
                                $id = $row['id'];
                                echo "<option value='$id'>" . $row['name'] . "</option>";
                            }
                        ?>
                    </select>
                    <br />
                    <div class="required">Name</div>
                    <input class="input" type="text" name="name" required/>
                    <br />
                    <div class="required">Price</div>
                    <input class="input" type="number" name="price" required/>
                    <br />
                    <div>Description</div>
                    <textarea class="input" name="description" ></textarea>
                    <br />
                    <div>Image</div>
                    <input class="input" name="image" style="height: auto" type="file" accept="image/png, image/jpeg"/>
                </form>
            </div>
            <div class="add-content">
                <button class="error"><a href="javascript:history.back()" style="color: #fff">Cancel</a></button>
                <button form="addForm" name="submitBtn">Submit</button>
            </div>
        </div>
    </div>
</body>

</html>