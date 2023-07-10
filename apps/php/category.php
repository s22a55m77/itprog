<!DOCTYPE html>
<html lang='en'>
<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>

<!-- TODO add the session guard here
          redirect to login.php if not login
-->


<body>
  <!-- NAVBAR -->
  <div class="navbar">
    <div>
      <span>
        <a style="color: #fff" href="main.php"> Dish Management System </a>
      </span>
    </div>
    <div>
      username
    </div>
  </div>

  <!-- CONTAINER -->
  <div class="container">
    <!-- SIDEBAR -->
    <div class="sidebar">
      <a class="menu active" href="category.php">
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
      <div class="header">
        Category
      </div>
      <div class="content">
        <div class="content-header">
          <span>Category Table</span>
          <div>
            <button>+ New</button>
            <button>
              <a href="category.php" style="color: #fff;">
                Refresh
              </a>
            </button>
          </div>
        </div>  
        <table class="table">
          <tr class=table-header>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          <!-- TODO fetch data from db -->
          <tr>
            <td>1</td>
            <td>Mains</td>
            <td>Delete Update</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Sides</td>
            <td>Delete Update</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Drink</td>
            <td>Delete Update</td>
          </tr>
          <!-- END OF TODO-->
        </table>
      </div>
    </div>
  </div>
</body>
</html>