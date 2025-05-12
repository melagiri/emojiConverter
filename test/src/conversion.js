"use strict";
// Conversion logic for emoji, unicode, html, and markdown formats
// This file is decoupled from VS Code APIs for testability
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexPatterns = exports.markdownToEmojiMap = exports.emojiToMarkdownMap = void 0;
exports.convertEmojisToUnicode = convertEmojisToUnicode;
exports.convertUnicodeToEmojis = convertUnicodeToEmojis;
exports.convertEmojisToHtmlEntities = convertEmojisToHtmlEntities;
exports.convertHtmlEntitiesToEmojis = convertHtmlEntitiesToEmojis;
exports.convertEmojisToMarkdown = convertEmojisToMarkdown;
exports.convertMarkdownToEmojis = convertMarkdownToEmojis;
exports.composeConversions = composeConversions;
/**
 * Emoji to Markdown shortcode mapping
 */
exports.emojiToMarkdownMap = new Map([
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
const extraEmojiToMarkdown = [
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
    exports.emojiToMarkdownMap.set(base, markdown);
    exports.emojiToMarkdownMap.set(base + '\uFE0F', markdown); // with variation selector
}
/**
 * Markdown shortcode to Emoji mapping
 */
exports.markdownToEmojiMap = new Map();
exports.emojiToMarkdownMap.forEach((value, key) => {
    exports.markdownToEmojiMap.set(value.replace(/:/g, ''), key);
});
exports.regexPatterns = {
    emoji: /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu,
    unicode: /\\u\{([0-9A-Fa-f]+)\}/g,
    html: /&#(\d+);/g,
    markdown: /:([\w_]+):/g
};
function convertEmojisToUnicode(text) {
    const cache = new Map();
    exports.regexPatterns.emoji.lastIndex = 0;
    return text.replace(exports.regexPatterns.emoji, (match) => {
        if (cache.has(match)) {
            return cache.get(match);
        }
        const codePoint = match.codePointAt(0);
        if (codePoint) {
            const result = `\\u{${codePoint.toString(16).toUpperCase()}}`;
            cache.set(match, result);
            return result;
        }
        return match;
    });
}
function convertUnicodeToEmojis(text) {
    exports.regexPatterns.unicode.lastIndex = 0;
    return text.replace(exports.regexPatterns.unicode, (_, codePoint) => {
        return String.fromCodePoint(parseInt(codePoint, 16));
    });
}
function convertEmojisToHtmlEntities(text) {
    const cache = new Map();
    exports.regexPatterns.emoji.lastIndex = 0;
    return text.replace(exports.regexPatterns.emoji, (match) => {
        if (cache.has(match)) {
            return cache.get(match);
        }
        const codePoint = match.codePointAt(0);
        if (codePoint) {
            const result = `&#${codePoint};`;
            cache.set(match, result);
            return result;
        }
        return match;
    });
}
function convertHtmlEntitiesToEmojis(text) {
    exports.regexPatterns.html.lastIndex = 0;
    return text.replace(exports.regexPatterns.html, (_, codePoint) => {
        return String.fromCodePoint(parseInt(codePoint, 10));
    });
}
function convertEmojisToMarkdown(text) {
    exports.regexPatterns.emoji.lastIndex = 0;
    return text.replace(exports.regexPatterns.emoji, (match) => {
        const shortcode = exports.emojiToMarkdownMap.get(match);
        return shortcode || match;
    });
}
function convertMarkdownToEmojis(text) {
    exports.regexPatterns.markdown.lastIndex = 0;
    return text.replace(exports.regexPatterns.markdown, (match, shortcode) => {
        const emoji = exports.markdownToEmojiMap.get(shortcode);
        return emoji || match;
    });
}
function composeConversions(...conversionFns) {
    return (text) => {
        return conversionFns.reduce((result, fn) => fn(result), text);
    };
}
//# sourceMappingURL=conversion.js.map