const DUMMY_GIGS = [
  {
    id: "1",
    title: "Design a Landing Page",
    description: "Need a modern, responsive landing page for a SaaS product. Figma preferred.",
    price: 5,
    seller: "PixelWizard",
    tags: ["design", "figma", "landing"],
  },
  {
    id: "2",
    title: "Write Product Description Copy",
    description: "SEO-optimized product descriptions for 10 e-commerce items. 300 words each.",
    price: 3,
    seller: "CopyNinja",
    tags: ["writing", "seo", "ecommerce"],
  },
  {
    id: "3",
    title: "Build a Discord Bot",
    description: "Simple moderation bot with welcome messages, auto-role, and purge commands.",
    price: 8,
    seller: "CodeMancer",
    tags: ["python", "discord", "bot"],
  },
  {
    id: "4",
    title: "Logo Design Pack",
    description: "3 logo concepts with 2 rounds of revisions. Vector files included.",
    price: 6,
    seller: "Graphica",
    tags: ["logo", "vector", "branding"],
  },
  {
    id: "5",
    title: "Transcribe 30min Interview",
    description: "Clean verbatim transcript of an English interview. Timestamps included.",
    price: 4,
    seller: "TranscriptPro",
    tags: ["transcription", "english"],
  },
  {
    id: "6",
    title: "Fix Mobile CSS Bugs",
    description: "Responsive fixes for a Next.js site. Currently broken on Safari iOS.",
    price: 7,
    seller: "CSSurgeon",
    tags: ["css", "nextjs", "mobile"],
  },
];

export default function MarketplaceFeed() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse tasks posted by the community. Pay with ATTENTION tokens.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DUMMY_GIGS.map((gig) => (
          <div
            key={gig.id}
            className="group flex flex-col rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold leading-snug text-gray-900">
                  {gig.title}
                </h3>
                <span className="ml-2 shrink-0 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-bold text-yellow-700">
                  {gig.price} ATTN
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">
                {gig.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {gig.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <span className="text-xs text-gray-400">by {gig.seller}</span>
              <button className="rounded-lg bg-black px-3 py-1.5 text-xs font-medium text-white transition hover:bg-gray-800">
                Buy Token
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
