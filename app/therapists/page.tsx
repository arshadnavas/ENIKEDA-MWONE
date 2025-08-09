"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Users, Clock } from "lucide-react"

const therapists = [
  {
    id: "sathyapalan",
    name: "സത്യപാലൻ (Sathyapalan)",
    title: "Drama Therapy Specialist",
    image: "/images/sathyapalan.png",
    specialty: "Overly Dramatic Solutions",
    experience: "∞ Years of Self-Proclaimed Heroism",
    rating: "5/5 (Self-Rated)",
    status: "Available",
    description: "The moral hero who makes every problem about himself",
    signature: '"Njan Sathyam parayunnu!"',
    tags: ["Drama Queen", "Moral Hero", "Soap Opera Expert"],
  },
  {
    id: "chacko-mash",
    name: "ചാക്കോ മാഷ് (Chacko Mash)",
    title: "Philosophy & Confusion Expert",
    image: "/images/chacko-mash.jpeg",
    specialty: "Irrelevant Wisdom",
    experience: "Lifetime of Teaching Nothing",
    rating: "4.5/5 (Ba...ba...ba)",
    status: "Available",
    description: "Village teacher with Nobel laureate confidence",
    signature: '"Life is like a bus without a conductor..."',
    tags: ["Overconfident", "Philosopher", "Confusion Master"],
  },
  {
    id: "dashamoolam-damu",
    name: "ദശമൂലം ദാമു (Dashamoolam Damu)",
    title: "Emotional Explosion Therapist",
    image: "/images/dashamoolam-damu.png",
    specialty: "Dramatic Breakdowns",
    experience: "Professional Tragedy Narrator",
    rating: "4.8/5 (Oscar Worthy)",
    status: "Available",
    description: "Starts calm, ends up shouting passionately",
    signature: '"Njan Dashamoolam Damu aanu...!"',
    tags: ["Emotional", "Dramatic", "Storyteller"],
  },
  {
    id: "appukuttan",
    name: "അപ്പുകുട്ടൻ (Appukuttan)",
    title: "Fear Management Specialist",
    image: "/images/appukuttan-updated.png",
    specialty: "Brave but Scared Solutions",
    experience: "Expert in Running Away",
    rating: "4.2/5 (When Not Hiding)",
    status: "Available",
    description: "Self-proclaimed brave member who fears everything",
    signature: '"Njan oru pavam manushyan aanu."',
    tags: ["Brave", "Scared", "Ghost Stories"],
  },
  {
    id: "gangadharan",
    name: "ഗംഗാധരൻ (Gangadharan)",
    title: "Financial Therapy Consultant",
    image: "/images/gangadharan.png",
    specialty: "Money-Based Solutions",
    experience: "Master of Deals & Settlements",
    rating: "4.7/5 (Great Deals)",
    status: "Available",
    description: "Optimistic moneylender who solves everything with money",
    signature: '"Ninte kayyil panam undo...?"',
    tags: ["Optimistic", "Money Expert", "Deal Maker"],
  },
]

export default function TherapistsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-8 pt-4">
          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Choose Your Therapist</h1>
            <p className="text-gray-400">Select your preferred comedy therapy specialist</p>
          </div>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {therapists.map((therapist) => (
            <Card
              key={therapist.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10"
            >
              <CardHeader className="text-center pb-4">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
                  <Image
                    src={therapist.image || "/placeholder.svg"}
                    alt={therapist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-xl font-bold text-white">{therapist.name}</CardTitle>
                <CardDescription className="text-gray-400 font-semibold">{therapist.title}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-white" />
                    <span className="text-gray-300">{therapist.rating}</span>
                  </div>
                  <Badge
                    variant={therapist.status === "Available" ? "default" : "secondary"}
                    className="bg-white/20 text-white border-white/30"
                  >
                    {therapist.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{therapist.specialty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{therapist.experience}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-400 italic">"{therapist.description}"</p>

                <div className="bg-white/10 p-3 rounded-lg border border-white/20">
                  <p className="text-sm font-semibold text-gray-300">Signature Line:</p>
                  <p className="text-sm text-gray-200 italic">{therapist.signature}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {therapist.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs bg-white/10 text-gray-300 border-white/30">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Link href={`/chat/${therapist.id}`} className="block">
                  <Button className="w-full bg-white text-black hover:bg-gray-200">Start Therapy Session</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto p-6 bg-white/10 border-white/20 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-2">Disclaimer</h3>
            <p className="text-sm text-gray-300">
              These therapists are comedy characters and not real mental health professionals. This is purely for
              entertainment purposes. For real therapy, please consult actual professionals!
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
