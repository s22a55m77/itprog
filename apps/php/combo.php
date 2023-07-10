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
      <a class="menu" href="category.php">
        Category
      </a> 
      <a class="menu" href="dish.php">
        Dish
      </a> 
      <a class="menu active" href="combo.php">
        Combo
      </a> 
    </div>
    
    <!-- BODY -->
    <div class="body">
      <div class="header">
        Combo
      </div>
      <div class="content">
        <div class="content-header">
          <span>Combo Table</span>
          <div>
            <button>+ New</button>
            <button>
              <a href="combo.php" style="color: #fff;">
                Refresh
              </a>
            </button>
          </div>
        </div>  
        <table class="table">
          <tr class=table-header>
            <th>ID</th>
            <th>Name</th>
            <th>Dish</th>
            <th>Discount</th>
            <th>Action</th>
          </tr>
          <!-- TODO fetch data from db -->
          <tr>
            <td>1</td>
            <td>Chicken Mash Tea Combo</td>
            <td>Chicken</td>
            <td>10</td>
            <td>Delete Update</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Chicken Mash Tea Combo</td>
            <td>Mash Potato</td>
            <td>10</td>
            <td>Delete Update</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Chicken Mash Tea Combo</td>
            <td>Ice Tea</td>
            <td>10</td>
            <td>Delete Update</td>
          </tr>
          <!-- END OF TODO-->
        </table>
      </div>
    </div>
  </div>
</body>
</html>