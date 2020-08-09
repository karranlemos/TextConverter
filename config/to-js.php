<?php

class ToJS {

  private const JS_OBJECT = 'fromServer';
  private $items_echoed;
  public function __construct() {
    $this->items_echoed = [];
    $this->echo_js('var '.self::JS_OBJECT.' = {};');
  }

  public function submit($key, $value, $overwrite=false) {
    if (in_array($key, $this->items_echoed) && !$overwrite)
      throw new InvalidArgumentException('Key already exists');
    
    $key_escaped = addslashes($key);

    $command = self::JS_OBJECT.'["'.$key_escaped.'"] = ';
    switch (gettype($value)) {
      case 'string':
        $value_escaped = addslashes($value);
        $this->echo_js($command.'"'.$value_escaped.'"');
        break;
      case 'array':
        $value_escaped = json_encode($value);
        $this->echo_js($command.$value_escaped);
        break;
      default:
        throw new InvalidArgumentException('Value must be array or string.');
        break;
    }

    array_push($this->items_echoed, $key);
    
  }

  private function echo_js($js) {
    echo "<script>".$js."</script>";
  }
}

$to_js = new ToJS();