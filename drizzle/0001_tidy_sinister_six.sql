CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(512) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`category` varchar(64),
	`tags` json,
	`metaTitle` varchar(512),
	`metaDescription` text,
	`featuredImage` varchar(512),
	`readingTime` int DEFAULT 5,
	`published` boolean DEFAULT false,
	`publishedAt` timestamp,
	`authorId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `citation_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`format` enum('apa','mla','chicago','ieee') NOT NULL,
	`sourceType` varchar(64),
	`inputData` json,
	`outputCitation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `citation_history_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`stripeSubscriptionId` varchar(128),
	`plan` enum('free','student','pro') NOT NULL DEFAULT 'free',
	`billingCycle` enum('monthly','annual'),
	`status` enum('active','canceled','past_due','trialing','incomplete') NOT NULL DEFAULT 'active',
	`currentPeriodStart` timestamp,
	`currentPeriodEnd` timestamp,
	`cancelAtPeriodEnd` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `writing_sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) DEFAULT 'Untitled',
	`originalText` text,
	`polishedText` text,
	`discipline` enum('stem','social_science','humanities','general') DEFAULT 'general',
	`wordCount` int DEFAULT 0,
	`suggestions` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `writing_sessions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `preferredDiscipline` enum('stem','social_science','humanities','general') DEFAULT 'general';--> statement-breakpoint
ALTER TABLE `users` ADD `preferredLanguage` varchar(10) DEFAULT 'en';--> statement-breakpoint
ALTER TABLE `users` ADD `isEduVerified` boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE `users` ADD `stripeCustomerId` varchar(128);