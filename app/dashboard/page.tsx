// app/dashboard/page.tsx

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogPost } from "@/components/general/BlogPost";

async function getData(userId: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function DashBoardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Check if user is available and handle the case when not found
  if (!user || !user.id) {
    // You can redirect or show a message if user is not found
    return <div>You are not logged in or user data is missing.</div>;
  }

  // Now it's safe to access user.id
  const data = await getData(user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link className={buttonVariants()} href={"/dashboard/create"}>
          create posts
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <BlogPost data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
