PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cookbooks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`previewImg` text NOT NULL,
	`satisfaction` integer NOT NULL,
	`difficulty` integer NOT NULL,
	`consuming` text NOT NULL,
	`categories` text NOT NULL,
	`deleted` integer DEFAULT false,
	`cookingDate` text NOT NULL,
	`created` text DEFAULT (CURRENT_DATE),
	`updated` text DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
INSERT INTO `__new_cookbooks`("id", "title", "content", "previewImg", "satisfaction", "difficulty", "consuming", "categories", "deleted", "cookingDate", "created", "updated") SELECT "id", "title", "content", "previewImg", "satisfaction", "difficulty", "consuming", "categories", "deleted", "cookingDate", "created", "updated" FROM `cookbooks`;--> statement-breakpoint
DROP TABLE `cookbooks`;--> statement-breakpoint
ALTER TABLE `__new_cookbooks` RENAME TO `cookbooks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;