var Stockfetch = function() {
  this.readTickersFile = function( fileName, onError ) {
    onError( 'Error reading file: ' + fileName );
  };
};

module.exports = Stockfetch;