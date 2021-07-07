/*
  Warnings:

  - You are about to drop the `_ArticleToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToTag" DROP CONSTRAINT "_ArticleToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToTag" DROP CONSTRAINT "_ArticleToTag_B_fkey";

-- DropTable
DROP TABLE "_ArticleToTag";

-- CreateTable
CREATE TABLE "_article_tags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_article_tags_AB_unique" ON "_article_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_article_tags_B_index" ON "_article_tags"("B");

-- AddForeignKey
ALTER TABLE "_article_tags" ADD FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_article_tags" ADD FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
