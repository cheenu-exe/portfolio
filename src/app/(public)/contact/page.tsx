import { ContactForm } from "./contact-form"

export const metadata = {
  title: "Contact",
  description: "Get in touch",
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Get in touch
        </h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Have a question or want to work together? Send me a message.
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
