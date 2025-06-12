"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, MessageSquare, Calendar, BarChart3, CheckCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <span className="text-xl font-bold text-primary">1Confirmed</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hidden items-center gap-4 md:flex">
              <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary">
                How It Works
              </Link>
              <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Pricing
              </Link>
            </div>
            <ThemeToggle />
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" className="hidden md:inline-flex">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="shadow-sm transition-all hover:shadow-md">
                  <span className="hidden md:inline-flex">Get Started</span>
                  <span className="md:hidden">Sign Up</span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.08),transparent_50%)]" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center"
            >
              <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                Connect with customers through{" "}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  WhatsApp Business API
                </span>
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Send automated messages, appointment reminders, and promotional alerts to engage your customers on their
                preferred messaging platform.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="gap-2 shadow-md transition-all hover:shadow-lg"
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="gap-2">
                    How It Works <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-16 flex justify-center"
            >
              <div className="relative rounded-lg border bg-card p-2 shadow-xl">
                <div className="overflow-hidden rounded-md bg-muted">
                  <img
                    src="/placeholder.svg?height=600&width=1200"
                    alt="Dashboard Preview"
                    className="aspect-[16/9] w-full max-w-[1000px] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-12 max-w-[800px] text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Powerful Features</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to connect with your customers through WhatsApp
              </p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  title: "Automated Messaging",
                  description:
                    "Schedule and send automated messages to your customers for birthdays, anniversaries, and special occasions.",
                  icon: <MessageSquare className="h-6 w-6" />,
                },
                {
                  title: "Appointment Reminders",
                  description: "Send timely reminders for upcoming appointments and follow up after services.",
                  icon: <Calendar className="h-6 w-6" />,
                },
                {
                  title: "Promotional Alerts",
                  description: "Notify customers about new promotions, events, and special offers in real-time.",
                  icon: <BarChart3 className="h-6 w-6" />,
                },
                {
                  title: "Message Templates",
                  description: "Create and save message templates for quick and consistent communication.",
                  icon: <MessageSquare className="h-6 w-6" />,
                },
                {
                  title: "Contact Management",
                  description: "Organize your contacts into groups for targeted messaging campaigns.",
                  icon: <Calendar className="h-6 w-6" />,
                },
                {
                  title: "Analytics Dashboard",
                  description: "Track message delivery, open rates, and customer engagement with detailed analytics.",
                  icon: <BarChart3 className="h-6 w-6" />,
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="how-it-works" className="bg-muted/50 py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-12 max-w-[800px] text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get started with our WhatsApp Business Platform in just a few simple steps
              </p>
            </motion.div>

            <div className="relative mx-auto max-w-5xl">
              <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border md:block" />
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="relative space-y-12 md:space-y-24"
              >
                {[
                  {
                    step: "01",
                    title: "Sign Up",
                    description: "Create your account and connect your WhatsApp Business API",
                  },
                  {
                    step: "02",
                    title: "Import Contacts",
                    description: "Add your customer contacts or import them from your CRM",
                  },
                  {
                    step: "03",
                    title: "Create Templates",
                    description: "Design message templates for different scenarios",
                  },
                  {
                    step: "04",
                    title: "Start Messaging",
                    description: "Send individual messages or launch automated campaigns",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className={`relative flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-8`}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-background text-xl font-bold shadow-sm md:absolute md:left-1/2 md:z-10 md:-translate-x-1/2">
                      {step.step}
                    </div>
                    <div
                      className={`w-full rounded-xl border bg-card p-6 shadow-sm md:w-[calc(50%-2rem)] ${
                        index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-12 max-w-[800px] text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Simple, Transparent Pricing</h2>
              <p className="mt-4 text-lg text-muted-foreground">Choose the plan that's right for your business</p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3"
            >
              {[
                {
                  name: "Starter",
                  price: "$29",
                  description: "Perfect for small businesses just getting started with WhatsApp",
                  features: [
                    "500 messages per month",
                    "Basic message templates",
                    "Contact management",
                    "Email support",
                  ],
                  cta: "Get Started",
                  popular: false,
                },
                {
                  name: "Professional",
                  price: "$79",
                  description: "Ideal for growing businesses with regular customer communication",
                  features: [
                    "2,000 messages per month",
                    "Advanced message templates",
                    "Automated campaigns",
                    "Basic analytics",
                    "Priority support",
                  ],
                  cta: "Get Started",
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "$199",
                  description: "For businesses with high-volume messaging needs",
                  features: [
                    "10,000 messages per month",
                    "Custom message templates",
                    "Advanced automation",
                    "Detailed analytics",
                    "Dedicated account manager",
                    "API access",
                  ],
                  cta: "Contact Sales",
                  popular: false,
                },
              ].map((plan, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className={`relative rounded-xl border ${
                    plan.popular ? "border-primary bg-primary/5 shadow-md dark:bg-primary/10" : "bg-card shadow-sm"
                  } p-6 transition-all hover:shadow-md`}
                  whileHover={{ y: -5 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-2 flex items-baseline">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="ml-1 text-muted-foreground">/month</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "" : "bg-primary/90 hover:bg-primary"}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container">
            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-md"
              >
                <h2 className="text-3xl font-bold">Ready to get started?</h2>
                <p className="mt-4">
                  Join thousands of businesses using our WhatsApp Business Platform to connect with their customers.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="gap-2 shadow-md transition-all hover:shadow-lg"
                    >
                      Sign Up Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">1Confirmed</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Connect with your customers through WhatsApp Business API. Send automated messages, appointment
                reminders, and promotional alerts.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">© 2025 1Confirmed. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">GitHub</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
