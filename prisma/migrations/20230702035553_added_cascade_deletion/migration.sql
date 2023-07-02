-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_JobSkill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "JobSkill_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "JobSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_JobSkill" ("createdAt", "id", "jobId", "skillId") SELECT "createdAt", "id", "jobId", "skillId" FROM "JobSkill";
DROP TABLE "JobSkill";
ALTER TABLE "new_JobSkill" RENAME TO "JobSkill";
CREATE TABLE "new_AppliedUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AppliedUser_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AppliedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AppliedUser" ("createdAt", "id", "jobId", "userId") SELECT "createdAt", "id", "jobId", "userId" FROM "AppliedUser";
DROP TABLE "AppliedUser";
ALTER TABLE "new_AppliedUser" RENAME TO "AppliedUser";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
