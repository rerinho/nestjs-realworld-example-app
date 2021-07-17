-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "favoritesCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "_user_favorite_articles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_favorite_articles_AB_unique" ON "_user_favorite_articles"("A", "B");

-- CreateIndex
CREATE INDEX "_user_favorite_articles_B_index" ON "_user_favorite_articles"("B");

-- AddForeignKey
ALTER TABLE "_user_favorite_articles" ADD FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_favorite_articles" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
