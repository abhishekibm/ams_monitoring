Set http = CreateObject("Microsoft.XmlHttp")
http.open "GET", "http://www.webservicex.net/stockquote.asmx?WSDL", FALSE
http.send ""
WScript.Echo http.responseText