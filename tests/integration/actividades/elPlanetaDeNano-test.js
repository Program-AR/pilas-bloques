import {moduloActividad, actividadTest} from '../../helpers/actividadTest';
import actividad from 'pilas-engine-bloques/actividades/actividadElPlanetaDeNano';

moduloActividad(actividad);

actividadTest(actividad, {
	solucion: '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="0" y="0"><statement name="program"><block type="procedures_callnoreturn" id="136" inline="true"><mutation name="comer"><arg name="cant"></arg></mutation><value name="ARG0"><block type="math_number" id="168"><field name="NUM">4</field></block></value><next><block type="MoverACasillaArriba" id="146"><next><block type="procedures_callnoreturn" id="185" inline="true"><mutation name="comer"><arg name="cant"></arg></mutation><value name="ARG0"><block type="math_number" id="175"><field name="NUM">3</field></block></value><next><block type="MoverACasillaArriba" id="210"><next><block type="procedures_callnoreturn" id="188" inline="true"><mutation name="comer"><arg name="cant"></arg></mutation><value name="ARG0"><block type="math_number" id="181"><field name="NUM">2</field></block></value><next><block type="MoverACasillaArriba" id="220"><next><block type="procedures_callnoreturn" id="191" inline="true"><mutation name="comer"><arg name="cant"></arg></mutation><value name="ARG0"><block type="math_number" id="198"><field name="NUM">1</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" id="72" x="282" y="33"><mutation><arg name="cant"></arg></mutation><field name="NAME">comer</field><statement name="STACK"><block type="repetir" id="87" inline="true"><value name="count"><block type="param_get" id="79"><field name="VAR">cant</field></block></value><statement name="block"><block type="MoverACasillaDerecha" id="107"><next><block type="ComerBanana" id="112"></block></next></block></statement><next><block type="Volveralbordeizquierdo" id="117"></block></next></block></statement></block></xml>',
});