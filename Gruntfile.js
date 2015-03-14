module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
                options: {
                    banner: '/**\n' +
                        ' * Easyflux with mixins for React.js\n' +
                        ' * Another iteration over the super-complicated Facebook`s Flux flow\n' +
                        ' * Version <%= pkg.version %>\n' +
                        ' * Build at: <%= grunt.template.today("dd-mm-yyyy") %>\n */\n'
                }
            }
        },

        uglify: {

            options: {
                banner: '<%= concat.dist.options.banner %>'
            },

            dist: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        clean: {
            src: ['dist/']
        },

        watch: {
            files: ['src/**/*', 'Gruntfile.js'],
            tasks: ['build']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask('build', ['clean', 'concat:dist', 'uglify']);
    grunt.registerTask('watch', ['build']);
};