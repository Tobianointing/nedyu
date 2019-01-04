import { Router } from 'express';
import MeetupController from '../dummy/dummyController/meetup';

// deconstructure controllers
const { createMeetup } = MeetupController;

const router = Router();

// general route
router.get('/', (req, res) => {
  res.json({ message: 'Hi there! Welcome to our Questioner api!' });
});

// meetup endpoints
router.post('/meetups', createMeetup);

export default router;
