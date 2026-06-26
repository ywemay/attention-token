"use client";

import { useState } from "react";
import Link from "next/link";

const DUMMY_TASKS = [
  {
    id: "1",
    task_type: "subscribe",
    creator: "TechWithAlex",
    channel_url: "https://youtube.com/@TechWithAlex",
    reward_amount: 3,
    instructions: "Subscribe to TechWithAlex and hit the bell icon.",
    platform: "youtube",
  },
  {
    id: "2",
    task_type: "comment",
    creator: "ArtByMia",
    channel_url: "https://youtube.com/@ArtByMia",
    reward_amount: 5,
    instructions:
      "Watch the latest video and leave a thoughtful comment about the painting technique.",
    platform: "youtube",
  },
  {
    id: "3",
    task_type: "blog_post",
    creator: "DevJourney",
    channel_url: "https://youtube.com/@DevJourney",
    reward_amount: 8,
    instructions:
      "Write a 300-word blog post reviewing the channel's tutorial series. Post it on your blog and share the link.",
    platform: "youtube",
  },
  {
    id: "4",
    task_type: "subscribe",
    creator: "GameReacts",
    channel_url: "https://twitch.tv/gamereacts",
    reward_amount: 2,
    instructions: "Follow GameReacts on Twitch.",
    platform: "twitch",
  },
  {
    id: "5",
    task_type: "comment",
    creator: "CodeWithSara",
    channel_url: "https://youtube.com/@CodeWithSara",
    reward_amount: 4,
    instructions:
      "Comment on the React hooks tutorial. Share your own experience with useState.",
    platform: "youtube",
  },
  {
    id: "6",
    task_type: "blog_post",
    creator: "FitnessFiona",
    channel_url: "https://instagram.com/fitnessfiona",
    reward_amount: 10,
    instructions:
      "Write a blog post summarizing Fiona's 30-day fitness challenge. Include your results if you tried it.",
    platform: "instagram",
  },
];

const TASK_STYLES: Record<
  string,
  { label: string; icon: string; bg: string; text: string; dot: string; darkBg: string; darkText: string; darkDot: string }
> = {
  subscribe: {
    label: "Subscribe",
    icon: "🔔",
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    darkBg: "dark:bg-blue-950/40",
    darkText: "dark:text-blue-300",
    darkDot: "dark:bg-blue-400",
  },
  comment: {
    label: "Comment",
    icon: "💬",
    bg: "bg-purple-50",
    text: "text-purple-700",
    dot: "bg-purple-500",
    darkBg: "dark:bg-purple-950/40",
    darkText: "dark:text-purple-300",
    darkDot: "dark:bg-purple-400",
  },
  blog_post: {
    label: "Blog Post",
    icon: "✍️",
    bg: "bg-orange-50",
    text: "text-orange-700",
    dot: "bg-orange-500",
    darkBg: "dark:bg-orange-950/40",
    darkText: "dark:text-orange-300",
    darkDot: "dark:bg-orange-400",
  },
};

export default function MarketplaceFeed() {
  const [filter, setFilter] = useState("all");

  const filteredTasks =
    filter === "all"
      ? DUMMY_TASKS
      : DUMMY_TASKS.filter((t) => t.task_type === filter);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">
          Attention Marketplace
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
          Earn ATTN tokens by giving creators the attention they deserve.
        </p>
      </div>

      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {["all", "subscribe", "comment", "blog_post"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium transition ${
              filter === type
                ? "border-gray-900 bg-gray-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {type === "all"
              ? "All Tasks"
              : TASK_STYLES[type].icon + " " + TASK_STYLES[type].label}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-4">
        {filteredTasks.map((task) => {
          const s = TASK_STYLES[task.task_type];
          return (
            <div
              key={task.id}
              className="flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              {/* Task type badge */}
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${s.bg} ${s.darkBg}`}
              >
                {s.icon}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.bg} ${s.text} ${s.darkBg} ${s.darkText}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ${s.darkDot}`} />
                    {s.label}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-zinc-500">
                    {task.platform}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-gray-900 dark:text-zinc-200">
                  <span className="font-semibold">{task.creator}</span>
                  {" — "}
                  {task.instructions}
                </p>
              </div>

              {/* Reward + CTA */}
              <div className="shrink-0 text-right">
                <span className="inline-block rounded-full bg-yellow-50 px-3 py-1 text-sm font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                  {task.reward_amount} ATTN
                </span>
                <Link
                  href={`/dashboard/marketplace/${task.id}`}
                  className="mt-2 block w-full rounded-lg bg-black px-4 py-1.5 text-center text-xs font-medium text-white transition hover:bg-gray-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                >
                  Start Task
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
