"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui"

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-100 to-transparent dark:from-neutral-900" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.1] }}
        className="text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-4 text-sm font-medium text-neutral-500 dark:text-neutral-400"
        >
          Full Stack Engineer & Cybersecurity Analyst
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Building secure,
          <br />
          <span className="text-neutral-400">scalable software</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-500 dark:text-neutral-400"
        >
          I craft production-ready applications with modern architectures,
          focusing on security, performance, and exceptional user experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <Button size="lg" asChild>
            <a href="/projects">View Projects</a>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <a href="/resume">Resume</a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8"
      >
        <ArrowDown className="h-5 w-5 animate-bounce text-neutral-400" />
      </motion.div>
    </section>
  )
}
