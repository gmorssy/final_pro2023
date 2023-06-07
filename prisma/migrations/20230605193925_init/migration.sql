-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "session" TEXT NOT NULL
);
INSERT INTO "User" ("email", "id") SELECT "email", "id" FROM "User";
ALTER TABLE "User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_salt_key" ON "User"("salt");
CREATE UNIQUE INDEX "User_hash_key" ON "User"("hash");
CREATE UNIQUE INDEX "User_session_key" ON "User"("session");
