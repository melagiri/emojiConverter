"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const conversion_1 = require("../src/conversion");
describe('Emoji Converter Extension', () => {
    describe('convertEmojisToUnicode', () => {
        it('should convert emoji to Unicode escape', () => {
            (0, chai_1.expect)((0, conversion_1.convertEmojisToUnicode)('💬')).to.equal('\\u{1F4AC}');
            (0, chai_1.expect)((0, conversion_1.convertEmojisToUnicode)('😀😃')).to.equal('\\u{1F600}\\u{1F603}');
        });
        it('should leave non-emoji text unchanged', () => {
            (0, chai_1.expect)((0, conversion_1.convertEmojisToUnicode)('hello')).to.equal('hello');
        });
    });
    describe('convertUnicodeToEmojis', () => {
        it('should convert Unicode escape to emoji', () => {
            (0, chai_1.expect)((0, conversion_1.convertUnicodeToEmojis)('\\u{1F4AC}')).to.equal('💬');
            (0, chai_1.expect)((0, conversion_1.convertUnicodeToEmojis)('\\u{1F600}\\u{1F603}')).to.equal('😀😃');
        });
        it('should leave non-Unicode text unchanged', () => {
            (0, chai_1.expect)((0, conversion_1.convertUnicodeToEmojis)('hello')).to.equal('hello');
        });
    });
    describe('convertEmojisToHtmlEntities', () => {
        it('should convert emoji to HTML entity', () => {
            (0, chai_1.expect)((0, conversion_1.convertEmojisToHtmlEntities)('💬')).to.equal('&#128172;');
            (0, chai_1.expect)((0, conversion_1.convertEmojisToHtmlEntities)('😀😃')).to.equal('&#128512;&#128515;');
        });
        it('should leave non-emoji text unchanged', () => {
            (0, chai_1.expect)((0, conversion_1.convertEmojisToHtmlEntities)('hello')).to.equal('hello');
        });
    });
    describe('convertHtmlEntitiesToEmojis', () => {
        it('should convert HTML entity to emoji', () => {
            (0, chai_1.expect)((0, conversion_1.convertHtmlEntitiesToEmojis)('&#128172;')).to.equal('💬');
            (0, chai_1.expect)((0, conversion_1.convertHtmlEntitiesToEmojis)('&#128512;&#128515;')).to.equal('😀😃');
        });
        it('should leave non-entity text unchanged', () => {
            (0, chai_1.expect)((0, conversion_1.convertHtmlEntitiesToEmojis)('hello')).to.equal('hello');
        });
    });
    describe('convertEmojisToMarkdown', () => {
        it('should convert emoji to Markdown shortcode', () => {
            (0, chai_1.expect)((0, conversion_1.convertEmojisToMarkdown)('💬')).to.equal(':speech_balloon:');
            (0, chai_1.expect)((0, conversion_1.convertEmojisToMarkdown)('😀😃')).to.equal(':grinning::smiley:');
        });
        it('should leave non-emoji text unchanged', () => {
            (0, chai_1.expect)((0, conversion_1.convertEmojisToMarkdown)('hello')).to.equal('hello');
        });
    });
    describe('convertMarkdownToEmojis', () => {
        it('should convert Markdown shortcode to emoji', () => {
            (0, chai_1.expect)((0, conversion_1.convertMarkdownToEmojis)(':speech_balloon:')).to.equal('💬');
            (0, chai_1.expect)((0, conversion_1.convertMarkdownToEmojis)(':grinning::smiley:')).to.equal('😀😃');
        });
        it('should leave non-markdown text unchanged', () => {
            (0, chai_1.expect)((0, conversion_1.convertMarkdownToEmojis)('hello')).to.equal('hello');
        });
    });
    describe('composeConversions', () => {
        it('should compose multiple conversions', () => {
            const composed = (0, conversion_1.composeConversions)(conversion_1.convertEmojisToUnicode, conversion_1.convertUnicodeToEmojis);
            (0, chai_1.expect)(composed('💬')).to.equal('💬');
        });
    });
    describe('Newly added emoji markdowns', () => {
        const emojiMarkdownPairs = [
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
        ];
        // Normalize emoji and markdown for comparison (removes variation selectors)
        function normalizeEmoji(str) {
            return str.normalize('NFKD').replace(/\uFE0F/g, '');
        }
        it('should convert emoji to markdown', () => {
            for (const [emoji, markdown] of emojiMarkdownPairs) {
                (0, chai_1.expect)(normalizeEmoji((0, conversion_1.convertEmojisToMarkdown)(emoji))).to.equal(normalizeEmoji(markdown));
            }
        });
        it('should convert markdown to emoji', () => {
            for (const [emoji, markdown] of emojiMarkdownPairs) {
                (0, chai_1.expect)(normalizeEmoji((0, conversion_1.convertMarkdownToEmojis)(markdown))).to.equal(normalizeEmoji(emoji));
            }
        });
        it('should handle a random sequence of new emoji', () => {
            const emojis = emojiMarkdownPairs.map(([e]) => e).join('');
            const markdowns = emojiMarkdownPairs.map(([, m]) => m).join('');
            (0, chai_1.expect)(normalizeEmoji((0, conversion_1.convertEmojisToMarkdown)(emojis))).to.equal(normalizeEmoji(markdowns));
            (0, chai_1.expect)(normalizeEmoji((0, conversion_1.convertMarkdownToEmojis)(markdowns))).to.equal(normalizeEmoji(emojis));
        });
    });
    describe('Edge cases and coverage for conversion.ts', () => {
        it('should handle empty strings for all conversions', () => {
            (0, chai_1.expect)((0, conversion_1.convertEmojisToUnicode)('')).to.equal('');
            (0, chai_1.expect)((0, conversion_1.convertUnicodeToEmojis)('')).to.equal('');
            (0, chai_1.expect)((0, conversion_1.convertEmojisToHtmlEntities)('')).to.equal('');
            (0, chai_1.expect)((0, conversion_1.convertHtmlEntitiesToEmojis)('')).to.equal('');
            (0, chai_1.expect)((0, conversion_1.convertEmojisToMarkdown)('')).to.equal('');
            (0, chai_1.expect)((0, conversion_1.convertMarkdownToEmojis)('')).to.equal('');
        });
        it('should handle mixed content', () => {
            const input = 'Hello 💬 :speech_balloon: &#128172; \\u{1F4AC}!';
            // Only emoji is converted
            (0, chai_1.expect)((0, conversion_1.convertEmojisToUnicode)(input)).to.include('\\u{1F4AC}');
            (0, chai_1.expect)((0, conversion_1.convertEmojisToHtmlEntities)(input)).to.include('&#128172;');
            (0, chai_1.expect)((0, conversion_1.convertEmojisToMarkdown)(input)).to.include(':speech_balloon:');
            // Only markdown is converted
            (0, chai_1.expect)((0, conversion_1.convertMarkdownToEmojis)(input)).to.include('💬');
            // Only HTML entity is converted
            (0, chai_1.expect)((0, conversion_1.convertHtmlEntitiesToEmojis)(input)).to.include('💬');
            // Only unicode is converted
            (0, chai_1.expect)((0, conversion_1.convertUnicodeToEmojis)(input.replace('\\', ''))).to.include('💬');
        });
        it('should not throw on invalid unicode or html entity', () => {
            (0, chai_1.expect)(() => (0, conversion_1.convertUnicodeToEmojis)('\\u{ZZZZ}')).to.not.throw();
            (0, chai_1.expect)(() => (0, conversion_1.convertHtmlEntitiesToEmojis)('&#notanumber;')).to.not.throw();
        });
        it('should allow composeConversions with no functions', () => {
            const composed = (0, conversion_1.composeConversions)();
            (0, chai_1.expect)(composed('test')).to.equal('test');
        });
        it('should allow composeConversions with one function', () => {
            const composed = (0, conversion_1.composeConversions)(conversion_1.convertEmojisToMarkdown);
            (0, chai_1.expect)(composed('💬')).to.equal(':speech_balloon:');
        });
        it('regexPatterns should match expected content', () => {
            (0, chai_1.expect)('💬'.match(conversion_1.regexPatterns.emoji)).to.not.be.null;
            (0, chai_1.expect)('\\u{1F4AC}'.match(conversion_1.regexPatterns.unicode)).to.not.be.null;
            (0, chai_1.expect)('&#128172;'.match(conversion_1.regexPatterns.html)).to.not.be.null;
            (0, chai_1.expect)(':speech_balloon:'.match(conversion_1.regexPatterns.markdown)).to.not.be.null;
        });
        it('emojiToMarkdownMap and markdownToEmojiMap should be consistent', () => {
            function normalizeEmoji(str) {
                return str.normalize('NFKD').replace(/\uFE0F/g, '');
            }
            for (const [emoji, markdown] of conversion_1.emojiToMarkdownMap.entries()) {
                const shortcode = markdown.replace(/:/g, '');
                (0, chai_1.expect)(normalizeEmoji(conversion_1.markdownToEmojiMap.get(shortcode) || '')).to.equal(normalizeEmoji(emoji));
            }
        });
    });
});
//# sourceMappingURL=extension.test.js.map