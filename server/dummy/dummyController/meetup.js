import dummyMeetup from '../dummyModel/dummyMeetups';
import dummyUser from '../dummyModel/dummyUser';
import Validator from '../_helpers/post_validators';

class MeetupController {

  static getSingleMeetup(req, res) {
    const foundMeetup = dummyMeetup.find(meetup => meetup.id === parseInt(req.params.id, 10));

    if (foundMeetup) {
      return res.status(200).json({
        status: 200,
        message: 'Successfully retrieved specific meetup',
        data: foundMeetup,
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Meetup record not found',
    });
  }

  static createMeetup(req, res) {
    const { organizer, topic, happeningOn, location, tags, images, username } = req.body;
    const fields = { organizer, topic, happeningOn, location, username };
    const validator = new Validator();
    validator.validate(fields, 'required|string');
    if (!validator.hasErrors) {
      const foundUser = dummyUser.find(user => user.username === req.body.username);
      if (foundUser.isAdmin === false) {
        return res.status(401).json({
          status:401,
          error: 'Only an Admin can create meetups'
        })
      }
      let isDuplicate = false;
      for (const event of dummyMeetup) {
        isDuplicate = event.topic === fields.topic && event.location === fields.location;
      }
      if (isDuplicate) {
        return res.status(409).json({ status: 409, error: `This event '${fields.topic}' cannot be created twice` });
      }
      const id = dummyMeetup.length + 1;
      const meetupDetail = { id, organizer, topic, happeningOn, location, tags, images, createdOn: new Date() };
      dummyMeetup.push(meetupDetail);
      return res.status(201).json({
        status: 201,
        message: 'Meetup successfully created',
        data: meetupDetail,
      });
    }
    return res.status(400).json({ errorMessages: validator.getErrors() });
  }
}

export default MeetupController;
