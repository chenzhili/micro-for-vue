module.exports = function(api) {
  api.cache(true);
  return { 
    presets: [
      '@vue/cli-plugin-babel/preset'
    ],
    babelrcRoots: [
        ".",
        "packages/*" // 将子程序包都作为工作目录
     ] 
  };
};