#!/bin/bash
#
# Manuel Nila - Oct. 2022

export MANWIDTH=80

#TEMPLATE=$(<_index.html)
#TEST=$(man ./manila.7 | col -bx)

#OUTPUT=$(echo "$TEMPLATE" | sed -e "s/{{manpage}}/$TEST/g")

TOP_BUN='<!doctype html>
<html>
<head>
<link rel="me" href="https://mastodon.social/@manila" />
<link rel="me" href="mailto:manila@manila.me" />
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-GLHGR2F8XD"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag("js", new Date());

  gtag("config", "G-GLHGR2F8XD");
</script>
</head>
<body>
<pre>'
MEAT="$( man ./manila.7 | col -bx )"
BOTTOM_BUN='</pre>
</body>
</html>'

OUTPUT="$TOP_BUN$MEAT$BOTTOM_BUN"
echo "$OUTPUT"
