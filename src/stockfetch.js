var fs = require( 'fs' );

var Stockfetch = function() {
  this.readTickersFile = function( fileName, onError ) {
    var self = this;
    
    var processResponse = function( err, data ) {
      if( err )
	    onError( 'Error reading file: ' + fileName );
	  else {
	    var tickers = self.parseTickers( data.toString() );
	    self.processTickers( tickers );
	  }
	};
	fs.readFile( fileName, processResponse );
  };

  this.parseTickers = function() {};
  this.processTickers = function() {};
};

module.exports = Stockfetch;