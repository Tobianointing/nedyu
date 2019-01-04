import { Router } from 'express';
import MeetupController from '../dummy/dummyController/meetup';
import QuestionController from '../dummy/dummyController/question';

// deconstructure controllers
const { createMeetup } = MeetupController;
const { createQuestion } = QuestionController;

const router = Router();

// general route
router.get('/', (req, res) => {
  res.json({ message: 'Hi there! Welcome to our Questioner api!' });
});

// meetup endpoints
router.post('/meetups', createMeetup);

// question endpoints
router.post('/questions', createQuestion);

export default router;
