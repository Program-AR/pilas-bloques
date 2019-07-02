import { moduloActividad, actividadTest } from '../../helpers/actividadTest';

const nombre = "SalvandoLaNavidad";

moduloActividad(nombre, () => {

   actividadTest(nombre, {
      solucion: `<?xml version="1.0" encoding="UTF-8"?>
<xml xmlns="http://www.w3.org/1999/xhtml">
   <block type="al_empezar_a_ejecutar" id="1" deletable="false" movable="false" editable="false" x="0" y="0">
      <statement name="program">
         <block type="procedures_callnoreturn" id="123" inline="true">
            <mutation name="dejar regalos en fila">
               <arg name="cant. casilleros" />
            </mutation>
            <value name="ARG0">
               <block type="math_number" id="125">
                  <field name="NUM">4</field>
               </block>
            </value>
            <next>
               <block type="SiguienteFilaTotal" id="79">
                  <next>
                     <block type="procedures_callnoreturn" id="82" inline="true">
                        <mutation name="dejar regalos en fila">
                           <arg name="cant. casilleros" />
                        </mutation>
                        <value name="ARG0">
                           <block type="math_number" id="84">
                              <field name="NUM">5</field>
                           </block>
                        </value>
                        <next>
                           <block type="SiguienteFilaTotal" id="88">
                              <next>
                                 <block type="procedures_callnoreturn" id="99" inline="true">
                                    <mutation name="dejar regalos en fila">
                                       <arg name="cant. casilleros" />
                                    </mutation>
                                    <value name="ARG0">
                                       <block type="math_number" id="115">
                                          <field name="NUM">7</field>
                                       </block>
                                    </value>
                                    <next>
                                       <block type="SiguienteFilaTotal" id="96">
                                          <next>
                                             <block type="procedures_callnoreturn" id="102" inline="true">
                                                <mutation name="dejar regalos en fila">
                                                   <arg name="cant. casilleros" />
                                                </mutation>
                                                <value name="ARG0">
                                                   <block type="math_number" id="113">
                                                      <field name="NUM">3</field>
                                                   </block>
                                                </value>
                                                <next>
                                                   <block type="SiguienteFilaTotal" id="92">
                                                      <next>
                                                         <block type="procedures_callnoreturn" id="105" inline="true">
                                                            <mutation name="dejar regalos en fila">
                                                               <arg name="cant. casilleros" />
                                                            </mutation>
                                                            <value name="ARG0">
                                                               <block type="math_number" id="111">
                                                                  <field name="NUM">6</field>
                                                               </block>
                                                            </value>
                                                         </block>
                                                      </next>
                                                   </block>
                                                </next>
                                             </block>
                                          </next>
                                       </block>
                                    </next>
                                 </block>
                              </next>
                           </block>
                        </next>
                     </block>
                  </next>
               </block>
            </next>
         </block>
      </statement>
   </block>
   <block type="procedures_defnoreturn" id="38" x="1" y="342">
      <mutation>
         <arg name="cant. casilleros" />
      </mutation>
      <field name="NAME">dejar regalos en fila</field>
      <statement name="STACK">
         <block type="Repetir" id="51" inline="true">
            <value name="count">
               <block type="param_get" id="56">
                  <field name="VAR">cant. casilleros</field>
               </block>
            </value>
            <statement name="block">
               <block type="MoverACasillaDerecha" id="60" />
            </statement>
            <next>
               <block type="DejarRegalo" id="66" />
            </next>
         </block>
      </statement>
   </block>
</xml>`,
   });

});