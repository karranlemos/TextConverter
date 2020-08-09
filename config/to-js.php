<?php

class ToJS {

  private const JS_OBJECT = 'fromPHP';
  private $items_echoed;
  public function __construct() {
    $this->items_echoed = [];
    $this->echo_js('var '.self::JS_OBJECT.' = {};');
  }

  public function submit($key, $value, $overwrite=false) {
    if (in_array($key, $this->items_echoed) && !$overwrite)
      throw new InvalidArgumentException('Key already exists');
    array_push($this->items_echoed, $key);
    
    $key_escaped = addslashes($key);
    $value_escaped = addslashes($value);

    $this->echo_js(self::JS_OBJECT.'["'.$key_escaped.'"] = "'.$value_escaped.'"');
  }

  private function echo_js($js) {
    echo "<script>".$js."</script>";
  }
}

$to_js = new ToJS();