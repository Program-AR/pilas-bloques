import Ember from 'ember';

export default Ember.Service.extend({
  blockly: Ember.inject.service(),

  start() {
    this._generarLenguaje();
    this._definirBloqueAlIniciar();
    this._definirBloques();
    this._definirBloquesAlias();
    this._definirBloquesSensores();
    this._definirBloquesQueRepresentanValores();
  },

  /*
   * Método auxiliar para crear un bloque acción.
   *
   * El argumento 'opciones' tiene que definir estas propiedades:
   *
   *   - descripcion
   *   - icono
   *   - comportamiento
   *   - argumentos
   *
   */
  crearBloqueAccion(nombre, opciones) {
    let blockly = this.get('blockly');
    let opcionesObligatorias = ['descripcion',
                                'icono',
                                'comportamiento',
                                'argumentos'];

    this._validar_opciones_obligatorias(nombre, opciones, opcionesObligatorias);
    opciones.color = '#4a6cd4';
    let bloque = blockly.createCustomBlockWithHelper(nombre, opciones);
    return bloque;
  },

  /*
   * Método auxiliar para crear un bloque nuevo a partir de otro original.
   *
   * Este método sirve para crear bloques como 'Si', 'Repetir' etc... ya que
   * esos bloques en realidad se generan a partir de los bloques estándar
   * como 'controls_if'.
   */
  crearBloqueAlias(nombre, nombreDelBloqueOriginal) {
    let blockly = this.get('blockly');
    blockly.createAlias(nombre, nombreDelBloqueOriginal);
  },

  /*
   * Método auxiliar para crear un bloque que sirva como sensor.
   *
   * El argumento 'opciones' tiene que definir estas propiedades:
   *
   *   - descripcion
   *   - icono
   *   - funcionSensor
   *
   */
  crearBloqueSensor(nombre, opciones) {
    let blockly = this.get('blockly');
    let opcionesObligatorias = ['descripcion',
                                'icono',
                                'funcionSensor'];

    this._validar_opciones_obligatorias(nombre, opciones, opcionesObligatorias);

    return blockly.createCustomBlock(nombre, {
      message0: `%1 ¿${opciones.descripcion}?`,
      previousStatement: true,
      nextStatement: true,
      args0: [
        {
          type: "field_image",
          src: `iconos/${opciones.icono}`,
          width: 16,
          height: 16,
          alt: "*"
        }
      ],
      code: `receptor.${opciones.funcionSensor}`
    });
  },

  crearBloqueValor(nombre, opciones) {
    let blockly = this.get('blockly');
    let opcionesObligatorias = ['descripcion',
                                'icono',
                                'valor'];

    this._validar_opciones_obligatorias(nombre, opciones, opcionesObligatorias);

    return blockly.createBlockValue(nombre, opciones);
  },

  /*
   * Lanza una exception si un diccionario no presenta alguna clave obligatoria.
   */
  _validar_opciones_obligatorias(nombre, opciones, listaDeOpcionesObligatorias) {
    listaDeOpcionesObligatorias.forEach((opcion) => {
      if (!(opcion in opciones)) {
        throw new Error(`No se puede crear el bloque ${nombre} porque no se indicó un valor para la opción ${opcion}.`);
      }
    });
  },

  _definirBloques() {
    let blockly = this.get('blockly');

    this.crearBloqueAccion('PrenderCompu', {
      descripcion: 'Prender compu',
      icono: 'icono.computadora.png',
      comportamiento: 'PrenderCompuParaInstalar',
      argumentos: `{'etiqueta': 'CompuAnimada', 'mensajeError': 'No hay una compu aqui', 'idTransicion': 'prender', 'animacionColisionado': 'prendida', 'nombreAnimacion': 'escribir'}`,
    });

    this.crearBloqueAccion('ApretarBoton', {
      descripcion: 'Apretar botón',
      icono: 'iconos.botonRojo.png',
      comportamiento: 'DesencadenarAnimacionSiColisiona',
      argumentos: '{\'animacionColisionado\':\'prendida\',\'nombreAnimacion\':\'apretar\',\'etiqueta\':\'BotonAnimado\',\'mensajeError\': \'No hay un botón aquí\',\'idTransicion\':\'apretarBoton\'}',
    });

    this.crearBloqueAccion('EncenderLuz', {
      descripcion: 'Prender la luz',
      icono: 'icono.Lamparita.png',
      comportamiento: 'EncenderPorEtiqueta',
      argumentos: "{'etiqueta':'Luz'}"
    });

    this.crearBloqueAccion('ComerBanana', {
      descripcion: 'Comer banana',
      icono: 'iconos.banana.png',
      comportamiento: 'RecogerPorEtiqueta',
      argumentos: '{\'etiqueta\' : \'BananaAnimada\',  nombreAnimacion: "comerBanana"}',
    });

    this.crearBloqueAccion('ComerManzana', {
      descripcion: 'Comer manzana',
      icono: 'iconos.manzana.png',
      comportamiento: 'RecogerPorEtiqueta',
      argumentos: '{\'etiqueta\' : \'ManzanaAnimada\',  nombreAnimacion: "comerManzana"}',
    });

    this.crearBloqueAccion('ComerQueso', {
      descripcion: 'Comer queso',
      icono: 'queso.png',
      comportamiento: 'RecogerPorEtiqueta',
      argumentos: '{\'etiqueta\' : \'QuesoAnimado\'}',
    });

    this.crearBloqueAccion('ComerNaranja', {
      descripcion: 'Comer naranja',
      icono: 'naranja.png',
      comportamiento: 'RecogerPorEtiqueta',
      argumentos: '{\'etiqueta\' : \'NaranjaAnimada\',  nombreAnimacion: "comerNaranja"}',
    });

    this.crearBloqueAccion('MoverACasillaDerecha', {
      descripcion: 'Mover a la derecha',
      icono: 'icono.derecha.png',
      comportamiento: 'MoverACasillaDerecha',
      argumentos: '{}',
    });

  },

  _definirBloquesAlias() {
    this.crearBloqueAlias('Si', 'controls_if');
    this.crearBloqueAlias('Numero', 'math_number');
    this.crearBloqueAlias('OpAritmetica', 'math_arithmetic');
    this.crearBloqueAlias('OpComparacion', 'logic_compare');
    this.crearBloqueAlias('Booleano', 'logic_boolean');


  },

  _definirBloquesSensores() {

    this.crearBloqueSensor('TocandoBanana', {
      id: 'Tocandobanana',
      descripcion: 'Hay banana acá',
      icono: 'icono.banana.png',
      funcionSensor: 'tocando("BananaAnimada")',
    });

  },

  _definirBloquesQueRepresentanValores() {

    this.crearBloqueValor("ParaLaDerecha", {
      descripcion: 'la derecha',
      icono: 'icono.derecha.png',
      valor: 'DirCasillaDerecha',
    });

    this.crearBloqueValor('ParaLaIzquierda', {
      descripcion: 'la izquierda',
      icono: 'icono.izquierda.png',
      valor: 'DirCasillaIzquierda',
    });

    this.crearBloqueValor('ParaArriba', {
      descripcion: 'arriba',
      icono: 'icono.arriba.png',
      valor: 'DirCasillaArriba',
    });

    this.crearBloqueValor('ParaAbajo', {
      descripcion: 'abajo',
      icono: 'icono.abajo.png',
      valor: 'DirCasillaAbajo',
    });

  },

  _definirBloqueAlIniciar() {

    Blockly.Blocks['al_empezar_a_ejecutar'] = {
      init: function() {
        this.setColour('#00a65a');

        this.appendDummyInput().appendField('Al empezar a ejecutar');

        this.appendStatementInput('program');
        this.setDeletable(false);

        this.setEditable(false);
        this.setMovable(false);
      }
    };

  },

  _generarLenguaje() {
    Blockly.MyLanguage = Blockly.JavaScript;
    Blockly.MyLanguage.addReservedWords('main', 'hacer', 'out_hacer');

    Blockly.MyLanguage['al_empezar_a_ejecutar'] = function(block) {
      let programa = Blockly.JavaScript.statementToCode(block, 'program');
      let codigo = `${programa}`;
      return codigo;
    };

    Blockly.MyLanguage.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    Blockly.MyLanguage.addReservedWords('highlightBlock');
  }
});
