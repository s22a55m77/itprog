<!DOCTYPE html>
<html lang='en'>

<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>

<!-- TODO get the login credentials here using $_POST 
          redirect to main.php after successfully login
-->

<body>
  <div class="navbar">
    <div>
      <span> Dish Management System <span>
    </div>
  </div>

  <!-- CONTAINER -->
  <div class="container">
    <!-- Confirm Modal -->
    <div class="body">
      <div class="login-container">
        <div class="login-header">
          Login Form
        </div>
        <div class="login-content">
          <form action="login.php" method="POST">
            <input placeholder="username"/>
            <input type="password" placeholder="password"/>
          </form>
        </div>
        <div class="login-content">
          <button>Login</button>
        </div>
      </div>
    </div>
</body>

</html>