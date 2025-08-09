"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Send, User, Bot } from "lucide-react"
import { useParams } from "next/navigation"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const therapistData = {
  sathyapalan: {
    name: "സത്യപാലൻ (Sathyapalan)",
    image: "/images/sathyapalan.png",
    status: "Dramatically Available",
    mood: "Ready to Save the World",
  },
  "chacko-mash": {
    name: "ചാക്കോ മാഷ് (Chacko Mash)",
    image: "/images/chacko-mash.jpeg",
    status: "Ba...ba...ba...",
    mood: "Philosophically Confused",
  },
  "dashamoolam-damu": {
    name: "ദശമൂലം ദാമു (Dashamoolam Damu)",
    image: "/images/dashamoolam-damu.png",
    status: "Emotionally Charged",
    mood: "Ready for Drama",
  },
  appukuttan: {
    name: "അപ്പുകുട്ടൻ (Appukuttan)",
    image: "/images/appukuttan-updated.png",
    status: "Bravely Scared",
    mood: "Hiding but Available",
  },
  gangadharan: {
    name: "ഗംഗാധരൻ (Gangadharan)",
    image: "/images/gangadharan.png",
    status: "Financially Optimistic",
    mood: "Ready to Make Deals",
  },
}

export default function ChatPage() {
  const params = useParams()
  const therapistId = params.therapistId as string
  const therapist = therapistData[therapistId as keyof typeof therapistData]

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          therapistId: therapistId,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ""

      const assistantMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessageObj])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          assistantMessage += chunk

          setMessages((prev) =>
            prev.map((msg) => (msg.id === assistantMessageObj.id ? { ...msg, content: assistantMessage } : msg)),
          )
        }
      }
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again!",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  if (!therapist) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="p-8 text-center bg-white/10 border-white/20">
          <h2 className="text-2xl font-bold mb-4 text-white">Therapist Not Found</h2>
          <Link href="/therapists">
            <Button className="bg-white text-black hover:bg-gray-200">Back to Therapists</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/therapists">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
              <Image src={therapist.image || "/placeholder.svg"} alt={therapist.name} fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-bold text-white">{therapist.name}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs bg-white/10 text-gray-300 border-white/30">
                  {therapist.status}
                </Badge>
                <span className="text-xs text-gray-400">{therapist.mood}</span>
              </div>
            </div>
          </div>

          <div className="w-16"></div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-120px)] flex flex-col">
        <ScrollArea className="flex-1 mb-4">
          <div className="space-y-4 p-4">
            {messages.length === 0 && (
              <Card className="p-6 bg-white/10 border-white/20">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Welcome to your therapy session!</h3>
                  <p className="text-gray-300">
                    Your therapist {therapist.name} is ready to help you... in their own unique way!
                  </p>
                </div>
              </Card>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    {message.role === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <Card
                    className={`p-4 ${
                      message.role === "user" ? "bg-white text-black" : "bg-white/10 border-white/20 text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </Card>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <Card className="p-4 bg-white/10 border-white/20">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <Card className="p-4 bg-white/5 backdrop-blur-sm border-white/10">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share your thoughts with your therapist..."
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
