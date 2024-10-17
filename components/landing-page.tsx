"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, ChevronDown, ChevronUp, Star } from "lucide-react";
import Features from "@/components/component/features-list";
export default function LandingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) =>
    setOpenFAQ(openFAQ === index ? null : index);

  const clientLogos = [
    { name: "Company 1", src: "yourlogo-IwLN6Qx9.png" },
    { name: "Company 2", src: "yourlogo-IwLN6Qx9.png" },
    { name: "Company 3", src: "yourlogo-IwLN6Qx9.png" },
    { name: "Company 4", src: "yourlogo-IwLN6Qx9.png" },
    { name: "Company 5", src: "yourlogo-IwLN6Qx9.png" },
    { name: "Company 6", src: "yourlogo-IwLN6Qx9.png" },
  ];

  const pricingPlans = [
    {
      name: "Basic",
      description: "Mobile proxy, unlimited browsing, AI suggestions",
      price: "$1",
      period: "/day",
      features: [
        "Access to mobile proxy with no cost",
        "Unlimited browsing for casual users",
        "AI-powered suggestions based on your network usage",
      ],
      color: "bg-gray-100",
    },
    {
      name: "Premium",
      description: "High-speed proxy, advanced analytics, priority support",
      price: "$9.99",
      period: "/week",
      features: [
        "High-speed mobile proxies for fast and secure browsing",
        "Advanced analytics dashboard to monitor proxy usage",
        "Priority support to handle any issues quickly",
      ],
      color: "bg-blue-600",
    },
    {
      name: "Enterprise",
      description: "Custom proxies, dedicated support, unlimited data",
      price: "$30",
      period: "/month",
      features: [
        "Custom mobile proxy setup tailored for your business",
        "Dedicated account manager for personalized support",
        "Unlimited data usage with advanced analytics and reporting",
      ],
      color: "bg-gray-100",
    },
  ];

  const testimonials = [
    {
      content:
        "Using this mobile proxy service was a game-changer for our business. Fast, reliable, and easy to use. It's allowed us to scale our operations without any speed drops or interruptions. Couldn't ask for better performance!",
      author: "Emily Johnson",
      position: "CEO, Streamline Ventures",
      rating: 5,
    },
    {
      content:
        "The mobile proxies provided excellent speeds for all our ad verification tasks. We never faced any downtime, and the customer support was quick and helpful. Definitely recommend for businesses needing a solid proxy solution!",
      author: "Michael Lee",
      position: "Marketing Manager, AdSavvy",
      rating: 5,
    },
    {
      content:
        "As a data analyst, I rely on consistent, secure proxies, and this service delivered beyond my expectations. The mobile proxies are fast, and the dashboard is super intuitive. It made my job so much easier!",
      author: "Sophia Davis",
      position: "Owner, DataPulse Analytics",
      rating: 5,
    },
    {
      content:
        "This mobile proxy service has been the backbone of our network testing. The reliability and speed are unmatched, and the custom proxy options have been perfect for our enterprise-level needs. Highly recommend for any tech-driven business!",
      author: "David Wilson",
      position: "CTO, NetSolutions Inc.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "What exactly are mobile proxies?",
      answer:
        "Mobile proxies are specialized proxies that utilize IP addresses assigned by mobile ISPs (Internet Service Providers). They route your internet traffic through mobile networks, such as 3G, 4G, or 5G. These proxies enhance anonymity, as mobile IPs are shared among numerous users and change frequently, making them less susceptible to being flagged or blocked by websites compared to traditional static IP proxies.",
    },
    {
      question: "What advantages do mobile proxies offer?",
      answer:
        "Mobile proxies provide a host of benefits, including heightened anonymity, enhanced online security, and privacy protection. With PowerProxies mobile proxies, you can easily bypass geo-restrictions, accessing content from various locations without hassle.",
    },
    {
      question: "Why is there a surge in proxy usage?",
      answer:
        "Mobile proxies are gaining popularity because they use real IPv6/IPv4 addresses from actual mobile devices (smartphones and tablets) to route traffic. This makes them highly effective at evading sophisticated bot-blocking methods. You can scrape public data seamlessly without interruptions from CAPTCHAs or other verification processes. Plus, you can test all PowerProxies features for just $1.99 before committing to a paid plan.",
    },
    {
      question: "What can I accomplish with mobile proxy servers?",
      answer:
        "Mobile proxies are versatile tools, commonly used for social media management, ad verification, web scraping, and bypassing geo-restrictions. They also allow you to conduct market research by gathering high-quality data from different regions, comparing prices across various e-commerce sites, and ensuring your ads appear correctly.",
    },
    {
      question: "How do 3G, 4G, 5G, and LTE proxies differ?",
      answer:
        "3G proxies operate on the third generation of mobile telecommunications, providing moderate speeds but less commonly used today. 4G proxies deliver faster speeds and improved reliability, while 5G proxies, the latest technology, offer significantly higher speeds and lower latency for high-bandwidth applications. LTE proxies, often associated with 4G, deliver better performance than 3G but may not always meet the full 4G standards. Each proxy type varies in speed and connectivity, with newer generations typically outperforming the previous ones.",
    },
    {
      question: "How extensive is PowerProxies' global proxy network?",
      answer:
        "PowerProxies boasts a comprehensive global proxy network with access to over 195 countries. Our top locations include the USA, UK, Germany, Brazil, Canada, Indonesia, Russia, India, Ukraine, and Australia. When using PowerProxies mobile proxies, you can select specific locations down to the country or city level. Please note, however, that due to regulatory complexities, we currently do not offer proxy servers within the State of Texas.",
    },
    {
      question: "Can you explain your IP rotation system?",
      answer:
        "Our IP rotation system offers three modes to suit your needs: \n\n1. **Same IP up to Rotation**: Use the same IP for a set duration, provided it stays online. If it goes offline, a new IP is automatically assigned. \n2. **Hold IP if Connection Lost (Sticky IP)**: This feature allows you to maintain your IP for a designated time, even if you briefly lose connection, ensuring continuity. \n3. **Rotating - New IP on Each Request**: Get a new IP for every request you make, ensuring high anonymity and security with each new website or page accessed.",
    },
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeInUpVariants}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen ">
      <div className="bg-gradient-to-br from-blue-900 via-blue-700 to-teal-500">
        <header className="container mx-auto  px-4 py-16 md:py-32">
          <div className="pt-6 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Unlock the Internet with Fast & Secure Mobile Proxies
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Scrape public data without interruptions from CAPTCHAs or
                blocks, manage multiple social media accounts, and verify ads
                with fast and reliable mobile proxies.
              </p>
              <ul className="text-white space-y-2 mb-8">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-teal-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  99.55% proxy success rate
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-teal-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  195+ countries included with city and carrier-level targeting
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-teal-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  3G, 4G, 5G and LTE coverage available
                </li>
              </ul>
              <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Get Started
              </button>
            </div>
            <div className="md:w-1/2">
              <SectionWrapper>
                <Image
                  src="/5g-proxy-DWArAP9q.png"
                  alt="Mobile Proxies Illustration"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </SectionWrapper>
            </div>
          </div>
        </header>
      </div>
      <SectionWrapper>
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Trusted by Industry Leaders
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {clientLogos.map((client, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={"/yourlogo-IwLN6Qx9.png"}
                    alt={client.name}
                    width={120}
                    height={60}
                    className="max-w-full h-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <Features />

      <SectionWrapper>
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Pricing Plans
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Choose the perfect plan for your needs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-lg shadow-lg overflow-hidden ${
                    plan.color
                  } ${plan.name === "Premium" ? "transform scale-105" : ""}`}
                >
                  <div className="p-6">
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        plan.name === "Premium" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mb-4 ${
                        plan.name === "Premium"
                          ? "text-gray-200"
                          : "text-gray-600"
                      }`}
                    >
                      {plan.description}
                    </p>
                    <div
                      className={`text-4xl font-bold mb-4 ${
                        plan.name === "Premium" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {plan.price}
                      <span
                        className={`text-xl ${
                          plan.name === "Premium"
                            ? "text-gray-200"
                            : "text-gray-600"
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>
                    <ul className="mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center mb-2"
                        >
                          <Check
                            className={`w-5 h-5 mr-2 ${
                              plan.name === "Premium"
                                ? "text-teal-300"
                                : "text-green-500"
                            }`}
                          />
                          <span
                            className={
                              plan.name === "Premium"
                                ? "text-white"
                                : "text-gray-700"
                            }
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full font-bold py-2 px-4 rounded transition-colors ${
                        plan.name === "Premium"
                          ? "bg-white text-blue-600 hover:bg-gray-100"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      Get started
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <SectionWrapper>
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">
              Testimonials
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              What our clients say about us
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <p className="text-gray-700 mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Image
                        src="/client-0-vcjg0fIb.jpg"
                        alt={testimonial.author}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                  <div className="flex mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionWrapper>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Find answers to common questions about our mobile proxies
          </p>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-4"
              >
                <button
                  className="flex justify-between items-center w-full text-left font-bold text-lg p-4 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-4 bg-white"
                    >
                      <p className="text-gray-700">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}