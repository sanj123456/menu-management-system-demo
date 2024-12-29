-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "parent_id" INTEGER,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
