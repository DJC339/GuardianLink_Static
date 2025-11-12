const path = require("path");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
  // Copy assets to the output as-is
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Internationalized date filter using Intl.DateTimeFormat
  // Usage examples (Nunjucks):
  //   {{ date | date() }}                         -> system locale, medium date
  //   {{ date | date('auto','long') }}           -> system locale, long date
  //   {{ date | date('en-GB','medium') }}        -> en-GB locale, medium date
  //   {{ date | date('fr-FR', { dateStyle: 'full' }) }}
  //   {{ date | date('en-US', { dateStyle: 'medium', timeStyle: 'short' }) }}
  // Back-compat: if first arg is 'yyyy-LL-dd' | 'yyyy-LL' | 'LL/dd/yyyy',
  // it formats using those tokens to avoid breaking existing templates.
  eleventyConfig.addFilter("date", (value, localeOrFormat = "auto", styleOrOptions) => {
    let raw = value;
    if (raw === undefined || raw === null || raw === '' || raw === 'now') {
      raw = new Date();
    }
    const date = raw instanceof Date ? raw : new Date(raw);
    if (isNaN(date)) return "";

    const pad = (n) => String(n).padStart(2, "0");
    const yyyy = date.getFullYear();
    const LL = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());

    // Backwards compatibility for old token formats
    if (typeof localeOrFormat === "string") {
      const fmt = localeOrFormat;
      if (fmt === "yyyy-LL-dd") return `${yyyy}-${LL}-${dd}`;
      if (fmt === "yyyy-LL") return `${yyyy}-${LL}`;
      if (fmt === "LL/dd/yyyy") return `${LL}/${dd}/${yyyy}`;
    }

    // Intl path
    let locale;
    if (typeof localeOrFormat === "string" && localeOrFormat && localeOrFormat !== "auto") {
      locale = localeOrFormat; // e.g., 'en-GB', 'fr-FR'
    } // else undefined -> system default

    let options = { dateStyle: "medium" };
    if (typeof styleOrOptions === "string") {
      options = { dateStyle: styleOrOptions }; // 'short'|'medium'|'long'|'full'
    } else if (styleOrOptions && typeof styleOrOptions === "object") {
      options = styleOrOptions; // any Intl.DateTimeFormat options
    }

    try {
      return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (e) {
      return date.toISOString();
    }
  });

  // Markdown image defaults: lazy-load and async decode to improve performance
  eleventyConfig.amendLibrary("md", (mdLib) => {
    const defaultImageRule = mdLib.renderer.rules.image;
    mdLib.renderer.rules.image = (tokens, idx, options, env, self) => {
      const token = tokens[idx];
      const loadingIdx = token.attrIndex("loading");
      if (loadingIdx < 0) token.attrPush(["loading", "lazy"]); else token.attrs[loadingIdx][1] = "lazy";
      const decodingIdx = token.attrIndex("decoding");
      if (decodingIdx < 0) token.attrPush(["decoding", "async"]); else token.attrs[decodingIdx][1] = "async";
      return (defaultImageRule || self.renderToken)(tokens, idx, options);
    };
  });

  // Responsive image shortcode using @11ty/eleventy-img
  // Usage in templates/Markdown (Nunjucks enabled):
  //   {% img '/assets/images/example.jpg', 'Alt text', '(min-width: 768px) 720px, 100vw' %}
  eleventyConfig.addNunjucksAsyncShortcode(
    "img",
    async function imgShortcode(
      src,
      alt = "",
      sizes = "(min-width: 768px) 720px, 100vw",
      widths = [320, 640, 960, 1280, 1920],
      formats = ["avif", "webp", "jpeg"],
      className = ""
    ) {
      const inputDir = "src"; // matches dir.input below
      const rel = String(src).replace(/^\//, "");
      const fullSrc = path.join(inputDir, rel);

      const metadata = await Image(fullSrc, {
        widths,
        formats,
        urlPath: "/assets/images/",
        outputDir: path.join("_site", "assets", "images"),
        filenameFormat: function (id, source, width, format) {
          const name = path.basename(source, path.extname(source));
          return `${name}-${width}.${format}`;
        },
      });

      const imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
        class: className,
      };
      return Image.generateHTML(metadata, imageAttributes);
    }
  );

  // Pre-generate a default social image at build time (JPEG 1200px wide)
  eleventyConfig.on("eleventy.before", async () => {
    const source = path.join("src", "assets", "images", "social-share.svg");
    try {
      await Image(source, {
        widths: [1200],
        formats: ["jpeg"],
        urlPath: "/assets/images/",
        outputDir: path.join("_site", "assets", "images"),
        filenameFormat: () => "social-share.jpg",
      });
    } catch (e) {
      // If source is missing, skip silently; user can replace later
    }
  });

  // Helpers
  eleventyConfig.addFilter("absoluteUrl", (path, base) => {
    try {
      if (!path) return base || "";
      if (!base) return path;
      return new URL(path, base).toString();
    } catch {
      return path;
    }
  });

  eleventyConfig.addFilter("w3cDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    if (isNaN(d)) return "";
    return d.toISOString();
  });

  // Transform: add rel="noopener noreferrer" to external links that open in a new tab
  eleventyConfig.addTransform("secure-external-links", function (content, outputPath) {
    if (outputPath && outputPath.endsWith(".html")) {
      return content.replace(/<a([^>]*?)target=("|')_blank\2([^>]*)>/gi, (match, pre, quote, post) => {
        // If rel already exists, ensure it contains noopener and noreferrer
        let tag = match;
        if (/\srel=("|')(.*?)\1/i.test(tag)) {
          tag = tag.replace(/\srel=("|')(.*?)\1/i, (m, q, val) => {
            const parts = new Set(val.split(/\s+/).filter(Boolean));
            parts.add("noopener");
            parts.add("noreferrer");
            return ` rel=${q}${Array.from(parts).join(" ")}${q}`;
          });
        } else {
          tag = tag.replace(/<a\b/i, '<a rel="noopener noreferrer"');
        }
        return tag;
      });
    }
    return content;
  });

  return {
    templateFormats: ["md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
