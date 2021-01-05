module.exports = {
  format: {
    // Adding a custom format to show how to get an alias's name.
    customFormat: function (dictionary) {
      return dictionary.allProperties
        .map((token) => {
          let value = JSON.stringify(token.value);
          // the `dictionary` object now has `usesReference()` and
          // `getReference()` methods. `usesReference()` will return true if
          // the value has a reference in it. `getReference()` will return
          // the reference to the whole token so that you can access its
          // name or any other attributes.
          if (dictionary.usesReference(token.original.value)) {
            const reference = dictionary.getReference(token.original.value);
            value = reference.name;
          }
          return `export const ${token.name} = ${value};`;
        })
        .join(`\n`);
    },
  },

  source: ['tokens/**/*.json'],
  platforms: {
    json: {
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
      ],
    },
    // js: {
    //   buildPath: 'dist/',
    //   transformGroup: 'js',
    //   files: [{
    //     destination: 'tokens.js',
    //     format: 'customFormat'
    //   }]
    // },
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          useVariables: true, // new setting, if true will use variable references
          format: 'css/variables',
        },
        // {
        //   destination: 'tokens.scss',
        //   useVariables: true, // new setting, if true will use variable references
        //   format: 'scss/variables',
        // },
      ],
    },
  },
};
