module.exports = {
    config: {
        name: "viewonce",
        version: "1.0.3",
        role: 0,
        hasPrefix: false,
        credits: "NIROB",
        description: "Capture and save photos or media sent in chat automatically",
        commandCategory: "utility",
        usages: "Send media in chat",
        cooldowns: 3
    },

    onLoad: async function () {
        console.log("==> ViewOnce command loaded successfully!");
    },

    // onStart function jeta command run korle ba direct call hole kaj korbe
    onStart: async function ({ api, event, message }) {
        return message.reply("⚡ **ViewOnce Bot Active!**\nSend any photo or media in the chat, and I will capture and send it back to you instantly.");
    },

    // onChat ba run handle korar jonno fallback
    run: async function ({ api, event, message }) {
        return this.onStart({ api, event, message });
    },

    // handleEvent diye chat er attachment ba view-once media catch korbe
    handleEvent: async function ({ api, event, message }) {
        try {
            if (!event || event.type !== "message" || !event.attachments || event.attachments.length === 0) return;

            for (const attachment of event.attachments) {
                if (["photo", "video", "animated_image", "audio"].includes(attachment.type)) {
                    const fileUrl = attachment.url || (attachment.payload && attachment.payload.url);

                    if (fileUrl) {
                        const mediaType = attachment.type;
                        const stream = await global.utils.getStreamFromURL(fileUrl);
                        if (stream) {
                            await message.reply({
                                body: `⚠️ **Captured Media (${mediaType.toUpperCase()}):**`,
                                attachment: stream
                            });
                        }
                    }
                }
            }
        } catch (e) {
            console.error("Error in viewonce handleEvent:", e);
        }
    }
};
