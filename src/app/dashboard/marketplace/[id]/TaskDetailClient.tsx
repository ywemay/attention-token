"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const DUMMY_TASKS: Record<
  string,
  {
    id: string;
    task_type: string;
    creator: string;
    channel_url: string;
    reward_amount: number;
    instructions: string;
    platform: string;
  }
> = {
  "1": {
    id: "1",
    task_type: "subscribe",
    creator: "TechWithAlex",
    channel_url: "https://youtube.com/@TechWithAlex",
    reward_amount: 3,
    instructions: "Subscribe to TechWithAlex and hit the bell icon.",
    platform: "youtube",
  },
  "2": {
    id: "2",
    task_type: "comment",
    creator: "ArtByMia",
    channel_url: "https://youtube.com/@ArtByMia",
    reward_amount: 5,
    instructions:
      "Watch the latest video and leave a thoughtful comment about the painting technique.",
    platform: "youtube",
  },
  "3": {
    id: "3",
    task_type: "blog_post",
    creator: "DevJourney",
    channel_url: "https://youtube.com/@DevJourney",
    reward_amount: 8,
    instructions:
      "Write a 300-word blog post reviewing the channel's tutorial series. Post it on your blog and share the link.",
    platform: "youtube",
  },
  "4": {
    id: "4",
    task_type: "subscribe",
    creator: "GameReacts",
    channel_url: "https://twitch.tv/gamereacts",
    reward_amount: 2,
    instructions: "Follow GameReacts on Twitch.",
    platform: "twitch",
  },
  "5": {
    id: "5",
    task_type: "comment",
    creator: "CodeWithSara",
    channel_url: "https://youtube.com/@CodeWithSara",
    reward_amount: 4,
    instructions:
      "Comment on the React hooks tutorial. Share your own experience with useState.",
    platform: "youtube",
  },
  "6": {
    id: "6",
    task_type: "blog_post",
    creator: "FitnessFiona",
    channel_url: "https://instagram.com/fitnessfiona",
    reward_amount: 10,
    instructions:
      "Write a blog post summarizing Fiona's 30-day fitness challenge. Include your results if you tried it.",
    platform: "instagram",
  },
};

const TASK_META: Record<
  string,
  { label: string; icon: string; bg: string; text: string; darkBg: string; darkText: string }
> = {
  subscribe: {
    label: "Subscribe",
    icon: "🔔",
    bg: "bg-blue-50",
    text: "text-blue-700",
    darkBg: "dark:bg-blue-950/40",
    darkText: "dark:text-blue-300",
  },
  comment: {
    label: "Comment",
    icon: "💬",
    bg: "bg-purple-50",
    text: "text-purple-700",
    darkBg: "dark:bg-purple-950/40",
    darkText: "dark:text-purple-300",
  },
  blog_post: {
    label: "Blog Post",
    icon: "✍️",
    bg: "bg-orange-50",
    text: "text-orange-700",
    darkBg: "dark:bg-orange-950/40",
    darkText: "dark:text-orange-300",
  },
};

export default function TaskDetailClient({
  taskId,
}: {
  taskId: string;
}) {
  const router = useRouter();
  const task = DUMMY_TASKS[taskId];
  const [proofUrl, setProofUrl] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!task) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="text-center">
          <p className="text-gray-400 dark:text-zinc-500">Task not found</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            ← Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const meta = TASK_META[task.task_type];

  const handleSubmit = () => {
    if (task.task_type === "subscribe") {
      if (!confirmed) return;
    } else {
      if (!proofUrl.trim()) return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="text-4xl">✅</div>
          <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-zinc-100">
            Submitted!
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
            Your submission is pending review. You&apos;ll receive{" "}
            <span className="font-bold text-yellow-700 dark:text-yellow-400">
              {task.reward_amount} ATTN
            </span>{" "}
            once approved.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-6 rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            ← Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm text-gray-400 hover:text-gray-600 dark:text-zinc-500 dark:hover:text-zinc-300"
      >
        ← Back
      </button>

      <div className="mx-auto max-w-2xl">
        {/* Task header */}
        <div className="mb-8">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${meta.bg} ${meta.text} ${meta.darkBg} ${meta.darkText}`}
          >
            {meta.icon} {meta.label}
          </span>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-zinc-100">
            {task.creator}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
            {task.platform}
          </p>
        </div>

        {/* Instructions card */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-zinc-300">
            Instructions
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">
            {task.instructions}
          </p>

          <a
            href={task.channel_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            🔗 Visit Channel
          </a>
        </div>

        {/* Reward */}
        <div className="mt-6 rounded-xl border border-gray-200 p-5 text-center dark:border-zinc-800">
          <p className="text-sm text-gray-500 dark:text-zinc-400">Reward</p>
          <p className="mt-1 text-3xl font-extrabold text-yellow-700 dark:text-yellow-400">
            {task.reward_amount} ATTN
          </p>
        </div>

        {/* Proof submission */}
        <div className="mt-8 rounded-xl border border-gray-200 p-6 dark:border-zinc-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-zinc-100">
            Submit Proof
          </h2>

          {task.task_type === "subscribe" ? (
            <div className="mt-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 dark:border-zinc-600 dark:bg-zinc-800"
                />
                <span className="text-sm text-gray-600 dark:text-zinc-400">
                  I confirm that I have subscribed to{" "}
                  <strong className="text-gray-900 dark:text-zinc-200">
                    {task.creator}
                  </strong>
                  {"'"}s channel.
                </span>
              </label>
            </div>
          ) : (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300">
                {task.task_type === "comment"
                  ? "Paste the URL to your comment"
                  : "Paste the URL to your blog post"}
              </label>
              <input
                type="url"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                placeholder="https://..."
                className="mt-1.5 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-0 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-zinc-500"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={
              task.task_type !== "subscribe" && !proofUrl.trim()
            }
            className="mt-5 w-full rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:disabled:bg-zinc-700 dark:disabled:text-zinc-500"
          >
            Submit & Earn {task.reward_amount} ATTN
          </button>
        </div>
      </div>
    </div>
  );
}
