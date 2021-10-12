-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "championId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    PRIMARY KEY ("id")
);


-- AddForeignKey
ALTER TABLE "Model" ADD FOREIGN KEY ("championId") REFERENCES "Champion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
