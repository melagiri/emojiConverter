// Conversion logic for emoji, unicode, html, and markdown formats
// This file is decoupled from VS Code APIs for testability

/**
 * Emoji to Markdown shortcode mapping
 */
export const emojiToMarkdownMap: Map<string, string> = new Map([
	['😀', ':grinning:'],
	['😃', ':smiley:'],
	['😄', ':smile:'],
	['😁', ':grin:'],
	['😆', ':laughing:'],
	['😅', ':sweat_smile:'],
	['🤣', ':rofl:'],
	['😂', ':joy:'],
	['🙂', ':slightly_smiling_face:'],
	['🙃', ':upside_down_face:'],
	['😉', ':wink:'],
	['😊', ':blush:'],
	['😇', ':innocent:'],
	['😍', ':heart_eyes:'],
	['🥰', ':smiling_face_with_three_hearts:'],
	['😘', ':kissing_heart:'],
	['😗', ':kissing:'],
	['☺️', ':relaxed:'],
	['😚', ':kissing_closed_eyes:'],
	['😙', ':kissing_smiling_eyes:'],
	['🥲', ':smiling_face_with_tear:'],
	['😋', ':yum:'],
	['😛', ':stuck_out_tongue:'],
	['😜', ':stuck_out_tongue_winking_eye:'],
	['🤪', ':zany_face:'],
	['😝', ':stuck_out_tongue_closed_eyes:'],
	['🤑', ':money_mouth_face:'],
	['🤗', ':hugs:'],
	['🤭', ':hand_over_mouth:'],
	['🤫', ':shushing_face:'],
	['🤔', ':thinking:'],
	['🤐', ':zipper_mouth_face:'],
	['🤨', ':raised_eyebrow:'],
	['😐', ':neutral_face:'],
	['😑', ':expressionless:'],
	['😶', ':no_mouth:'],
	['😏', ':smirk:'],
	['😒', ':unamused:'],
	['🙄', ':roll_eyes:'],
	['😬', ':grimacing:'],
	['🤥', ':lying_face:'],
	['😌', ':relieved:'],
	['😔', ':pensive:'],
	['😪', ':sleepy:'],
	['🤤', ':drooling_face:'],
	['😴', ':sleeping:'],
	['😷', ':mask:'],
	['🤒', ':face_with_thermometer:'],
	['🤕', ':face_with_head_bandage:'],
	['🤢', ':nauseated_face:'],
	['🤮', ':vomiting_face:'],
	['🤧', ':sneezing_face:'],
	['🥵', ':hot_face:'],
	['🥶', ':cold_face:'],
	['🥴', ':woozy_face:'],
	['😵', ':dizzy_face:'],
	['🤯', ':exploding_head:'],
	['🤠', ':cowboy_hat_face:'],
	['🥳', ':partying_face:'],
	['🥸', ':disguised_face:'],
	['😎', ':sunglasses:'],
	['🤓', ':nerd_face:'],
	['🧐', ':monocle_face:'],
	['😕', ':confused:'],
	['😟', ':worried:'],
	['🙁', ':slightly_frowning_face:'],
	['☹️', ':frowning_face:'],
	['😮', ':open_mouth:'],
	['😯', ':hushed:'],
	['😲', ':astonished:'],
	['😳', ':flushed:'],
	['🥺', ':pleading_face:'],
	['😦', ':frowning:'],
	['😧', ':anguished:'],
	['😨', ':fearful:'],
	['😰', ':cold_sweat:'],
	['😥', ':disappointed_relieved:'],
	['😢', ':cry:'],
	['😭', ':sob:'],
	['😱', ':scream:'],
	['😖', ':confounded:'],
	['😣', ':persevere:'],
	['😞', ':disappointed:'],
	['😓', ':sweat:'],
	['😩', ':weary:'],
	['😫', ':tired_face:'],
	['🥱', ':yawning_face:'],
	['😤', ':triumph:'],
	['😡', ':rage:'],
	['😠', ':angry:'],
	['🤬', ':cursing_face:'],
	['👍', ':thumbsup:'],
	['👎', ':thumbsdown:'],
	['❤️', ':heart:'],
	['🔥', ':fire:'],
	['🚀', ':rocket:'],
	['⭐', ':star:'],
	['✅', ':white_check_mark:'],
	['❌', ':x:'],
	['🌍', ':earth_africa:'],
	['🎉', ':tada:'],
	['💬', ':speech_balloon:'],
	['👏', ':clap:'],
	['🙏', ':pray:'],
	['👀', ':eyes:'],
	['💯', ':100:'],
	['👋', ':wave:'],
	['💪', ':muscle:'],
	['🙈', ':see_no_evil:'],
	['🙉', ':hear_no_evil:'],
	['🙊', ':speak_no_evil:'],
	['🏆', ':trophy:'],
	['🤩', ':star_struck:'],
	['🥳', ':partying_face:'],
	['🤔', ':thinking_face:'],
	['🤦', ':facepalm:'],
	['🤷', ':shrug:'],
	['😱', ':scream:'],
	['😭', ':sob:'],
	['🎊', ':confetti_ball:'],
	['✨', ':sparkles:'],
	['💥', ':boom:'],
	['💡', ':bulb:'],
	['⚠️', ':warning:'],
	['💤', ':zzz:'],
	['⏳', ':hourglass:'],
	['📅', ':calendar:'],
	['📝', ':memo:'],
	['📌', ':pushpin:'],
	['🔒', ':lock:'],
	['🔓', ':unlock:'],
	['🔑', ':key:'],
	['🔔', ':bell:'],
	['🔍', ':mag:'],
	['🔖', ':bookmark:'],
	['🔗', ':link:'],
	['✉️', ':email:'],
	['☎️', ':phone:'],
	['🔧', ':wrench:'],
	['🔨', ':hammer:'],
	['🔩', ':nut_and_bolt:'],
	['⚙️', ':gear:'],
	['🎯', ':dart:'],
	['🎁', ':gift:'],
	['💰', ':moneybag:'],
	['💳', ':credit_card:'],
	['📈', ':chart_with_upwards_trend:'],
	['📉', ':chart_with_downwards_trend:'],
	['📊', ':bar_chart:'],
	['📋', ':clipboard:'],
	['📁', ':file_folder:'],
	['📦', ':package:'],
	['✏️', ':pencil2:'],
	['📚', ':books:'],
	['🔬', ':microscope:'],
	['🔭', ':telescope:'],
	['🔋', ':battery:'],
	['🔌', ':electric_plug:'],
	['🔦', ':flashlight:'],
	['🕯️', ':candle:'],
	['🗑️', ':wastebasket:'],
	['💎', ':gem:'],
	['🛒', ':shopping_cart:'],
	['🚪', ':door:'],
	['🛏️', ':bed:'],
	['🚽', ':toilet:'],
	['🚿', ':shower:'],
	['🛁', ':bathtub:'],
	['⏰', ':alarm_clock:'],
	['⏱️', ':stopwatch:'],
	['⏲️', ':timer_clock:'],
	['🕰️', ':mantelpiece_clock:'],
]);

