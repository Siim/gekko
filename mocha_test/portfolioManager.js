'use strict';
var Manager = require('../core/PortfolioManager.js');
var util = require('../core/util.js');
var _ = require('lodash');
var chai = chai || require('chai');
var sinon = sinon || require('sinon');
var should = chai.should();

describe('Portfolio Manager', function(){

    var config = util.getConfig();
    var manager;

    config.watch = {
      enabled: true,
      exchange: 'bitstamp', // @link https://github.com/askmike/gekko#supported-exchanges
      key: 'LIVzgHi4vS1YKyuae9TUGNR4k2C55BYF',
      secret: 'itUNBJMLGKrjQI1UGIqJT7o9pqDAFPkk',
      currency: 'USD',
      asset: 'BTC'
    }

    config.trader = {
      enabled: true,
      tradePercent: 10,
      username: '100000' // your username, only fill in when using bitstamp or cexio
    }


    manager = new Manager(_.extend(config.trader, config.watch));

    var stubInit = sinon.stub(manager, "init", function(callback) {
      // setportfolio
      // setfee
      this.portfolio = [ { name: 'BTC', amount: 0.99 }, { name: 'USD', amount: 242.2 } ];
      this.fee = 0.0020;
      callback();
    });

    var setPortfolioStub = sinon.stub(manager, "setPortfolio", function(callback) {
      this.portfolio = [ { name: 'BTC', amount: 0.99 }, { name: 'USD', amount: 242.2 } ];
      callback();
    }.bind(manager));


    it('should fail to create an instance without config', function() {
        (function(){
            new Manager({});
        }).should.throw();
    });


    it('should not fail to create an instance with config', function() {
        (function(){
            new Manager(_.extend(config.trader, config.watch));
        }).should.not.throw();
    });


    describe('#init', function(){

      it('should successfully initialize', function(done) {
        manager.init(done);
      });

      it('should have fee', function(){
        manager.fee.should.equal(0.0020);
      });

      it('should have fee type that is number', function(){
        manager.fee.should.be.a('number');
      });

      it('should have a portfolio', function(){
        manager.portfolio.should.be.an('array');
      });

    });


    describe('#trade', function(){
      it('should buy if necessary balance exists', function(done){
        manager.trade('BUY', done);
      });

      it('should buy if necessary balance exists', function(done){
        manager.trade('BUY', done);
      });
    });


    describe('#getFund', function(){

    });


    describe('#getBalance', function(){

    });


    describe('#getMinimum', function(){

    });


    describe('#buy', function(){

    });


    describe('#sell', function(){

    });


    describe('#noteOrder', function(){

    });


    describe('#checkOrder', function(){

    });


    describe('#logPortfolio', function(){

    });


    describe('#recheckPortfolio', function(){

    });

    describe('#enforcePosition', function(){

    });
});
