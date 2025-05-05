// scripts/deleteInvalidPosts.ts
import { prisma } from "@/app/utils/db";// adjust import path

async function main() {
  const result = await prisma.blogPost.deleteMany({
    where: {
      imageUrl: {
        contains: "google.com", // or whatever is invalid
      },
    },
  });

  console.log(`${result.count} post(s) deleted.`);
}

main().catch(console.error);
