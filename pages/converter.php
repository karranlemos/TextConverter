<div class="container-converter">
  <div class="field-block full-field-block">
    <div id="options-converter" class="custom-select-container">
      <select>
        <option value="uppercase">Caixa alta</option>
        <option value="lowercase">Caixa baixa</option>
        <option value="alternate-case">Alternar caixa</option>
        <option value="capitalized-text">Capitalizar texto</option>
        <option value="spaced-text">Texto espaçado</option>
        <option value="leetspeak">Leetspeak</option>
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
    <textarea id="input-converter" class="converter-textarea" placeholder="Entrada."></textarea>
  </div>
  <div class="field-block">
    <textarea id="output-converter" class="converter-textarea" placeholder="Saída." readonly></textarea>
  </div>
  <div class="field-block full-field-block execute-converter-block">
    <button type="button" id="execute-converter">Converter</button>
  </div>
</div>