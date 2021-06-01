var words={},variable_regex=/({)?([a-z][a-z0-9_]*)?((::[a-z][a-z0-9_]*)*::)?[a-zA-Z0-9_]+(})?/;function define(e,n){for(var t=n.split(" "),i=0;i<t.length;i++)words[t[i]]=e}function tokenString(e,n){for(var t,i,a=!1;!e.eol()&&(t=e.next())!=n.pending;){if("$"===t&&"\\"!=i&&'"'==n.pending){a=!0;break}i=t}return a&&e.backUp(1),t==n.pending?n.continueString=!1:n.continueString=!0,"string"}function tokenize(e,n){var t=e.match(/[\w]+/,!1),i=e.match(/(\s+)?\w+\s+=>.*/,!1),a=e.match(/(\s+)?[\w:_]+(\s+)?{/,!1),o=e.match(/(\s+)?[@]{1,2}[\w:_]+(\s+)?{/,!1),s=e.next();if("$"===s)return e.match(variable_regex)?n.continueString?"variableName.special":"variable":"error";if(n.continueString)return e.backUp(1),tokenString(e,n);if(n.inDefinition){if(e.match(/(\s+)?[\w:_]+(\s+)?/))return"def";e.match(/\s+{/),n.inDefinition=!1}return n.inInclude?(e.match(/(\s+)?\S+(\s+)?/),n.inInclude=!1,"def"):e.match(/(\s+)?\w+\(/)?(e.backUp(1),"def"):i?(e.match(/(\s+)?\w+/),"tag"):t&&words.hasOwnProperty(t)?(e.backUp(1),e.match(/[\w]+/),e.match(/\s+\S+\s+{/,!1)&&(n.inDefinition=!0),"include"==t&&(n.inInclude=!0),words[t]):/(^|\s+)[A-Z][\w:_]+/.test(t)?(e.backUp(1),e.match(/(^|\s+)[A-Z][\w:_]+/),"def"):a?(e.match(/(\s+)?[\w:_]+/),"def"):o?(e.match(/(\s+)?[@]{1,2}/),"atom"):"#"==s?(e.skipToEnd(),"comment"):"'"==s||'"'==s?(n.pending=s,tokenString(e,n)):"{"==s||"}"==s?"bracket":"/"==s?(e.match(/^[^\/]*\//),"string.special"):s.match(/[0-9]/)?(e.eatWhile(/[0-9]+/),"number"):"="==s?(">"==e.peek()&&e.next(),"operator"):(e.eatWhile(/[\w-]/),null)}define("keyword","class define site node include import inherits"),define("keyword","case if else in and elsif default or"),define("atom","false true running present absent file directory undef"),define("builtin","action augeas burst chain computer cron destination dport exec file filebucket group host icmp iniface interface jump k5login limit log_level log_prefix macauthorization mailalias maillist mcx mount nagios_command nagios_contact nagios_contactgroup nagios_host nagios_hostdependency nagios_hostescalation nagios_hostextinfo nagios_hostgroup nagios_service nagios_servicedependency nagios_serviceescalation nagios_serviceextinfo nagios_servicegroup nagios_timeperiod name notify outiface package proto reject resources router schedule scheduled_task selboolean selmodule service source sport ssh_authorized_key sshkey stage state table tidy todest toports tosource user vlan yumrepo zfs zone zpool");const puppet={startState:function(){var e={inDefinition:!1,inInclude:!1,continueString:!1,pending:!1};return e},token:function(e,n){return e.eatSpace()?null:tokenize(e,n)}};export{puppet};
