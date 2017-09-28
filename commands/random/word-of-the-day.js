const Command = require('../../structures/Command');
const snekfetch = require('snekfetch');
const { stripIndents } = require('common-tags');
const { WORDNIK_KEY } = process.env;

module.exports = class WordOfTheDayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'word-of-the-day',
			aliases: ['wordnik-word-of-the-day'],
			group: 'random',
			memberName: 'word-of-the-day',
			description: 'Gets the word of the day.'
		});
	}

	async run(msg) {
		try {
			const { body } = await snekfetch
				.get('http://api.wordnik.com/v4/words.json/wordOfTheDay')
				.query({ api_key: WORDNIK_KEY });
			return msg.say(stripIndents`
				**${body.word}**
				(${body.definitions[0].partOfSpeech || 'N/A'}) ${body.definitions[0].text}
			`);
		} catch (err) {
			return msg.say(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};