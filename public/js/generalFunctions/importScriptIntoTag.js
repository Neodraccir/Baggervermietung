var importScriptIntoTag = (func, {alt_sc_name, arg})=>{return `import {${func}} from '/sc/build/${alt_sc_name?alt_sc_name:func}.js';\n${func}(${arg});`};

export{importScriptIntoTag}
