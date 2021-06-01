function toWordList(t){var E=[];return t.split(" ").forEach(function(t){E.push({name:t})}),E}var coreWordList=toWordList("INVERT AND OR XOR 2* 2/ LSHIFT RSHIFT 0= = 0< < > U< MIN MAX 2DROP 2DUP 2OVER 2SWAP ?DUP DEPTH DROP DUP OVER ROT SWAP >R R> R@ + - 1+ 1- ABS NEGATE S>D * M* UM* FM/MOD SM/REM UM/MOD */ */MOD / /MOD MOD HERE , @ ! CELL+ CELLS C, C@ C! CHARS 2@ 2! ALIGN ALIGNED +! ALLOT CHAR [CHAR] [ ] BL FIND EXECUTE IMMEDIATE COUNT LITERAL STATE ; DOES> >BODY EVALUATE SOURCE >IN <# # #S #> HOLD SIGN BASE >NUMBER HEX DECIMAL FILL MOVE . CR EMIT SPACE SPACES TYPE U. .R U.R ACCEPT TRUE FALSE <> U> 0<> 0> NIP TUCK ROLL PICK 2>R 2R@ 2R> WITHIN UNUSED MARKER I J TO COMPILE, [COMPILE] SAVE-INPUT RESTORE-INPUT PAD ERASE 2LITERAL DNEGATE D- D+ D0< D0= D2* D2/ D< D= DMAX DMIN D>S DABS M+ M*/ D. D.R 2ROT DU< CATCH THROW FREE RESIZE ALLOCATE CS-PICK CS-ROLL GET-CURRENT SET-CURRENT FORTH-WORDLIST GET-ORDER SET-ORDER PREVIOUS SEARCH-WORDLIST WORDLIST FIND ALSO ONLY FORTH DEFINITIONS ORDER -TRAILING /STRING SEARCH COMPARE CMOVE CMOVE> BLANK SLITERAL"),immediateWordList=toWordList("IF ELSE THEN BEGIN WHILE REPEAT UNTIL RECURSE [IF] [ELSE] [THEN] ?DO DO LOOP +LOOP UNLOOP LEAVE EXIT AGAIN CASE OF ENDOF ENDCASE");function searchWordList(t,E){for(var i=t.length-1;0<=i;i--)if(t[i].name===E.toUpperCase())return t[i]}const forth={startState:function(){return{state:"",base:10,coreWordList:coreWordList,immediateWordList:immediateWordList,wordList:[]}},token:function(t,E){var i;if(t.eatSpace())return null;if(""===E.state){if(t.match(/^(\]|:NONAME)(\s|$)/i))return E.state=" compilation","builtin";if(i=t.match(/^(\:)\s+(\S+)(\s|$)+/))return E.wordList.push({name:i[2].toUpperCase()}),E.state=" compilation","def";if(i=t.match(/^(VARIABLE|2VARIABLE|CONSTANT|2CONSTANT|CREATE|POSTPONE|VALUE|WORD)\s+(\S+)(\s|$)+/i))return E.wordList.push({name:i[2].toUpperCase()}),"def";if(i=t.match(/^(\'|\[\'\])\s+(\S+)(\s|$)+/))return"builtin"}else{if(t.match(/^(\;|\[)(\s)/))return E.state="",t.backUp(1),"builtin";if(t.match(/^(\;|\[)($)/))return E.state="","builtin";if(t.match(/^(POSTPONE)\s+\S+(\s|$)+/))return"builtin"}return(i=t.match(/^(\S+)(\s+|$)/))?void 0!==searchWordList(E.wordList,i[1])?"variable":"\\"===i[1]?(t.skipToEnd(),"comment"):void 0!==searchWordList(E.coreWordList,i[1])?"builtin":void 0!==searchWordList(E.immediateWordList,i[1])?"keyword":"("===i[1]?(t.eatWhile(function(t){return")"!==t}),t.eat(")"),"comment"):".("===i[1]?(t.eatWhile(function(t){return")"!==t}),t.eat(")"),"string"):'S"'===i[1]||'."'===i[1]||'C"'===i[1]?(t.eatWhile(function(t){return'"'!==t}),t.eat('"'),"string"):i[1]-68719476735?"number":"atom":void 0}};export{forth};
