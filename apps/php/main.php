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
    <div>
      username
    </div>
  </div>

  <!-- CONTAINER -->
  <div class="container">
    <!-- SIDEBAR -->
    <div class="sidebar">
      <a class="menu active" href="">
        Category
      </a> 
      <a class="menu" href="">
        Dish
      </a> 
      <a class="menu" href="">
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
            <button>Refresh</button>
          </div>
        </div>  
        <table class="table">
          <tr class=table-header>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>Delete Update</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</body>
</html>