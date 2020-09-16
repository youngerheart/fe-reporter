const presets = [
  [
    '@babel/preset-env',
    {
      loose: true,
      modules: 'commonjs',
      targets: {
        browsers: ["ie >= 9", "not dead"]
      }
    }
  ],
  '@babel/preset-typescript'
 ]
 const plugins = [
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: false,
      helpers: true,
      regenerator: false,
      useESModules: false
    }
  ],
  '@babel/plugin-transform-object-assign'
 ]
 
 module.exports = {
   presets,
   plugins
 }
