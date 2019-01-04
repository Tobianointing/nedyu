const mockMeetupDetails = {
	validMeetup : {
		id: 7,
    organizer: 'DevFest',
    topic: 'Web Accessibility',
    happeningOn: '12/12/12',
    location: 'Uyo, Akwa Ibom State',
    Tags: ['Tech', 'Edu'],
    images: ['jpeg.png', 'nn.jpg'],
    // createdOn: new Date(),
	},
	emptyFieldMeetup : {
		id: 1,
    organizer: 'DevFest',
    topic: '',
    happeningOn: '12/12/12',
    location: 'Uyo, Akwa Ibom State',
    Tags: ['Tech', 'Edu'],
    images: ['jpeg.png', 'nn.jpg'],
    createdOn: new Date(),
	},
	createdMeetup : {
    id: 7,
    organizer: 'DevFest',
    topic: 'Web Accessibility',
    happeningOn: '12/12/12',
    location: 'Uyo, Akwa Ibom State',
    Tags: ['Tech', 'Edu'],
    images: ['jpeg.png', 'nn.jpg'],
    // createdOn: new Date(),
  },
}

const mockQuestionDetails = {
  validQuestion : {
    id: 1,
    createdOn: new Date(),
    createdBy: 2,
    meetup: 2,
    title: 'GFW not working?',
    body: 'why is GFW not working when I insert TYF in the config file?',
    votes: 25,
  },
}

const mockRSVPDetails = {
  validRsvp : {
    meetupTopic: 'Web Accessibility',
    status: 'yes'
  },
}

const mockVoteDetails = {
  validVoter : {
    user: 'nedyy'
  }
}

export { mockMeetupDetails, mockQuestionDetails, mockRSVPDetails, mockVoteDetails };