CREATE TABLE `comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`message` text NOT NULL,
	`createdAt` text DEFAULT (CURRENT_DATE),
	`cookbook_id` integer
);
--> statement-breakpoint
DROP TABLE `comment`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cookbooks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`preview` text NOT NULL,
	`satisfaction` integer NOT NULL,
	`difficulty` integer NOT NULL,
	`consuming` text NOT NULL,
	`categories` text NOT NULL,
	`deleted` integer DEFAULT false,
	`cooking` text NOT NULL,
	`created` text DEFAULT (CURRENT_DATE),
	`updated` text DEFAULT (CURRENT_DATE)
);
--> statement-breakpoint
INSERT INTO `__new_cookbooks`("id", "title", "content", "preview", "satisfaction", "difficulty", "consuming", "categories", "deleted", "cooking", "created", "updated") SELECT "id", "title", "content", "preview", "satisfaction", "difficulty", "consuming", "categories", "deleted", "cooking", "created", "updated" FROM `cookbooks`;--> statement-breakpoint
DROP TABLE `cookbooks`;--> statement-breakpoint
ALTER TABLE `__new_cookbooks` RENAME TO `cookbooks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;