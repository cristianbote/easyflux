module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                files: {
                    'dist/<%= pkg.name %>.js': ['src/includes/require.shim.js', 'src/**/*.js'],
                    'dist/<%= pkg.name %>-<%= pkg.version %>.js': ['src/includes/require.shim.js', 'src/**/*.js']
                },
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
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['dist/<%= pkg.name %>.js'],
                    'dist/<%= pkg.name %>.min.js': ['dist/<%= pkg.name %>.js']
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
};