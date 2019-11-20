var onSuccess = function(response) {
  var cCode = response.country.iso_code;
  var cContinent = response.continent.code;
  var uri = null,
      ukSite  = 'https://eu.peerless-av.com',
      geSite  = 'https://de.peerless-av.com',
      frSite  = 'https://fr.peerless-av.com',
      laSite  = 'https://mx.peerless-av.myshopify.com',
      usSite  = 'https://peerless-av.myshopify.com';
    console.log("response", response);
    console.log("cCode", cCode);
  
  var noindexMeta = document.createElement('meta')
  //<meta name="robots" content="noindex">
  noindexMeta.name = 'robots'
  noindexMeta.content = 'noindex';
  console.log("noindexMeta", noindexMeta);

  switch (cCode) {
    case "DE":
    case "AT":
    case "LI":
    case "CH":
      uri = geSite;
      break;
    case "FR":
      uri = frSite;
      break;
    default:
      switch (cContinent) {
        case "NA":
        case "OC":
        case "SA":
          // uri = usSite;
          break;
        case "EU":
        case "AF":
        case "AN":
        case "AS":
          uri = ukSite;
          break;
        default:
          //uri = usSite;
          break;
      }
  }
  console.log("uri", uri);
  if (uri && localStorage.getItem('dev_team') == null) {
    document.head.append(noindexMeta);
console.log(window.location.pathname );
    window.location = uri + window.location.pathname ;
  }
};

var onError = function(error) {
  console.log(JSON.stringify(error, undefined, 4));
  //window.location = uri;
};

if (typeof geoip2 !== "undefined") {
  geoip2.country(onSuccess, onError);
}
