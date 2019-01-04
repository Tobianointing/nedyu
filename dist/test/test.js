'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _mockData = require('./mocks/mockData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//config chai to use expect
_chai2.default.use(_chaiHttp2.default);
var expect = _chai2.default.expect;

//deconstructure all mock data

var validMeetup = _mockData.mockMeetupDetails.validMeetup,
    emptyFieldMeetup = _mockData.mockMeetupDetails.emptyFieldMeetup,
    createdMeetup = _mockData.mockMeetupDetails.createdMeetup;
var validQuestion = _mockData.mockQuestionDetails.validQuestion;
var validRsvp = _mockData.mockRSVPDetails.validRsvp;
var validVoter = _mockData.mockVoteDetails.validVoter;
var adminUser = _mockData.mockUserDetails.adminUser,
    normalUser = _mockData.mockUserDetails.normalUser;


describe('Questioner Server', function () {
  describe('GET /', function () {

    it('should respond with status code 200', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1').set('Accept', 'application/json').end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Hi there! Welcome to our Questioner api!');
        done();
      });
    });

    it('/api/v1/meetups should respond with status code 200 and retrieve all meetups', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups').set('Accept', 'application/json').end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all meetups');
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 200 and retrieve specific meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetup/2').set('Accept', 'application/json').end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved specific meetup');
        done();
      });
    });

    it('/api/v1/meetups/upcoming should respond with status code 20 and retrieve all upcoming meetup', function (done) {
      _chai2.default.request(_server2.default).get('/api/v1/meetups/upcoming').set('Accept', 'application/json').end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all upcoming meetups');
        done();
      });
    });
  });

  describe('POST /', function () {

    it('/api/v1/meetups should respond with status code 201 and create a meetup', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups').set('Accept', 'application/json').send(validMeetup).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Meetup successfully created');
        done();
      });
    });

    it('/api/v1/questions should respond with status code 201 and ask a question', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/questions').set('Accept', 'application/json').send(validQuestion).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Question asked successfully');
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 200 and rsvp for an upcoming meetup', function (done) {
      _chai2.default.request(_server2.default).post('/api/v1/meetups/1/rsvps').set('Accept', 'application/json').send(validRsvp).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Rsvp meetup successful');
        done();
      });
    });
  });

  describe('PATCH /', function () {

    it('/api/v1/question/<question-id>/upvote should respond with status code 200 and upvote a question', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/1/upvote').set('Accept', 'application/json').send(validVoter).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Upvote successful');
        done();
      });
    });

    it('/api/v1/question/<question-id>/downvote should respond with status code 200 and downvote a question', function (done) {
      _chai2.default.request(_server2.default).patch('/api/v1/questions/2/downvote').set('Accept', 'application/json').send(validVoter).end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Downvote successful');
        done();
      });
    });
  });
});