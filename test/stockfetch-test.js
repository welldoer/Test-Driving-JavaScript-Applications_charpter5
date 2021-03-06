var expect = require( 'chai' ).expect;
var sinon = require( 'sinon' );
var fs = require( 'fs' );
var Stockfetch = require( '../src/stockfetch' );

describe( 'Stockfetch tests', function() {
  var stockfetch;
  var sandbox;
  
  beforeEach( function() {
    stockfetch = new Stockfetch();
    sandbox = sinon.createSandbox();
  });
  afterEach( function() {
    sandbox.restore();
  });
  
  it( 'should pass this canary test', function() {
    expect( true ).to.be.true;
  });

  it( 'read should invoke error handler for invalid file', function( done ) {
    var onError = function( err ) {
      expect( err ).to.be.eql( 'Error reading file: InvalidFile' );
      done();
    };
    
    sandbox.stub( fs, 'readFile' ).callsFake( function( fileName, callback ) {
      callback( new Error( 'failed' ) );
    });
    
    stockfetch.readTickersFile( 'InvalidFile', onError );
  });

  it( 'read should invoke processTickers for valid file', function( done ) {
    var rawData = 'GOOG\nAAPL\nORCL\nMSFT';
    var parsedData = [ 'GOOG', 'AAPL', 'ORCL', 'MSFT' ];
    
    sandbox.stub( stockfetch, 'parseTickers' )
           .withArgs( rawData ).returns( parsedData );

    sandbox.stub( stockfetch, 'processTickers' ).callsFake( function( data ) {
      expect( data ).to.be.eql( parsedData );
      done();
    });

    sandbox.stub( fs, 'readFile' ).callsFake( function( fileName, callback ) {
	  callback( null, rawData );
    });
    
    stockfetch.readTickersFile( 'tickers.txt' );
  });

  it( 'read should return error if given file is empty', function( done ) {
    var onError = function( err ) {
      expect( err ).to.be.eql( 'File tickers.txt has invalid content!' );
      done();
    };
    
    sandbox.stub( stockfetch, 'parseTickers' )
           .withArgs( '' ).returns( [] );

    sandbox.stub( fs, 'readFile' ).callsFake( function( fileName, callback ) {
	  callback( null, '' );
    });
    
    stockfetch.readTickersFile( 'tickers.txt', onError );
  });
  
  it( 'parseTickers should return tickers', function() {
    expect( stockfetch.parseTickers( "A\nB\nC" ) ).to.be.eql( [ 'A', 'B', 'C' ] );
  });
  it( 'parseTickers should return empty array for empty content', function() {
    expect( stockfetch.parseTickers( "" ) ).to.be.eql( [] );
  });
  it( 'parseTickers should return empty array for white-space', function() {
    expect( stockfetch.parseTickers( "  " ) ).to.be.eql( [] );
  });
  it( 'parseTickers should ignore unexpected format in content', function() {
    var rawData = "AAPL \nBla h\nGOOG\n\n ";
    expect( stockfetch.parseTickers( rawData ) ).to.be.eql( [ 'GOOG' ] );
  });

  it( 'processTickers should call getPrice for each ticker symbol', function() {
    var stockfetchMock = sandbox.mock( stockfetch );
    stockfetchMock.expects( 'getPrice' ).withArgs( 'A' );
    stockfetchMock.expects( 'getPrice' ).withArgs( 'B' );
    stockfetchMock.expects( 'getPrice' ).withArgs( 'C' );
    
    stockfetch.processTickers( [ 'A', 'B', 'C' ] );
    stockfetchMock.verify();
  });
  it( 'processTickers should save tickers count', function() {
//    sandbox.stub( stockfetch, 'getPrice' );

    stockfetch.processTickers( [ 'A', 'B', 'C' ] );
    expect( stockfetch.tickersCount ).to.be.eql( 3 );
  });
});