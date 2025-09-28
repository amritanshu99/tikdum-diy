import { motion } from "framer-motion";

export default function Buy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-black/10 bg-white shadow-sm p-8 text-center"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Buy Online</h1>
        <p className="text-black/70">
          We are painting — buy online functionality coming soon.
        </p>
      </motion.div>
    </main>
  );
}
