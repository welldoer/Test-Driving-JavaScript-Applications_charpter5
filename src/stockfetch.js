var fs = require( 'fs' );

var Stockfetch = function() {
  this.readTickersFile = function( fileName, onError ) {
    var self = this;
    
    var processResponse = function( err, data ) {
      if( err )
	    onError( 'Error reading file: ' + fileName );
	  else {
	    var tickers = self.parseTickers( data.toString() );
	    if( tickers.length == 0 )
	      onError( 'File ' + fileName + ' has invalid content!' );
	    else
          self.processTickers( tickers );
	  }
	};
	fs.readFile( fileName, processResponse );
  };

  this.parseTickers = function( content  ) {
    var isInRightFormat = function( str ) {
      return str.trim().length !== 0 && str.indexOf( ' ' ) < 0;
    };
    return content.split( '\n' ).filter( isInRightFormat );
  };
  
  this.processTickers = function( tickers ) {
    var self = this;
    self.tickersCount = tickers.length;
    tickers.forEach( function( ticker ) {
      self.getPrice( ticker );
    });
  };
  this.tickersCount = 0;
  
  this.getPrice = function() {}
};

module.exports = Stockfetch;