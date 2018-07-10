var n=require("node-fetch"),t=require("chalk"),e=require("terminal-link"),r=require("util-box"),i=r.error,o=r.debug,a=r.httpUtil,u=require("./config"),s=require("./wait");function c(r){return new Promise(function(o,c){var l,h;l=a.makeQueryString({domain:r},u.API_ENDPOINT+"/suggestions"),h=s("Hunting Domain Suggestions");var d=function(){try{return o()}catch(n){return c(n)}},g=function(n){try{return i("Sorry! Unable to fetch suggestions due to Error "+n),h(),d()}catch(n){return c(n)}};try{var m;return n(l).then(function(n){try{var o;return/2[0-9]/.test((m=n).status)?m.json().then(function(n){try{return o=n,console.log(" "+t.white("\n🌎  Here are some suggestions similar to "+t.cyan.underline(r))+" "),o.map(function(n){console.log(t.greenBright(e(n.domain,""+u.PROVIDER_ENDPOINT+n.domain))+" ")}),h(),a.call(this)}catch(n){return g(n)}}.bind(this),g):(i("Error! Unable to fetch suggestions.",m.status),a.call(this));function a(){return d()}}catch(n){return g(n)}}.bind(this),g)}catch(n){g(n)}})}module.exports=function(r,l){r?((l.compare||l.c)&&function(n){o("comparing the "+n)}(r),l.suggestions||l.s?c(r):function(r){new Promise(function(l,h){var d,g;o("Checking availability for "+r),d=a.makeQueryString({domain:r},u.API_ENDPOINT+"/available"),g=s("Hunting domain availability");var m=function(){try{return l()}catch(n){return h(n)}},f=function(n){try{return i("\nUnable to Fetch domain availability "+n),g(),m()}catch(n){return h(n)}};try{var y;return n(d).then(function(n){try{var a;return/2[0-9]/.test((y=n).status)?y.json().then(function(n){try{if((a=n).available){a.numberofYears=a.period>1?"years":"year";var i=e(a.domain,""+u.PROVIDER_ENDPOINT+a.domain);console.log("\n  "+t.bold.underline("Available")+"\n  "+t.dim("The prices are subject to vary based on discounts, taxes and other fees")+"\n  Domain : "+t.greenBright(i)+"\n  Price  : "+t.white(a.price/1e6)+" "+t.yellowBright(a.currency)+"\n  Period : "+t.white(a.period)+" "+a.numberofYears+"\n")}else console.log("\nOh no! That domain seems to be taken.\n\t\t\t\t"),c(r);return g(),s.call(this)}catch(n){return f(n)}}.bind(this),f):(o("Error! Expected 2xx, found "+y.status),i("\nUnable to fetch Domain Availability! Error: "+y.status),g(),s.call(this));function s(){return m()}}catch(n){return f(n)}}.bind(this),f)}catch(n){f(n)}})}(r)):(console.log("\n"+t.red("Missing or invalid input: domain-name\nPlease enter a valid domain name")+"\n"),console.log(""+t.gray("Use the --help to view usage instructions")))};
//# sourceMappingURL=app.js.map