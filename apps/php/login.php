<!DOCTYPE html>
<html lang='en'>

<head>
  <title>Dish Management</title>
  <link rel="stylesheet" href="global.css">
</head>

<!-- TODO get the login credentials here using $_POST 
          redirect to main.php after successfully login
-->
<?php
    mysql_connect("localhost", "root", "") or die(mysql_error()); // Connect to database server(localhost)
    mysql_select_db("itprog.mysql.database.azure.com") or die(mysql_error()); // Select database.

    if(isset($_POST['username']) && !empty($_POST['username']) AND isset($_POST['password']) && !empty($_POST['password'])){
    $UserID = mysql_escape_string($_POST['username']);
    $pass = mysql_escape_string(md5($_POST['password']));

    $search = mysql_query("SELECT username, password FROM users WHERE username='".$UserID."' AND password='".$pass."'") or die(mysql_error()); 
    $match  = mysql_num_rows($search);   //search database for user info

    if($match > 0){
         $msg = 'Login Complete!';    
         header("location: main.php");
         exit;   
    }else{
         $msg = 'Login Failed!<br /> Please make sure that you enter the correct details.';
    }
 }
?>

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