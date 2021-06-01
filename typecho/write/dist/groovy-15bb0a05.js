function words(e){for(var t={},n=e.split(" "),r=0;r<n.length;++r)t[n[r]]=!0;return t}var curPunc,keywords=words("abstract as assert boolean break byte case catch char class const continue def default do double else enum extends final finally float for goto if implements import in instanceof int interface long native new package private protected public return short static strictfp super switch synchronized threadsafe throw throws trait transient try void volatile while"),blockKeywords=words("catch class def do else enum finally for if interface switch trait try while"),standaloneKeywords=words("return break continue"),atoms=words("null true false this");function tokenBase(e,t){var n=e.next();if('"'==n||"'"==n)return startString(n,e,t);if(/[\[\]{}\(\),;\:\.]/.test(n))return curPunc=n,null;if(/\d/.test(n))return e.eatWhile(/[\w\.]/),e.eat(/eE/)&&(e.eat(/\+\-/),e.eatWhile(/\d/)),"number";if("/"==n){if(e.eat("*"))return t.tokenize.push(tokenComment),tokenComment(e,t);if(e.eat("/"))return e.skipToEnd(),"comment";if(expectExpression(t.lastToken,!1))return startString(n,e,t)}if("-"==n&&e.eat(">"))return curPunc="->",null;if(/[+\-*&%=<>!?|\/~]/.test(n))return e.eatWhile(/[+\-*&%=<>|~]/),"operator";if(e.eatWhile(/[\w\$_]/),"@"==n)return e.eatWhile(/[\w\$_\.]/),"meta";if("."==t.lastToken)return"property";if(e.eat(":"))return curPunc="proplabel","property";e=e.current();return atoms.propertyIsEnumerable(e)?"atom":keywords.propertyIsEnumerable(e)?(blockKeywords.propertyIsEnumerable(e)?curPunc="newstatement":standaloneKeywords.propertyIsEnumerable(e)&&(curPunc="standalone"),"keyword"):"variable"}function startString(i,e,t){var a=!1;if("/"!=i&&e.eat(i)){if(!e.eat(i))return"string";a=!0}function n(e,t){for(var n,r=!1,o=!a;null!=(n=e.next());){if(n==i&&!r){if(!a)break;if(e.match(i+i)){o=!0;break}}if('"'==i&&"$"==n&&!r&&e.eat("{"))return t.tokenize.push(tokenBaseUntilBrace()),"string";r=!r&&"\\"==n}return o&&t.tokenize.pop(),"string"}return t.tokenize.push(n),n(e,t)}function tokenBaseUntilBrace(){var n=1;function e(e,t){if("}"==e.peek()){if(0==--n)return t.tokenize.pop(),t.tokenize[t.tokenize.length-1](e,t)}else"{"==e.peek()&&n++;return tokenBase(e,t)}return e.isBase=!0,e}function tokenComment(e,t){for(var n,r=!1;n=e.next();){if("/"==n&&r){t.tokenize.pop();break}r="*"==n}return"comment"}function expectExpression(e,t){return!e||"operator"==e||"->"==e||/[\.\[\{\(,;:]/.test(e)||"newstatement"==e||"keyword"==e||"proplabel"==e||"standalone"==e&&!t}function Context(e,t,n,r,o){this.indented=e,this.column=t,this.type=n,this.align=r,this.prev=o}function pushContext(e,t,n){return e.context=new Context(e.indented,t,n,null,e.context)}function popContext(e){var t=e.context.type;return")"!=t&&"]"!=t&&"}"!=t||(e.indented=e.context.indented),e.context=e.context.prev}tokenBase.isBase=!0;const groovy={startState:function(e){return{tokenize:[tokenBase],context:new Context(-e,0,"top",!1),indented:0,startOfLine:!0,lastToken:null}},token:function(e,t){var n=t.context;if(e.sol()&&(null==n.align&&(n.align=!1),t.indented=e.indentation(),t.startOfLine=!0,"statement"!=n.type||expectExpression(t.lastToken,!0)||(popContext(t),n=t.context)),e.eatSpace())return null;curPunc=null;var r=t.tokenize[t.tokenize.length-1](e,t);if("comment"==r)return r;if(null==n.align&&(n.align=!0),";"!=curPunc&&":"!=curPunc||"statement"!=n.type)if("->"==curPunc&&"statement"==n.type&&"}"==n.prev.type)popContext(t),t.context.align=!1;else if("{"==curPunc)pushContext(t,e.column(),"}");else if("["==curPunc)pushContext(t,e.column(),"]");else if("("==curPunc)pushContext(t,e.column(),")");else if("}"==curPunc){for(;"statement"==n.type;)n=popContext(t);for("}"==n.type&&(n=popContext(t));"statement"==n.type;)n=popContext(t)}else curPunc==n.type?popContext(t):("}"==n.type||"top"==n.type||"statement"==n.type&&"newstatement"==curPunc)&&pushContext(t,e.column(),"statement");else popContext(t);return t.startOfLine=!1,t.lastToken=curPunc||r,r},indent:function(e,t,n){if(!e.tokenize[e.tokenize.length-1].isBase)return null;var r=t&&t.charAt(0),t=e.context,e=r==(t="statement"==t.type&&!expectExpression(e.lastToken,!0)?t.prev:t).type;return"statement"==t.type?t.indented+("{"==r?0:n.unit):t.align?t.column+(e?0:1):t.indented+(e?0:n.unit)},languageData:{indentOnInput:/^\s*[{}]$/,commentTokens:{line:"//",block:{open:"/*",close:"*/"}},closeBrackets:{brackets:["(","[","{","'",'"',"'''",'"""']}}};export{groovy};
