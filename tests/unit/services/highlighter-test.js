import { moduleFor, test, only } from 'ember-qunit';


moduleFor('service:highlighter', 'Unit | Service | highlighter', { 
    needs: ['service:blocksGallery', 'service:blockly'],
    setup() {
        var highlighter = this.subject()
        let workspace = new Blockly.Workspace()
        workspace.highlightBlock = function() { } //Mocking (?)
        highlighter.workspace = workspace
        
        this.container.lookup('service:blocksGallery').start()
        highlighter.clear()
    }
});

let linealProgram = [`
<block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="269" y="15">
    <statement name="program">
    <block type="MoverACasillaDerecha">
        <next>
        <block type="MoverACasillaIzquierda">
            <next>
            <block type="MoverACasillaDerecha"></block>
            </next>
        </block>
        </next>
    </block>
    </statement>
</block>
`]

test('Should not highlight program block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 1, linealProgram)
    assertHighlight(assert, highlighter, [])
});


test('On lineal program should highlight only current block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 3, linealProgram)
    assertHighlight(assert, highlighter, ['MoverACasillaIzquierda'])
});


let repetitionProgram = [`
<block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="269" y="15">
    <statement name="program">
    <block type="MoverACasillaArriba">
        <next>
        <block type="repetir">
            <value name="count">
            <block type="math_number">
                <field name="NUM">1</field>
            </block>
            </value>
            <statement name="block">
            <block type="MoverACasillaIzquierda">
                <next>
                <block type="MoverACasillaDerecha"></block>
                </next>
            </block>
            </statement>
            <next>
            <block type="MoverACasillaAbajo"></block>
            </next>
        </block>
        </next>
    </block>
    </statement>
</block>
`]

test('Should highlight repetition block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 3, repetitionProgram)
    assertHighlight(assert, highlighter, ['repetir'])
});

test('When enter on repetition block should only highlight current block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 5, repetitionProgram)
    assertHighlight(assert, highlighter, ['MoverACasillaDerecha'])
});

test('When go out repetition block should only highlight next block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 6, repetitionProgram)
    assertHighlight(assert, highlighter, ['MoverACasillaAbajo'])
});


let alternativeProgram = [`
<block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="269" y="15">
    <statement name="program">
    <block type="MoverACasillaAbajo">
        <next>
        <block type="si">
            <value name="condition">
            <block type="HayTomate"></block>
            </value>
            <statement name="block">
            <block type="MoverACasillaArriba">
                <next>
                <block type="MoverACasillaAbajo"></block>
                </next>
            </block>
            </statement>
            <next>
            <block type="MoverACasillaAbajo"></block>
            </next>
        </block>
        </next>
    </block>
    </statement>
</block>
`]

test('Should highlight alternative block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 3, alternativeProgram)
    assertHighlight(assert, highlighter, ['si'])
});

test('When enter on alternative block should only highlight current block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 5, alternativeProgram)
    assertHighlight(assert, highlighter, ['MoverACasillaAbajo'])
});

test('When go out alternative block should only highlight next block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 6, alternativeProgram)
    assertHighlight(assert, highlighter, ['MoverACasillaAbajo'])
});

let programWithProcedures = [`
<block type="al_empezar_a_ejecutar" deletable="false" movable="false" editable="false" x="15" y="15">
    <statement name="program">
      <block type="DibujarLado">
        <value name="longitud">
          <block type="math_number">
            <field name="NUM">100</field>
          </block>
        </value>
        <next>
          <block type="procedures_callnoreturn">
            <mutation name="procedimiento general"></mutation>
            <next>
              <block type="DibujarLado">
                <value name="longitud">
                  <block type="math_number">
                    <field name="NUM">100</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
</block>`,
`<block type="procedures_defnoreturn" x="46" y="247">
    <field name="NAME">procedimiento general</field>
    <comment pinned="false" h="80" w="160">Describe esta función...</comment>
    <statement name="STACK">
      <block type="GirarGrados">
        <value name="grados">
          <block type="math_number">
            <field name="NUM">90</field>
          </block>
        </value>
        <next>
          <block type="procedures_callnoreturn">
            <mutation name="procedimiento especifico"></mutation>
            <next>
              <block type="GirarGrados">
                <value name="grados">
                  <block type="math_number">
                    <field name="NUM">90</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </statement>
</block>`,
`<block type="procedures_defnoreturn" x="62" y="421">
    <field name="NAME">procedimiento especifico</field>
    <comment pinned="false" h="80" w="160">Describe esta función...</comment>
    <statement name="STACK">
      <block type="SaltarHaciaAdelante">
        <value name="longitud">
          <block type="math_number">
            <field name="NUM">100</field>
          </block>
        </value>
        <next>
          <block type="SaltarHaciaAdelante">
            <value name="longitud">
              <block type="math_number">
                <field name="NUM">100</field>
              </block>
            </value>
          </block>
        </next>
      </block>
    </statement>
</block>
`]

test('Should not highlight procedure definition block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 4, programWithProcedures)
    assertHighlight(assert, highlighter, ['procedures_callnoreturn'])
});

test('When enter on procedure block should highlight procedure call and current block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 5, programWithProcedures)
    assertHighlight(assert, highlighter, ['procedures_callnoreturn', 'GirarGrados'])
});

test('Step on procedure block should highlight procedure call and go lineal', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 6, programWithProcedures)
    assertHighlight(assert, highlighter, ['procedures_callnoreturn', 'procedures_callnoreturn'])
});

test('Should highlight all procedure calls involve in current stack', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 8, programWithProcedures)
    assertHighlight(assert, highlighter, ['procedures_callnoreturn', 'procedures_callnoreturn', 'SaltarHaciaAdelante'])
});

test('When go out procedure block should only highlight next block', function(assert) {
    var highlighter = this.subject()
    loadProgramAndSendSteps(highlighter, 11, programWithProcedures)
    assertHighlight(assert, highlighter, ['DibujarLado'])
});


function loadProgramAndSendSteps(highlighter, steps, blocksAsText) {
    let definitionIndex = 0
    let definitionBlocks = blocksAsText
        .map(Blockly.Xml.textToDom)
        .map(dom => Blockly.Xml.domToBlock(dom, highlighter.workspace))

    let ignoredBlockTypes = ["math_number", "HayTomate"]
    // Esta ejecución solamente RECORRE los bloques. ¡No tiene en cuenta la lógica!
    // En los procedure_call ejecuta el próximo bloque de definición
    function doStep(block) {
        if (steps == 0 || ignoredBlockTypes.includes(block.type)) return
        highlighter.step(block.id)
        steps--
        if (block.defType_) { // procedure_call
            definitionIndex++
            doStep(definitionBlocks[definitionIndex])
        }
        block.getChildren().forEach(doStep)
    }
    doStep(definitionBlocks[definitionIndex])
}

//TODO: Config assert?
function assertHighlight(assert, highlighter, expectedTypes) {
    assertLength(assert, highlighter.blocks, expectedTypes.length)
    assertTypes(assert, highlighter.blocks, expectedTypes)
}

function assertTypes(assert, blocks, expectedTypes) {
    assert.deepEqual(blocks.map((it) => it.type), expectedTypes)
}

//TODO: Mover a un lugar más general
function assertLength(assert, list, count) {
    assert.deepEqual(list.length, count)
}