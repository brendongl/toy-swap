/**
 * Landing Page - ToySwap Homepage
 */

import Link from 'next/link';
import { Button } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-3xl">🔄</span>
              <span className="text-2xl font-bold text-gray-900">ToySwap</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-blue-700 font-medium text-sm">
              🎯 Tinder for Toys
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Swipe. Match. Swap.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The app that helps parents exchange toys locally, for free.
            <br />
            No money. No haggling. Just simple swaps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Swapping Now
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 p-8 shadow-xl">
          <div className="aspect-video bg-white rounded-xl flex items-center justify-center">
            <div className="text-center text-gray-400">
              <p className="text-lg">App Screenshot / Demo</p>
              <p className="text-sm">(Swipe interface preview)</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">
              Simple, fast, and fun - just like swiping
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                emoji: '📸',
                title: 'List Your Toys',
                description:
                  'Take photos of toys your kids have outgrown. Add details and mark them available for swap.',
              },
              {
                step: '2',
                emoji: '👆',
                title: 'Swipe & Match',
                description:
                  "Browse toys from other parents nearby. Swipe right on toys your kid would love. When it's mutual, you match!",
              },
              {
                step: '3',
                emoji: '🤝',
                title: 'Meet & Swap',
                description:
                  'Pick which toys to exchange, chat to arrange a meetup, and complete the swap at a public location.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="absolute -top-4 left-8 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Parents Love ToySwap
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                emoji: '💰',
                title: 'Save Money',
                description:
                  "Stop buying new toys every month. Swap instead and give toys a second life in another kid's hands.",
              },
              {
                emoji: '🌍',
                title: 'Reduce Waste',
                description:
                  'Keep toys out of landfills. Sustainable parenting made easy.',
              },
              {
                emoji: '👪',
                title: 'Local Community',
                description:
                  'Meet other parents in your neighborhood. Build connections while swapping.',
              },
              {
                emoji: '✨',
                title: 'No Pricing Hassle',
                description:
                  'No need to calculate toy values or negotiate prices. Just swap based on what you want.',
              },
              {
                emoji: '🔒',
                title: 'Safe & Trusted',
                description:
                  'Trust scores, verified profiles, and public meetup suggestions keep everyone safe.',
              },
              {
                emoji: '⚡',
                title: 'Super Fast',
                description:
                  'Swipe through toys in seconds. Match instantly. Swap within days.',
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center p-6">
                <div className="text-5xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Swapping?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join parents in District 2, HCMC who are already swapping toys
          </p>
          <Link href="/auth/signup">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-12"
            >
              Create Free Account
            </Button>
          </Link>
          <p className="text-blue-100 mt-4 text-sm">
            No credit card required. Start swapping in minutes.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🔄</span>
                <span className="text-xl font-bold text-white">ToySwap</span>
              </div>
              <p className="text-sm">
                Making toy exchange simple, safe, and sustainable for parents.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#how-it-works" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>&copy; 2025 ToySwap. All rights reserved.</p>
            <p className="mt-2 text-gray-500">
              Made with ❤️ for parents in District 2, HCMC
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
