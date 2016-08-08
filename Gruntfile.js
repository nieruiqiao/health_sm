//包装函数
module.exports = function(grunt){
	//任务配置，所有插件的配置信息
	grunt.initConfig({
		//获取package.json的信息
		pkg : grunt.file.readJSON('package.json'),
		uglify : {
			options : {
				stripBanners : true,
				banner : '/* !<%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			buildminjs : {//任务：按原文件结构压缩js文件夹内所有JS文件为min.js
                files : [{
                    expand:true,
                    cwd : 'js',//js目录下
                    src : ['**/*.js','!**/*.min.js'],//所有js文件
                    dest : 'build/js',//输出到此目录下
                    ext : '.min.js'  //文件扩展名
                }]
            }
		},
		concat : {
            //dist: {
				//src : ['build/js/ByteBufferAB.min.js','build/js/Long.min.js','build/js/ProtoBuf.min.js','build/js/android-ws.min.js','build/js/mqttws31.min.js'],
				//dest : 'build/js/android-wsMqttws31.min.js'
		    //}
		},
		jshint : {
			build : ['Gruntfile.js','js/*.js'],
			options : {
				jshintrc : '.jshintrc'
			}
		},
		cssmin : {
			target : {
			    files : [{
			      expand : true,
			      cwd : './css',
			      src : ['*.css', '!*.min.css'],
			      dest : 'build/css',
			      ext : '.min.css'
			    }]
			}
		},
		clean : {
			js : ["build/js/*.js", "!build/js/*.min.js"]
		},
		imagemin : {                          // Task 
		    static : {                          // Target 
		    	options : {                       // Target options 
			        optimizationLevel : 3
		    	},
		    	files : [{
		    		expand:true,
                    cwd : 'images',//js目录下
		    		src : '**/*.png',
		    		dest : 'build/images'
		    	}]
		    }
		},
		copy : {
			main : {
			   files : [
			      // includes files within path and its sub-directories 
			      {expand: true, src: ['pages/*'], dest: 'build'},
			      // flattens results to a single level 
			      {expand: true, flatten: true, src: ['js/*.min.js'], dest: 'build/js', filter: 'isFile'},
			      {expand: true, flatten: true, src: ['css/*.min.css'], dest: 'build/css', filter: 'isFile'}
			   ],
			},
		},
		compress: {
			 main: {
			    options: {
			      archive: 'package/<%=grunt.template.today("yyyy-mm-dd") %>_grunt_proj.zip'
			    },
			    files: [
			      {expand: true, cwd: 'build/', src: ['**']} // includes files in path 
//			      {expand: true, cwd: 'path/', src: ['**'], dest: 'internal_folder3/'}, // makes all src relative to cwd 
//			      {flatten: true, src: ['path/**'], dest: 'internal_folder4/', filter: 'isFile'} // flattens results to a single level 
			    ]
			 }
		},
		watch : {
			build : {
				files : ['js/*.js'],
				tasks : ['uglify'],
				options : {spawn : false}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
//	grunt.loadNpmTasks('grunt-contrib-jshint'); //太难通过
//	grunt.loadNpmTasks('grunt-contrib-watch'); 
	grunt.loadNpmTasks('grunt-contrib-concat'); 
	grunt.loadNpmTasks('grunt-contrib-cssmin'); 
	grunt.loadNpmTasks('grunt-contrib-clean'); 
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	//告诉grunt当我们在终端中输入grunt时需要做什么(注意先后顺序)
	grunt.registerTask('default',['uglify','concat','cssmin','clean','imagemin','copy','compress']);
}