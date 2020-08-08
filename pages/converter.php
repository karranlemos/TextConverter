<div class="container-converter">
  <div class="field-block full-field-block">
    <div id="options-converter" class="custom-select-container">
      <select>
        
        <?php
        $options = [
          'uppercase' => 'Uppercase',
          'lowercase' => 'Lowercase',
          'alternate-case' => 'Alternate Case',
          'capitalized-text' => 'Capitalized',
          'spaced-text' => 'Spaced',
          'leetspeak' => 'Leetspeak'
        ];

        foreach ($options as $value => $text) {
          echo '<option value="'.$value.'">'.$lang_codes->translate($text).'</option>';
        }
        ?>

      </select>
      <div class="select">
        <button class="select-head">
          <span class="select-head-text">--------------</span>
          <span class="select-head-icon"></span>
        </button>
        <div class="select-options">
          <!--<button class="select-option"></button>-->
        </div>
      </div>
    </div>
  </div>
  <div class="field-block">
    <textarea id="input-converter" class="converter-textarea" placeholder="<?=$lang_codes->translate('Input')?>"></textarea>
  </div>
  <div class="field-block full-field-block execute-converter-block mobile-only">
    <button type="button" class="execute-converter"><?=$lang_codes->translate('Convert')?></button>
  </div>
  <div class="field-block">
    <textarea id="output-converter" class="converter-textarea" placeholder="<?=$lang_codes->translate('Output')?>" readonly></textarea>
  </div>
  <div class="field-block full-field-block execute-converter-block desktop-only">
    <button type="button" class="execute-converter"><?=$lang_codes->translate('Convert')?></button>
  </div>
</div>