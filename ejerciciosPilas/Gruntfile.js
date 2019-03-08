module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    qunit: {
      files: ['test/index.html']
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [
            'dependencias/helpers.js',
            'dependencias/listHelper.js',
            'node_modules/nearley/lib/nearley.js',
            'compilados/gramaticaAleatoria.js',
            'compilados/ejerciciosPilas.js',
        ],
        dest: 'compilados/ejerciciosPilas.js',
      },
    },

    typescript: {
      base: {
        src: ['src/**/*.ts'],
        dest: 'compilados/ejerciciosPilas.js',
        options: {
          module: 'commonjs',
          target: 'es5',
          rootDir: 'src',
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          sourceMap: false,
          fullSourceMapPath: false,
          declaration: false,
          comments: true,
          }
        }
      },
    watch: {
      scripts: {
        files: ['src/**'],
        tasks: ['typescript', 'concat'],
      }
    },
    open: {
        dev: {
            path: 'src/visorEjercicios.html'
        }
    },
    run: {
      compilarGramaticaAleatoria: {
        cmd: 'npm',
        args: [
          'run',
          'compilarGramaticaAleatoria'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-run');

  grunt.registerTask('default', ['typescript', 'run:compilarGramaticaAleatoria', 'concat']);

  grunt.registerTask('test', 'qunit');
};
