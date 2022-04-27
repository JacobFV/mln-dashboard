-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "needsVerification" BOOLEAN NOT NULL DEFAULT true,
    "verificationCode" TEXT,
    "verificationCodeSentOn" DATETIME,
    "userId" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ip" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "headers" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "LoginAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroupMembership" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "groupId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "joinedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GroupMembership_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GroupMembership_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Entity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL DEFAULT 'user',
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" DATETIME,
    "pswHash" TEXT,
    "ownerId" TEXT,
    CONSTRAINT "Entity_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Entity" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExplicitPermission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "appliesToEntityId" TEXT NOT NULL,
    "permissionLevel" TEXT NOT NULL,
    "createdOn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "ExplicitPermission_appliesToEntityId_fkey" FOREIGN KEY ("appliesToEntityId") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ExplicitPermission_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Entity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_email_key" ON "Email"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Entity_name_key" ON "Entity"("name");
