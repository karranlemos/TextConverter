<?php

define('__ROOT__', dirname(__FILE__));

// $lang_codes
require_once(__ROOT__.'/model/model.php');

const ROUTES = [
  '/',
  '/about/'
];
$route = $_SERVER['REQUEST_URI'];
$route .= (substr(rtrim($route), -1) !== '/') ? '/' : '';
if (!in_array($route, ROUTES)) {
  header('Location: /', true, 404);
  echo '404';
  die();
}

require_once(__ROOT__.'/view/template.php');

?>