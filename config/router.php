<?php

const ROUTES = [
  '/' => 'converter',
  '/about/' => 'about'
];
$route = $_SERVER['REQUEST_URI'];
if (!array_key_exists($route, ROUTES)) {
  header('Location: /', true, 404);
  echo '404';
  die();
}

$to_js->submit('routesSections', ROUTES);
$to_js->submit('sectionsRoutes', array_flip(ROUTES));
?>