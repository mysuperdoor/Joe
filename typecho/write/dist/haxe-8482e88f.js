function kw(e){return{type:e,style:"keyword"}}var content,A=kw("keyword a"),B=kw("keyword b"),C=kw("keyword c"),operator=kw("operator"),atom={type:"atom",style:"atom"},attribute={type:"attribute",style:"attribute"},type=kw("typedef"),keywords={if:A,while:A,else:B,do:B,try:B,return:C,break:C,continue:C,new:C,throw:C,var:kw("var"),inline:attribute,static:attribute,using:kw("import"),public:attribute,private:attribute,cast:kw("cast"),import:kw("import"),macro:kw("macro"),function:kw("function"),catch:kw("catch"),untyped:kw("untyped"),callback:kw("cb"),for:kw("for"),switch:kw("switch"),case:kw("case"),default:kw("default"),in:operator,never:kw("property_access"),trace:kw("trace"),class:type,abstract:type,enum:type,interface:type,typedef:type,extends:type,implements:type,dynamic:type,true:atom,false:atom,null:atom},isOperatorChar=/[+\-*&%=<>!?|]/;function chain(e,t,n){return(t.tokenize=n)(e,t)}function toUnescaped(e,t){for(var n,r=!1;null!=(n=e.next());){if(n==t&&!r)return!0;r=!r&&"\\"==n}}function ret(e,t,n){return type=e,content=n,t}function haxeTokenBase(e,t){var n=e.next();if('"'==n||"'"==n)return chain(e,t,haxeTokenString(n));if(/[\[\]{}\(\),;\:\.]/.test(n))return ret(n);if("0"==n&&e.eat(/x/i))return e.eatWhile(/[\da-f]/i),ret("number","number");if(/\d/.test(n)||"-"==n&&e.eat(/\d/))return e.match(/^\d*(?:\.\d*(?!\.))?(?:[eE][+\-]?\d+)?/),ret("number","number");if(t.reAllowed&&"~"==n&&e.eat(/\//))return toUnescaped(e,"/"),e.eatWhile(/[gimsu]/),ret("regexp","string.special");if("/"==n)return e.eat("*")?chain(e,t,haxeTokenComment):e.eat("/")?(e.skipToEnd(),ret("comment","comment")):(e.eatWhile(isOperatorChar),ret("operator",null,e.current()));if("#"==n)return e.skipToEnd(),ret("conditional","meta");if("@"==n)return e.eat(/:/),e.eatWhile(/[\w_]/),ret("metadata","meta");if(isOperatorChar.test(n))return e.eatWhile(isOperatorChar),ret("operator",null,e.current());if(/[A-Z]/.test(n))return e.eatWhile(/[\w_<>]/),ret("type","type",r=e.current());e.eatWhile(/[\w_]/);var r=e.current(),e=keywords.propertyIsEnumerable(r)&&keywords[r];return e&&t.kwAllowed?ret(e.type,e.style,r):ret("variable","variable",r)}function haxeTokenString(n){return function(e,t){return toUnescaped(e,n)&&(t.tokenize=haxeTokenBase),ret("string","string")}}function haxeTokenComment(e,t){for(var n,r=!1;n=e.next();){if("/"==n&&r){t.tokenize=haxeTokenBase;break}r="*"==n}return ret("comment","comment")}var atomicTypes={atom:!0,number:!0,variable:!0,string:!0,regexp:!0};function HaxeLexical(e,t,n,r,o,a){this.indented=e,this.column=t,this.type=n,this.prev=o,this.info=a,null!=r&&(this.align=r)}function inScope(e,t){for(var n=e.localVars;n;n=n.next)if(n.name==t)return!0}function parseHaxe(e,t,n,r,o){var a=e.cc;for(cx.state=e,cx.stream=o,cx.marked=null,cx.cc=a,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;)if((a.length?a.pop():statement)(n,r)){for(;a.length&&a[a.length-1].lex;)a.pop()();return cx.marked?cx.marked:"variable"==n&&inScope(e,r)?"variableName.local":"variable"==n&&imported(e,r)?"variableName.special":t}}function imported(e,t){if(/[a-z]/.test(t.charAt(0)))return!1;for(var n=e.importedtypes.length,r=0;r<n;r++)if(e.importedtypes[r]==t)return!0}function registerimport(e){for(var t=cx.state,n=t.importedtypes;n;n=n.next)if(n.name==e)return;t.importedtypes={name:e,next:t.importedtypes}}var cx={state:null,column:null,marked:null,cc:null};function pass(){for(var e=arguments.length-1;0<=e;e--)cx.cc.push(arguments[e])}function cont(){return pass.apply(null,arguments),!0}function inList(e,t){for(var n=t;n;n=n.next)if(n.name==e)return!0;return!1}function register(e){var t=cx.state;t.context?(cx.marked="def",inList(e,t.localVars)||(t.localVars={name:e,next:t.localVars})):t.globalVars&&(inList(e,t.globalVars)||(t.globalVars={name:e,next:t.globalVars}))}var defaultVars={name:"this",next:null};function pushcontext(){cx.state.context||(cx.state.localVars=defaultVars),cx.state.context={prev:cx.state.context,vars:cx.state.localVars}}function popcontext(){cx.state.localVars=cx.state.context.vars,cx.state.context=cx.state.context.prev}function pushlex(t,n){function e(){var e=cx.state;e.lexical=new HaxeLexical(e.indented,cx.stream.column(),t,null,e.lexical,n)}return e.lex=!0,e}function poplex(){var e=cx.state;e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function expect(n){return function e(t){return t==n?cont():";"==n?pass():cont(e)}}function statement(e){return"@"==e?cont(metadef):"var"==e?cont(pushlex("vardef"),vardef1,expect(";"),poplex):"keyword a"==e?cont(pushlex("form"),expression,statement,poplex):"keyword b"==e?cont(pushlex("form"),statement,poplex):"{"==e?cont(pushlex("}"),pushcontext,block,poplex,popcontext):";"==e?cont():"attribute"==e?cont(maybeattribute):"function"==e?cont(functiondef):"for"==e?cont(pushlex("form"),expect("("),pushlex(")"),forspec1,expect(")"),poplex,statement,poplex):"variable"==e?cont(pushlex("stat"),maybelabel):"switch"==e?cont(pushlex("form"),expression,pushlex("}","switch"),expect("{"),block,poplex,poplex):"case"==e?cont(expression,expect(":")):"default"==e?cont(expect(":")):"catch"==e?cont(pushlex("form"),pushcontext,expect("("),funarg,expect(")"),statement,poplex,popcontext):"import"==e?cont(importdef,expect(";")):"typedef"==e?cont(typedef):pass(pushlex("stat"),expression,expect(";"),poplex)}function expression(e){return atomicTypes.hasOwnProperty(e)||"type"==e?cont(maybeoperator):"function"==e?cont(functiondef):"keyword c"==e?cont(maybeexpression):"("==e?cont(pushlex(")"),maybeexpression,expect(")"),poplex,maybeoperator):"operator"==e?cont(expression):"["==e?cont(pushlex("]"),commasep(maybeexpression,"]"),poplex,maybeoperator):"{"==e?cont(pushlex("}"),commasep(objprop,"}"),poplex,maybeoperator):cont()}function maybeexpression(e){return e.match(/[;\}\)\],]/)?pass():pass(expression)}function maybeoperator(e,t){return"operator"==e&&/\+\+|--/.test(t)?cont(maybeoperator):"operator"==e||":"==e?cont(expression):";"!=e?"("==e?cont(pushlex(")"),commasep(expression,")"),poplex,maybeoperator):"."==e?cont(property,maybeoperator):"["==e?cont(pushlex("]"),expression,expect("]"),poplex,maybeoperator):void 0:void 0}function maybeattribute(e){return"attribute"==e?cont(maybeattribute):"function"==e?cont(functiondef):"var"==e?cont(vardef1):void 0}function metadef(e){return":"==e||"variable"==e?cont(metadef):"("==e?cont(pushlex(")"),commasep(metaargs,")"),poplex,statement):void 0}function metaargs(e){if("variable"==e)return cont()}function importdef(e,t){return"variable"==e&&/[A-Z]/.test(t.charAt(0))?(registerimport(t),cont()):"variable"==e||"property"==e||"."==e||"*"==t?cont(importdef):void 0}function typedef(e,t){return"variable"==e&&/[A-Z]/.test(t.charAt(0))?(registerimport(t),cont()):"type"==e&&/[A-Z]/.test(t.charAt(0))?cont():void 0}function maybelabel(e){return":"==e?cont(poplex,statement):pass(maybeoperator,expect(";"),poplex)}function property(e){if("variable"==e)return cx.marked="property",cont()}function objprop(e){if("variable"==e&&(cx.marked="property"),atomicTypes.hasOwnProperty(e))return cont(expect(":"),expression)}function commasep(t,n){function r(e){return","==e?cont(t,r):e==n?cont():cont(expect(n))}return function(e){return e==n?cont():pass(t,r)}}function block(e){return"}"==e?cont():pass(statement,block)}function vardef1(e,t){return"variable"==e?(register(t),cont(typeuse,vardef2)):cont()}function vardef2(e,t){return"="==t?cont(expression,vardef2):","==e?cont(vardef1):void 0}function forspec1(e,t){return"variable"==e?(register(t),cont(forin,expression)):pass()}function forin(e,t){if("in"==t)return cont()}function functiondef(e,t){return"variable"==e||"type"==e?(register(t),cont(functiondef)):"new"==t?cont(functiondef):"("==e?cont(pushlex(")"),pushcontext,commasep(funarg,")"),poplex,typeuse,statement,popcontext):void 0}function typeuse(e){if(":"==e)return cont(typestring)}function typestring(e){return"type"==e||"variable"==e?cont():"{"==e?cont(pushlex("}"),commasep(typeprop,"}"),poplex):void 0}function typeprop(e){if("variable"==e)return cont(typeuse)}function funarg(e,t){if("variable"==e)return register(t),cont(typeuse)}popcontext.lex=!0,poplex.lex=!0;const haxe={startState:function(e){return{tokenize:haxeTokenBase,reAllowed:!0,kwAllowed:!0,cc:[],lexical:new HaxeLexical(-e,0,"block",!1),importedtypes:["Int","Float","String","Void","Std","Bool","Dynamic","Array"],context:null,indented:0}},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation()),e.eatSpace())return null;var n=t.tokenize(e,t);return"comment"==type?n:(t.reAllowed=!("operator"!=type&&"keyword c"!=type&&!type.match(/^[\[{}\(,;:]$/)),t.kwAllowed="."!=type,parseHaxe(t,n,type,content,e))},indent:function(e,t,n){if(e.tokenize!=haxeTokenBase)return 0;var r=t&&t.charAt(0),o=e.lexical,a=(o="stat"==o.type&&"}"==r?o.prev:o).type,e=r==a;return"vardef"==a?o.indented+4:"form"==a&&"{"==r?o.indented:"stat"==a||"form"==a?o.indented+n.unit:"switch"!=o.info||e?o.align?o.column+(e?0:1):o.indented+(e?0:n.unit):o.indented+(/^(?:case|default)\b/.test(t)?n.unit:2*n.unit)},languageData:{indentOnInput:/^\s*[{}]$/,commentTokens:{line:"//",block:{open:"/*",close:"*/"}}}},hxml={startState:function(){return{define:!1,inString:!1}},token:function(e,t){var n=e.peek(),r=e.sol();if("#"==n)return e.skipToEnd(),"comment";if(r&&"-"==n){r="variable-2";return e.eat(/-/),"-"==e.peek()&&(e.eat(/-/),r="keyword a"),"D"==e.peek()&&(e.eat(/[D]/),r="keyword c",t.define=!0),e.eatWhile(/[A-Z]/i),r}n=e.peek();return 0==t.inString&&"'"==n&&(t.inString=!0,e.next()),1==t.inString?(e.skipTo("'")||e.skipToEnd(),"'"==e.peek()&&(e.next(),t.inString=!1),"string"):(e.next(),null)},languageData:{commentTokens:{line:"#"}}};export{haxe,hxml};
