'use-strict';

require('../server');

var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

describe('Users REST api, get and post requests', function() {

  it('Should get an array of User files', function(done){
    chai.request('localhost:3000/')
      .get('api/rants')
      .end(function(err, res) {
        expect(err).eql(null);
        expect(typeof res.body).to.eql('object');
        expect(Array.isArray(res.body)).to.eql(true);
        done();
    });
  });

  it('Should create a User object', function(done){
    chai.request('localhost:3000/')
      .post('api/users')
      .send({title: 'Test', rant: 'Test user'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('new file written');
        done();
    });
  });
});

describe('Needs Users to alter', function() {

  beforeEach(function(done) {
    var userTest = {
      name: 'test',
    };
    done();
  });

  it('should replace a Rant', function(done){
    chai.request('localhost:3000')
      .put('/api/rants/:id')
      .send({name: 'New Name'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('put request complete');
        done();
    });
  });

  it('should update a User', function(done){
    chai.request('localhost:3000')
      .patch('/api/users/:id')
      .send({title: 'New Title', rant: 'Tests are great'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('patch request complete');
        done();
    });
  });

  it('should delete a User', function(done){
    chai.request('localhost:3000')
      .delete('/api/user/:id')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.msg).to.eql('delete request complete');
        done();
    });
  });
});
