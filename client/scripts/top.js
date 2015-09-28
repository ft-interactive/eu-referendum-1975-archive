// global addScript function
function addScript(src, async, defer) {
  if (!async && !defer) {
    document.write('<script src="' + src + '">\x3c/script>');
  }
  else {
    var script = document.createElement('script');
    script.src = src;
    script.async = !!async;
    if (defer) script.defer = !!defer;
    var oldScript = document.getElementsByTagName('script')[0];
    oldScript.parentNode.appendChild(script);
    return script;
  }
}

// CTM based on https://github.com/Financial-Times/next-js-setup/blob/master/templates/ctm.html
var cutsTheMustard = (
  'getComputedStyle' in window &&
  !(window.navigator.userAgent.indexOf('IEMobile') > -1 && !CustomEvent)
);


// set the root element to .core or .enhanced as appropriate
if (cutsTheMustard) {
  document.documentElement.className = (
    document.documentElement.className.replace(/\bcore\b/g, 'enhanced')
  );

  // add polyfill bundle (see polyfill.io for how to add non-default polyfills to this)
  addScript('https://cdn.polyfill.io/v1/polyfill.min.js');
}
else {
  // browser is too old - just enable the HTML5 shiv (so basic HTML5 styling works)
  addScript('https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js');
}




// Chartbeat
var _sf_async_config={};
/** CONFIGURATION START **/
_sf_async_config.uid = 14181;
_sf_async_config.domain = 'ft.com';
_sf_async_config.useCanonical = true;
_sf_async_config.sections = 'Interactive';
_sf_async_config.authors = 'Interactive';
/** CONFIGURATION END **/
(function () {
  function loadChartbeat() {
    window._sf_endpt=(new Date()).getTime();
    var e = document.createElement('script');
    e.setAttribute('language', 'javascript');
    e.setAttribute('type', 'text/javascript');
    e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
    document.body.appendChild(e);
  }
  var oldonload = window.onload;
  window.onload = (typeof window.onload != 'function') ?
  loadChartbeat : function() { oldonload(); loadChartbeat(); };
})();



// google analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-35229645-1', 'auto');
    ga('require','displayfeatures');
    ga('send', 'pageview');
