import { prisma } from "@/app/utils/db";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogPost } from "@/components/general/BlogPost";

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
  });
  return data;
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          AlgoScripts
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
          Share and explore beautifully crafted DSA notes and coding scripts.
        </p>
        <div className="flex gap-4">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg shadow-md hover:bg-gray-900 transition"
          >
            Get Started
          </a>
          <a
            href="#features"
            className="px-6 py-3 border border-gray-400 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why AlgoScripts?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-tr from-white to-slate-50 hover:from-pink-50 hover:to-purple-100"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Notes Section */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Latest Scripts</h2>
        <Suspense fallback={<BlogPostsGrid />}>
          <BlogPostCard />
        </Suspense>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        Built with ❤️ using Next.js & TailwindCSS — AlgoScripts © 2025
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Curated DSA Notes",
    description: "Clean, categorized notes from top problem solvers.",
  },
  {
    title: "Code Snippet Sharing",
    description: "Upload and share syntax-highlighted snippets with versions.",
  },
  {
    title: "Personal Dashboards",
    description: "Track topics, bookmark notes, and stay organized.",
  },
];

// ✨ BlogPostCard component (Async)
async function BlogPostCard() {
  const data = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {data.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border bg-white shadow-md hover:shadow-xl hover:bg-gradient-to-br hover:from-indigo-100 hover:via-pink-100 hover:to-purple-100 transition duration-300 overflow-hidden"
        >
          <BlogPost data={item} />
        </div>
      ))}
    </div>
  );
}

// ✨ BlogPostsGrid loader skeleton
function BlogPostsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="rounded-lg border bg-white text-card-foreground shadow-sm h-[400px] flex flex-col overflow-hidden animate-pulse"
          key={index}
        >
          {/* Image skeleton */}
          <Skeleton className="h-48 w-full rounded-none" />

          <div className="p-4 flex-1 flex flex-col gap-3">
            {/* Title skeleton */}
            <Skeleton className="h-6 w-3/4" />

            {/* Content skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Footer skeleton */}
            <div className="mt-auto flex items-center justify-between pt-4">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
