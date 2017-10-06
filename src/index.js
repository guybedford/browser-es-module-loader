import BrowserESModuleLoader from './browser-es-module-loader.js';
import { baseURI, isBrowser, global } from 'es-module-loader/core/common.js';
import { resolveIfNotPlain } from 'es-module-loader/core/resolve.js';

export default BrowserESModuleLoader;

if (!window.babel || !window.babelPluginTransformES2015ModulesSystemJS || !window.babelPluginSyntaxDynamicImport)
  throw new Error('babel-browser-build.js must be loaded first');

// <script type="module"> support
if (isBrowser) {
  // simple DOM ready
  if (document.readyState === 'complete')
    setTimeout(ready);
  else
    document.addEventListener('DOMContentLoaded', ready, false);
  
}


function ready() {
  document.removeEventListener('DOMContentLoaded', ready, false );
  global.System = global.System || {};
  // create a default loader instance in the browser
  // @see https://whatwg.github.io/loader/#system-loader-instance
  global.System.loader = new BrowserESModuleLoader();

  var anonCnt = 0;

  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (script.type == 'module' && !script.loaded) {
      script.loaded = true;
      if (script.src) {
        loader.import(script.src);
      }
      // anonymous modules supported via a custom naming scheme and registry
      else {
        var uri = './<anon' + ++anonCnt + '>';
        if (script.id !== ""){
          uri = "./" + script.id;
        }

        var anonName = resolveIfNotPlain(uri, baseURI);
        global.System.loader.anonSources[anonName] = script.innerHTML;
        global.System.loader.import(anonName);
      }
    }
  }
}