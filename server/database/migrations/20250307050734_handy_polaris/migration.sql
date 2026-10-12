CREATE TABLE `comment` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`message` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cookbooks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`preview` text NOT NULL,
	`satisfaction` integer NOT NULL,
	`difficulty` integer NOT NULL,
	`consuming` text NOT NULL,
	`categories` text NOT NULL,
	`comments` text NOT NULL,
	`deleted` text NOT NULL,
	`cooking` text NOT NULL,
	`created` text NOT NULL,
	`updated` text DEFAULT (CURRENT_DATE)
);
