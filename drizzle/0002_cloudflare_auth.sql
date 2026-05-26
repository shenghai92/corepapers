ALTER TABLE `users`
	ADD `passwordHash` varchar(255),
	ADD `passwordSalt` varchar(255);

