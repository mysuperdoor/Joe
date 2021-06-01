function forEach(e,t){for(var n=0;n<e.length;n++)t(e[n],n)}function some(e,t){for(var n=0;n<e.length;n++)if(t(e[n],n))return!0;return!1}var words={unnamedDefinition:["interface"],namedDefinition:["module","library","macro","C-struct","C-union","C-function","C-callable-wrapper"],typeParameterizedDefinition:["class","C-subtype","C-mapped-subtype"],otherParameterizedDefinition:["method","function","C-variable","C-address"],constantSimpleDefinition:["constant"],variableSimpleDefinition:["variable"],otherSimpleDefinition:["generic","domain","C-pointer-type","table"],statement:["if","block","begin","method","case","for","select","when","unless","until","while","iterate","profiling","dynamic-bind"],separator:["finally","exception","cleanup","else","elseif","afterwards"],other:["above","below","by","from","handler","in","instance","let","local","otherwise","slot","subclass","then","to","keyed-by","virtual"],signalingCalls:["signal","error","cerror","break","check-type","abort"]};words.otherDefinition=words.unnamedDefinition.concat(words.namedDefinition).concat(words.otherParameterizedDefinition),words.definition=words.typeParameterizedDefinition.concat(words.otherDefinition),words.parameterizedDefinition=words.typeParameterizedDefinition.concat(words.otherParameterizedDefinition),words.simpleDefinition=words.constantSimpleDefinition.concat(words.variableSimpleDefinition).concat(words.otherSimpleDefinition),words.keyword=words.statement.concat(words.separator).concat(words.other);var patternName,symbolPattern="[-_a-zA-Z?!*@<>$%]+",symbol=new RegExp("^"+symbolPattern),patterns={symbolKeyword:symbolPattern+":",symbolClass:"<"+symbolPattern+">",symbolGlobal:"\\*"+symbolPattern+"\\*",symbolConstant:"\\$"+symbolPattern},patternStyles={symbolKeyword:"atom",symbolClass:"tag",symbolGlobal:"variableName.standard",symbolConstant:"variableName.constant"};for(patternName in patterns)patterns.hasOwnProperty(patternName)&&(patterns[patternName]=new RegExp("^"+patterns[patternName]));patterns.keyword=[/^with(?:out)?-[-_a-zA-Z?!*@<>$%]+/];var styles={keyword:"keyword",definition:"def",simpleDefinition:"def",signalingCalls:"builtin"},wordLookup={},styleLookup={};function chain(e,t,n){return(t.tokenize=n)(e,t)}function tokenBase(t,e){var n,r=t.peek();if("'"==r||'"'==r)return t.next(),chain(t,e,tokenString(r,"string"));if("/"==r){if(t.next(),t.eat("*"))return chain(t,e,tokenComment);if(t.eat("/"))return t.skipToEnd(),"comment";t.backUp(1)}else if(/[+\-\d\.]/.test(r)){if(t.match(/^[+-]?[0-9]*\.[0-9]*([esdx][+-]?[0-9]+)?/i)||t.match(/^[+-]?[0-9]+([esdx][+-]?[0-9]+)/i)||t.match(/^[+-]?\d+/))return"number"}else{if("#"==r)return t.next(),'"'==(r=t.peek())?(t.next(),chain(t,e,tokenString('"',"string"))):"b"==r?(t.next(),t.eatWhile(/[01]/),"number"):"x"==r?(t.next(),t.eatWhile(/[\da-f]/i),"number"):"o"==r?(t.next(),t.eatWhile(/[0-7]/),"number"):"#"==r?(t.next(),"punctuation"):"["==r||"("==r?(t.next(),"bracket"):t.match(/f|t|all-keys|include|key|next|rest/i)?"atom":(t.eatWhile(/[-a-zA-Z]/),"error");if("~"==r)return t.next(),"="==(r=t.peek())?(t.next(),"="==(r=t.peek())&&t.next(),"operator"):"operator";if(":"==r){if(t.next(),"="==(r=t.peek()))return t.next(),"operator";if(":"==r)return t.next(),"punctuation"}else{if(-1!="[](){}".indexOf(r))return t.next(),"bracket";if(-1!=".,".indexOf(r))return t.next(),"punctuation";if(t.match("end"))return"keyword"}}for(n in patterns)if(patterns.hasOwnProperty(n)){var o=patterns[n];if(o instanceof Array&&some(o,function(e){return t.match(e)})||t.match(o))return patternStyles[n]}return/[+\-*\/^=<>&|]/.test(r)?(t.next(),"operator"):t.match("define")?"def":(t.eatWhile(/[\w\-]/),wordLookup.hasOwnProperty(t.current())?styleLookup[t.current()]:t.current().match(symbol)?"variable":(t.next(),"variableName.standard"))}function tokenComment(e,t){for(var n,r=!1,o=!1,i=0;n=e.next();){if("/"==n&&r){if(!(0<i)){t.tokenize=tokenBase;break}i--}else"*"==n&&o&&i++;r="*"==n,o="/"==n}return"comment"}function tokenString(i,a){return function(e,t){for(var n,r=!1,o=!1;null!=(n=e.next());){if(n==i&&!r){o=!0;break}r=!r&&"\\"==n}return!o&&r||(t.tokenize=tokenBase),a}}forEach(["keyword","definition","simpleDefinition","signalingCalls"],function(t){forEach(words[t],function(e){wordLookup[e]=t,styleLookup[e]=styles[t]})});const dylan={startState:function(){return{tokenize:tokenBase,currentIndent:0}},token:function(e,t){return e.eatSpace()?null:t.tokenize(e,t)},languageData:{commentTokens:{block:{open:"/*",close:"*/"}}}};export{dylan};
