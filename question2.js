'use strict';
const should = require('should'),
      sinon = require('sinon'),
      jsdom = require('jsdom'),
      window = jsdom.jsdom().defaultView,
      $ = require('jquery')(window);


function printSummary() {
  $.getJSON('http://basketball.example.com/thisweek.json').done((data) => {
    return data.games
  }).map((game) => {
    return game.url
  }).forEach((gameInfo) => {
    $.getJSON(gameInfo).done((data) => {
      const firstTeam = data.teams[0],
            secondTeam = data.teams[1];
      console.log(`${firstTeam.name} ${firstTeam.score} - ${secondTeam.score} ${secondTeam.name}`);
    })
  });
}

describe('printSummary', () => {
  before(() => {
    // stub expected calls
    const doneForData = (data) => {
      return {
        done: function(cb) {
          return cb(data);
        }
      };
    };

    let getJSON = sinon.stub($, 'getJSON');

    getJSON.withArgs('http://basketball.example.com/thisweek.json').returns(doneForData({
      "week": "51st of 2011",
      "games": [
        { "url": "http://basketball.example.com/game/1" },
        { "url": "http://basketball.example.com/game/2" }
      ]
    }));

    getJSON.withArgs('http://basketball.example.com/game/1').returns(doneForData({
      "id": "1",
      "teams": [
        {
          "name": "Lakers",
          "score": 79
        },
        {
          "name": "Bulls",
          "score": 99
        }
      ]
    }));

    getJSON.withArgs('http://basketball.example.com/game/2').returns(doneForData({
      "id": "1",
      "teams": [
        {
          "name": "Celtics",
          "score": 22
        },
        {
          "name": "Hornets",
          "score": 70
        }
      ]
    }));
  });

  after(() =>{

  });

  it('outputs the games', () => {
    try {
      sinon.stub(console, 'log');

      printSummary();

      console.log.callCount.should.equal(2);
      console.log.calledWith('Lakers 79 - 99 Bulls').should.be.true();
      console.log.calledWith('Celtics 22 - 70 Hornets').should.be.true();
    }
    finally {
      // important to keep in finally otherwise it will break log output for tests
      console.log.restore();
    }
  });
})