// Patch: Add both base and variation selector forms for emoji keys
const extraEmojiToMarkdown: [string, string][] = [
  ['⚠', ':warning:'],
  ['✉', ':email:'],
  ['☎', ':phone:'],
  ['⚙', ':gear:'],
  ['🕯', ':candle:'],
  ['🗑', ':wastebasket:'],
  ['🛏', ':bed:'],
  ['⏱', ':stopwatch:'],
  ['⏲', ':timer_clock:'],
  ['🕰', ':mantelpiece_clock:'],
  ['✏', ':pencil2:'],
];
for (const [base, markdown] of extraEmojiToMarkdown) {
  emojiToMarkdownMap.set(base, markdown);
  emojiToMarkdownMap.set(base + '\uFE0F', markdown); // with variation selector
}

/**
 * Markdown shortcode to Emoji mapping
 */
export const markdownToEmojiMap: Map<string, string> = new Map();
emojiToMarkdownMap.forEach((value, key) => {
	markdownToEmojiMap.set(value.replace(/:/g, ''), key);
});

export const regexPatterns = {
	emoji: /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
	unicode: /\\u\{([0-9A-Fa-f]+)\}/g,
	html: /&#(\d+);/g,
	markdown: /:([\w_]+):/g
};

export function convertEmojisToUnicode(text: string): string {
	const cache: Map<string, string> = new Map();
	regexPatterns.emoji.lastIndex = 0;
	return text.replace(regexPatterns.emoji, (match) => {
		if (cache.has(match)) { return cache.get(match)!; }
		const codePoint = match.codePointAt(0);
		if (codePoint) {
			const result = `\\u{${codePoint.toString(16).toUpperCase()}}`;
			cache.set(match, result);
			return result;
		}
		return match;
	});
}

export function convertUnicodeToEmojis(text: string): string {
        regexPatterns.unicode.lastIndex = 0;
        return text.replace(regexPatterns.unicode, (match, codePoint) => {
                const parsed = parseInt(codePoint, 16);
                if (Number.isFinite(parsed)) {
                        try {
                                return String.fromCodePoint(parsed);
                        } catch {
                                return match;
                        }
                }
                return match;
        });
}

export function convertEmojisToHtmlEntities(text: string): string {
	const cache: Map<string, string> = new Map();
	regexPatterns.emoji.lastIndex = 0;
	return text.replace(regexPatterns.emoji, (match) => {
		if (cache.has(match)) { return cache.get(match)!; }
		const codePoint = match.codePointAt(0);
		if (codePoint) {
			const result = `&#${codePoint};`;
			cache.set(match, result);
			return result;
		}
		return match;
	});
}

export function convertHtmlEntitiesToEmojis(text: string): string {
	regexPatterns.html.lastIndex = 0;
	return text.replace(regexPatterns.html, (_, codePoint) => {
		return String.fromCodePoint(parseInt(codePoint, 10));
	});
}

export function convertEmojisToMarkdown(text: string): string {
	regexPatterns.emoji.lastIndex = 0;
	return text.replace(regexPatterns.emoji, (match) => {
		const shortcode = emojiToMarkdownMap.get(match);
		return shortcode || match;
	});
}

export function convertMarkdownToEmojis(text: string): string {
	regexPatterns.markdown.lastIndex = 0;
	return text.replace(regexPatterns.markdown, (match, shortcode) => {
		const emoji = markdownToEmojiMap.get(shortcode);
		return emoji || match;
	});
}

export function composeConversions(...conversionFns: Array<(text: string) => string>): (text: string) => string {
	return (text: string) => {
		return conversionFns.reduce((result, fn) => fn(result), text);
	};
}
