import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import { mockMeetupDetails, mockQuestionDetails, mockRSVPDetails, mockVoteDetails } from './mocks/mockData'

//config chai to use expect
chai.use(chaiHttp);
const { expect } = chai;

//deconstructure all mock data
const { validMeetup, emptyFieldMeetup, createdMeetup } = mockQuestionDetails;
const { validQuestion } = mockMeetupDetails;
const { validRsvp } = mockRSVPDetails;
const { validVoter } = mockVoteDetails;

describe('Questioner Server', () => {
	describe('GET /', () => {

    it('should respond with status code 200', (done) => {
      chai.request(app)
      .get('/')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Hi there! Welcome to our Questioner api!');
        done();
      });
    });

    it('/api/v1/meetups should respond with status code 200 and retrieve all meetups', (done) => {
      chai.request(app)
      .get('/api/v1/meetups')
      .set('Accept', 'application/json')
      .end((err, res) => {
      	if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all meetups');
        expect(res.body.data).to.equal([]);
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id> should respond with status code 200 and retrieve specific meetup', (done) => {
      chai.request(app)
      .get('/api/v1/meetups/2')
      .set('Accept', 'application/json')
      .end((err, res) => {
      	if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved specific meetup');
        expect(res.body.data).to.equal({});
        done();
      });
    });

    it('/api/v1/meetups/upcoming should respond with status code 200 and retrieve all upcoming meetup', (done) => {
      chai.request(app)
      .get('/api/v1/meetups/upcoming')
      .set('Accept', 'application/json')
      .end((err, res) => {
      	if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Successfully retrieved all upcoming meetups');
        expect(res.body.data).to.equal([]);
        done();
      });
    });

  });

	describe('POST /', () => {
	
    it('/api/v1/meetups should respond with status code 200 and create a meetup', (done) => {
      chai.request(app)
      .post('/api/v1/meetups')
      .set('Accept', 'application/json')
      .send(validMeetup)
      .end((err, res) => {
      	if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Meetup successfully created');
        expect(res.body.data).to.equal({});
        done();
      });
    });

    it('/api/v1/questions should respond with status code 200 and retrieve specific meetup', (done) => {
      chai.request(app)
      .get('/api/v1/questions')
      .set('Accept', 'application/json')
      .send(validQuestion)
      .end((err, res) => {
      	if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Question asked successfully');
        expect(res.body.data).to.equal({});
        done();
      });
    });

    it('/api/v1/meetups/<meetup-id>/rsvps should respond with status code 200 and rsvp for an upcoming meetup', (done) => {
      chai.request(app)
      .get('/api/v1/meetups/1/rsvps')
      .set('Accept', 'application/json')
      .send(validRsvp)
      .end((err, res) => {
      	if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.message).to.eql('Rsvp meetup successful');
        expect(res.body.data).to.equal({});
        done();
      });
    });

  });

  describe('PATCH /', () => {
	
    it('/api/v1/question/<question-id>/upvote should respond with status code 200 and upvote a question', (done) => {
      chai.request(app)
      .post('/api/v1/questions/1/upvote')
      .set('Accept', 'application/json')
      .send(validVoter)
      .end((err, res) => {
      	if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Upvote successful');
        expect(res.body.data).to.equal({});
        done();
      });
    });

    it('/api/v1/question/<question-id>/downvote should respond with status code 200 and downvote a question', (done) => {
      chai.request(app)
      .post('/api/v1/questions/2/downvote')
      .set('Accept', 'application/json')
      .send(validVoter)
      .end((err, res) => {
      	if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('Downvote successful');
        expect(res.body.data).to.equal({});
        done();
      });
    });

  });
});