-- CreateTable
CREATE TABLE "_user_follows" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_follows_AB_unique" ON "_user_follows"("A", "B");

-- CreateIndex
CREATE INDEX "_user_follows_B_index" ON "_user_follows"("B");

-- AddForeignKey
ALTER TABLE "_user_follows" ADD FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_follows" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
