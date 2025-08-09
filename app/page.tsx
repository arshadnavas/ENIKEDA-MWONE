"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Users, MessageCircle, Star } from "lucide-react"

const funnyQuotes = [
  "No therapy can save you from us!",
  "Mental health? What's that supposed to mean?",
  "Doctor said something... but I wasn't listening!",
  "Need therapy? Or comedy? Get both together!",
  "Psychological wellness... is that even a real thing?",
]

export default function HomePage() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % funnyQuotes.length)
    }, 3000)

    const timer = setTimeout(() => {
      setShowButton(true)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Minimal background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Header Section */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4"> മല്ലു Therapist</h1>

            <p className="text-xl md:text-2xl text-gray-400 font-light">Professional Challi Therapy Services</p>

            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>5 Expert Therapists</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>AI-Powered Chat</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>100% Comedy Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Quote Card */}
          <Card className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
            <div className="text-2xl md:text-3xl font-semibold text-white mb-6 min-h-[80px] flex items-center justify-center">
              <span className="text-gray-200">"{funnyQuotes[currentQuote]}"</span>
            </div>

            <div className="flex justify-center space-x-2 mb-8">
              {funnyQuotes.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentQuote ? "bg-white scale-125" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            {showButton && (
              <div className="animate-bounce">
                <Link href="/therapists">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200 px-12 py-6 text-xl font-semibold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105"
                  >
                    Start Your Therapy 
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white">Unique Characters</h3>
                <p className="text-gray-400 text-sm">
                  Each therapist has their own hilarious personality from Malayalam comedy movies
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white">AI-Powered Chat</h3>
                <p className="text-gray-400 text-sm">
                  Real-time conversations with intelligent responses in authentic Manglish
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white">Comedy Therapy</h3>
                <p className="text-gray-400 text-sm">
                  Laugh your problems away with our unconventional therapy methods
                </p>
              </div>
            </Card>
          </div>

          {/* Disclaimer */}
          <div className="text-sm text-gray-600 opacity-75 max-w-2xl mx-auto">
            <p>
              * Warning: Side effects may include uncontrollable laughter, confusion, and the sudden urge to speak in
              Manglish. This is purely for entertainment purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
