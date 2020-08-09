<?php

const ROUTES = [
  '/',
  '/about/'
];
$route = $_SERVER['REQUEST_URI'];
if (!in_array($route, ROUTES)) {
  header('Location: /', true, 404);
  echo '404';
  die();
}
?>