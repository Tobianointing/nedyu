import dummyQuestion from '../dummyModel/dummyQuestion';
import dummyMeetup from '../dummyModel/dummyMeetups';
import dummyUser from '../dummyModel/dummyUser';
import Validator from '../_helpers/post_validators';

let upcount = 1;
let downcount = 1;

class QuestionController {
  static createQuestion(req, res) {
    const { user, meetup, title, body } = req.body;
    const fields = { user, meetup, title, body };
    const validator = new Validator();
    validator.validate(fields, 'required|string');
    if (!validator.hasErrors) {
      const foundUsername = dummyUser.find(user => user.username === req.body.user);
      const foundMeetup = dummyMeetup.find(meetup => meetup.topic === req.body.meetup);
      if (foundUsername && foundMeetup) {
        const id = dummyQuestion.length + 1;
        const userId = foundUsername.id;
        const meetupId = foundMeetup.id;
        let isDuplicate = false;
        for (const question of dummyQuestion) {
          isDuplicate = question.meetup === fields.meetup && question.title === fields.title && question.body === fields.body;
        }
        if (isDuplicate) {
          return res.status(409).json({ error: `This question '${fields.title}' has already been asked for this meetup` });
        }
        const votes = 0;
        const questionDetail = { id, user, meetup, title, body, votes, createdOn: new Date() };
        dummyQuestion.push(questionDetail);
        const resDetails = { userId, meetupId, title, body }
        return res.status(201).json({
          status: 201,
          message: 'Question asked successfully',
          data: resDetails,
        });
      } else {
        return res.status(404).json({ error: 'User or Meetup does not exist' });
      }
    } else {
      return res.status(400).json({ errorMessages:validator.getErrors() });
    }
  }
}

export default QuestionController;
