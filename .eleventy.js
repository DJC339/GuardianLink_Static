module.exports = function (eleventyConfig) {
  // Copy assets to the output as-is
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};

