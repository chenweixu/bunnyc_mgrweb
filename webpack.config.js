const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var webpack = require('webpack');

let devtool_model;
let build_mode;
if (process.env.NODE_ENV === 'production') {
    build_mode = 'production';
    devtool_model = 'null';
} else if (process.env.NODE_ENV === 'development') {
    build_mode = 'development';
    devtool_model = 'source-map';
}

// console.log(devtool_model)
// console.log(build_mode)

module.exports = {
    devtool: devtool_model,
    mode: build_mode,
    entry:  {
        // vendor: './src/vendor',
        index: __dirname + "/src/main.js"
    },


    output: {
        path: __dirname + "/dist/",//打包后的文件存放的地方
        // filename: "[name].js"//打包后输出文件的文件名
        filename: "[hash].js"//打包后输出文件的文件名
        // filename: "bundle.js"//打包后输出文件的文件名
    },

  devServer: {
    contentBase: "./dist",          //本地服务器所加载的页面所在的目录
    historyApiFallback: true,       //不跳转
    inline: true                    //实时刷新
  },

    resolve: {
        // 解析模块请求的选项
        // alias: {
        //     'vue': 'vue/dist/vue.esm.js'
        // }
    },

    // 模块加载器
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                    // 解析器的执行顺序是从下往上(先css-loader再style-loader)
                ],
            },

            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },

            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },


            // {
            //     test: /\.js/,
            //     use: [{
            //         loader: 'babel-loader',
            //         options: {//如果有这个设置则不用再添加.babelrc文件进行配置
            //             "babelrc": false,// 不采用.babelrc的配置
            //             "plugins": [
            //                 "dynamic-import-webpack"
            //             ]
            //         }
            //     }],
            //     exclude: /node_modules/,
            // },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            },


                // 将小文件通过 base64 编码嵌入在页面中，减少请求次数
          // {
          //   test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          //   use: [{
          //     loader: 'url-loader',
          //     options: {
          //       limit: 10000,
          //       name: '[name]-[hash].[ext]'
          //     }
          //   }]
          // },

            {
                test: /\.(png|jpg|gif|svg|ttf|woff)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },

        ]
    },


    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            // template: __dirname + "/src/static/html/index.html",//new 一个这个插件的实例，并传入相关的参数
            // template: __dirname + "/test/html/index.html"//new 一个这个插件的实例，并传入相关的参数
            // template: __dirname + "/test1/index.html",
            // favicon: __dirname + '/src/static/favicon.ico'
            // favicon: './test1/assets/favicon.ico',


            favicon: __dirname + '/src/static/favicon.ico',
            template: __dirname + "/src/static/html/index.html",//new 一个这个插件的实例，并传入相关的参数

            // minify: {
            //     removeComments: true,       // remove 注释
            //     collapseWhitespace: true    // remove 空格
            // }
        }),

        new webpack.BannerPlugin('chenwx test'),
        new VueLoaderPlugin()
    ],


    // devtool: '#eval-source-map'

}
