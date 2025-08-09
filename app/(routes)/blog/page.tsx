"use client";

import { cn } from "@/app/lib/cn";
import { useState } from "react";
// import { Calendar, ArrowRight, User, Clock, Search } from 'lucide-react'

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "From ServiceNow to React: A Developer's Journey",
    excerpt:
      "How transitioning from IT support to frontend development taught me the importance of user experience and the power of modern JavaScript frameworks.",
    date: "December 15, 2024",
    readTime: "8 min read",
    author: "Developer",
    category: "Career",
    slug: "servicenow-to-react-journey",
  },
  {
    id: "2",
    title: "Building Performant UIs with React and TypeScript",
    excerpt:
      "Best practices for creating fast, scalable user interfaces using React hooks, TypeScript, and modern build tools. Performance optimization techniques that actually work.",
    date: "December 10, 2024",
    readTime: "12 min read",
    author: "Developer",
    category: "Technical",
    slug: "performant-react-typescript-uis",
  },
  {
    id: "3",
    title: "The Art of Component Design: Lessons from the Trenches",
    excerpt:
      "What I learned building reusable components that developers actually want to use. From API design to documentation, here's what makes components stick.",
    date: "December 5, 2024",
    readTime: "10 min read",
    author: "Developer",
    category: "Design",
    slug: "component-design-lessons",
  },
  {
    id: "4",
    title: "Debugging Like a Detective: Advanced React Troubleshooting",
    excerpt:
      "Advanced debugging techniques for React applications. From React DevTools to performance profiling, learn how to solve the trickiest bugs.",
    date: "November 28, 2024",
    readTime: "15 min read",
    author: "Developer",
    category: "Technical",
    slug: "advanced-react-debugging",
  },
  {
    id: "5",
    title: "Why I Chose Next.js for My Portfolio (And You Should Too)",
    excerpt:
      "A deep dive into Next.js features that make it perfect for modern web development. Server-side rendering, API routes, and deployment made simple.",
    date: "November 20, 2024",
    readTime: "7 min read",
    author: "Developer",
    category: "Framework",
    slug: "why-nextjs-portfolio",
  },
  {
    id: "6",
    title: "State Management in 2024: Redux vs Zustand vs Context",
    excerpt:
      "A comprehensive comparison of modern state management solutions. When to use each approach and why simplicity often wins.",
    date: "November 15, 2024",
    readTime: "11 min read",
    author: "Developer",
    category: "Technical",
    slug: "state-management-comparison-2024",
  },
  {
    id: "7",
    title: "CSS-in-JS vs Tailwind: The Great Styling Debate",
    excerpt:
      "Exploring the pros and cons of different styling approaches in modern React applications. Performance, developer experience, and maintainability compared.",
    date: "November 8, 2024",
    readTime: "9 min read",
    author: "Developer",
    category: "Design",
    slug: "css-in-js-vs-tailwind-debate",
  },
  {
    id: "8",
    title: "Building Accessible React Components That Everyone Can Use",
    excerpt:
      "A practical guide to creating inclusive user interfaces. ARIA attributes, keyboard navigation, and screen reader compatibility made simple.",
    date: "October 30, 2024",
    readTime: "13 min read",
    author: "Developer",
    category: "Technical",
    slug: "accessible-react-components-guide",
  },
];

const categories = ["All", "Career", "Technical", "Design", "Framework"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative w-full pt-32 pb-16 text-white">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        {/* <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Writing on software development,{" "}
            <span className="text-blue-600">component design</span>, and the{" "}
            <span className="text-cyan-600">developer experience</span>.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            All of my long-form thoughts on programming, leadership, product
            design, and more, collected in chronological order.
          </p>
        </div> */}

        {/* Search Bar */}
        {/* <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-gray-600">
            {filteredPosts.length} article
            {filteredPosts.length !== 1 ? "s" : ""} found
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory !== "All" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-12">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <article
                key={post.id}
                className="group cursor-pointer"
                onClick={() => console.log(`Navigate to /blog/${post.slug}`)}
              >
                <div className="mb-4 flex items-start space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    {/* <Calendar className="w-4 h-4" /> */}
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* <Clock className="w-4 h-4" /> */}
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {/* <User className="w-4 h-4" /> */}
                    <span>{post.author}</span>
                  </div>
                </div>

                <h2 className="mb-4 text-2xl font-bold text-white transition-colors group-hover:text-blue-600">
                  {post.title}
                </h2>

                <p className="mb-6 leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-block rounded-full px-3 py-1 text-xs font-medium",
                      post.category === "Career" &&
                        "bg-green-100 text-green-800",
                      post.category === "Technical" &&
                        "bg-blue-100 text-blue-800",
                      post.category === "Design" &&
                        "bg-purple-100 text-purple-800",
                      post.category === "Framework" &&
                        "bg-cyan-100 text-cyan-800",
                    )}
                  >
                    {post.category}
                  </span>

                  <div className="flex items-center space-x-2 text-cyan-600 transition-colors group-hover:text-cyan-700">
                    <span className="text-sm font-medium">Read article</span>
                    {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
                  </div>
                </div>

                {index < filteredPosts.length - 1 && (
                  <div className="mt-12 border-b border-gray-200"></div>
                )}
              </article>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg text-gray-500">
                No articles found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 font-medium text-blue-600 hover:text-blue-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredPosts.length > 0 && (
          <div className="mt-16 text-center">
            <button className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700">
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
