module.exports = {
    config: {
        name: "viewonce",
        version: "1.0.1",
        role: 0,
        hasPrefix: false,
        credits: "NIROB",
        description: "Capture and save photos or media sent in chat automatically",
        commandCategory: "utility",
        usages: "Send media in chat",
        cooldowns: 3
    },

    onLoad: async function () {
        console.log("==> ViewOnce command loaded successfully by NIROB!");
    },

    handleEvent: async function ({ api, event, message }) {
        try {
            // Ensure message and attachments exist
            if (!event || event.type !== "message" || !event.attachments || event.attachments.length === 0) return;

            for (const attachment of event.attachments) {
                // Check if attachment is photo, video, or animated image
                if (["photo", "video", "animated_image", "audio"].includes(attachment.type)) {
                    const fileUrl = attachment.url || (attachment.payload && attachment.payload.url);

                    if (fileUrl) {
                        const mediaType = attachment.type;
                        
                        // Fetch stream using global utility and reply back
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
    },

    run: async function ({ api, event, message }) {
        return message.reply("⚡ **ViewOnce Bot Active!**\nSend any photo or media in the chat, and I will capture and send it back to you instantly.");
    }
};
