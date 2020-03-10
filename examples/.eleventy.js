module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    dir: {
      input: './src/pages',
      output: './dist',
      layouts: '../layouts/'
    }
  };

}
