import { log } from "src/logger/logManager";
import QuickAdd from "src/main";

export default {
	description:
		"Use QuickAdd template folder instead of Obsidian templates plugin folder / Templater templates folder.",
	migrate: async (plugin: QuickAdd): Promise<void> => {
		try {
			const templaterPlugin = app.plugins.plugins["templater"];
			const obsidianTemplatesPlugin =
				app.internalPlugins.plugins["templates"];

			if (!templaterPlugin && !obsidianTemplatesPlugin) {
				log.logMessage("No template plugin found. Skipping migration.");

				return;
			}

			if (obsidianTemplatesPlugin) {
				const obsidianTemplatesSettings =
					obsidianTemplatesPlugin.instance.options;
				if (obsidianTemplatesSettings["folder"]) {
					plugin.settings.templateFolderPath =
						obsidianTemplatesSettings["folder"];

					log.logMessage("Migrated template folder path to Obsidian Templates' setting.");
				}
			}

			if (templaterPlugin) {
				const templaterSettings = templaterPlugin.settings;
				if (templaterSettings["template_folder"]) {
					plugin.settings.templateFolderPath =
						templaterSettings["template_folder"];

					log.logMessage("Migrated template folder path to Templaters setting.");
				}
			}
		} catch (error) {
			log.logError("Failed to migrate template folder path.");

			throw error;
		}
	},
};
