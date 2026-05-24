"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Send, User, Bot, Loader2, Search, Bell, HelpCircle, Maximize, Paperclip, Mic, Moon, Sun, Package, FileText, HeadphonesIcon, Store, MessageSquare, Monitor, Settings, ThumbsUp, ThumbsDown } from "lucide-react";
import { useTheme } from "next-themes";
import { SourceLink } from "./SourceLink";
import { TicketDraft } from "./TicketDraft";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: any[];
  ticketDraft?: any;
};

function MessageFeedback() {
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  
  return (
    <div className="flex items-center gap-2 mt-2 ml-1 text-xs text-muted-foreground/70">
      <span>Is this helpful?</span>
      <button 
        onClick={() => setFeedback("up")}
        className={`p-1 rounded hover:text-foreground transition-colors ${feedback === "up" ? "text-specsavers-green bg-specsavers-green/10" : ""}`}
      >
        <ThumbsUp size={12} className={feedback === "up" ? "fill-current" : ""} />
      </button>
      <button 
        onClick={() => setFeedback("down")}
        className={`p-1 rounded hover:text-foreground transition-colors ${feedback === "down" ? "text-red-500 bg-red-500/10" : ""}`}
      >
        <ThumbsDown size={12} className={feedback === "down" ? "fill-current" : ""} />
      </button>
    </div>
  );
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
      // Small timeout ensures the input is re-enabled before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          session_id: sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { text: responseText, sources, ticket_draft, session_id } = data;

      if (!sessionId) {
        setSessionId(session_id);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        sources: sources,
        ticketDraft: ticket_draft,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat API failed", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I'm momentarily unavailable. Please try again in a few seconds.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i, arr) => {
      const parts = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const textMatch = part.match(/\[([^\]]+)\]/);
          const urlMatch = part.match(/\(([^)]+)\)/);
          if (textMatch && urlMatch) {
            return (
              <a 
                key={j} 
                href={urlMatch[1]} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-specsavers-green/10 hover:bg-specsavers-green/20 text-specsavers-green font-medium px-3 py-1.5 rounded-md text-sm transition-colors mt-1 border border-specsavers-green/20 no-underline mr-2 shadow-sm"
              >
                {textMatch[1]}
              </a>
            );
          }
        }
        return <span key={j}>{part}</span>;
      });
      return <span key={i} className="block min-h-[1.2rem]">{rendered}</span>;
    });
  };

  return (

    <div className="flex flex-col h-full w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between p-6 pb-2">
        <a href="/" className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity" title="Refresh Homepage">
          <svg width="146" height="46" viewBox="0 0 146 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
            <ellipse cx="40" cy="23" rx="40" ry="23" fill="#007749" />
            <ellipse cx="106" cy="23" rx="40" ry="23" fill="#007749" />
            <text x="73" y="32" fontFamily="system-ui, -apple-system, sans-serif" fontSize="24" fontWeight="800" fill="white" textAnchor="middle" letterSpacing="-0.5">SpecMate</text>
          </svg>
        </a>
        <div className="flex items-center gap-4 text-muted-foreground">
          <Link href="/admin" className="flex items-center gap-2 hover:text-foreground transition-colors text-sm font-medium pr-2 border-r border-border/50">
            <Settings size={18} />
            <span className="hidden sm:inline">Admin Panel</span>
          </Link>
          <button className="hover:text-foreground transition-colors"><Bell size={18} /></button>
          <button className="hover:text-foreground transition-colors"><HelpCircle size={18} /></button>
          <button 
            className="hover:text-foreground transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted ? (theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />) : <div style={{width: 18, height: 18}} />}
          </button>
          <button className="hover:text-foreground transition-colors"><Maximize size={18} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide relative flex flex-col">
        {messages.length === 0 ? (
          /* Empty State / Hero */
          <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full items-center justify-center">
            <div className="relative flex flex-col items-center text-center select-none">

              {/* ── Deep cinematic backdrop ───────────────────── */}
              <div className="absolute pointer-events-none" style={{width:700,height:700,top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
                <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 50% 50%, rgba(0,119,73,0.13) 0%, transparent 70%)',borderRadius:'50%'}}/>
                <div style={{position:'absolute',inset:80,background:'radial-gradient(circle at 50% 50%, rgba(0,180,100,0.10) 0%, transparent 65%)',borderRadius:'50%'}}/>
                <div style={{position:'absolute',inset:200,background:'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.08) 0%, transparent 60%)',borderRadius:'50%'}}/>
              </div>

              {/* ── Scattered floating particles ─────────────── */}
              {([
                {x:-140,y:-90,size:3,delay:'0s',dur:'4s',op:0.5},
                {x:155,y:-75,size:2,delay:'0.8s',dur:'5s',op:0.4},
                {x:-170,y:30,size:4,delay:'1.5s',dur:'3.5s',op:0.35},
                {x:180,y:55,size:2.5,delay:'0.3s',dur:'6s',op:0.45},
                {x:-80,y:-120,size:2,delay:'2s',dur:'4.5s',op:0.3},
                {x:95,y:-110,size:3,delay:'1.2s',dur:'5.5s',op:0.4},
                {x:-200,y:-20,size:2,delay:'0.6s',dur:'7s',op:0.25},
                {x:205,y:-30,size:3,delay:'1.8s',dur:'4s',op:0.35},
                {x:40,y:-135,size:2,delay:'0.9s',dur:'5s',op:0.3},
                {x:-40,y:130,size:2.5,delay:'2.5s',dur:'4s',op:0.4},
                {x:120,y:115,size:2,delay:'1.1s',dur:'6s',op:0.3},
              ] as {x:number,y:number,size:number,delay:string,dur:string,op:number}[]).map((p,i)=>(
                <div key={i} className="absolute rounded-full bg-specsavers-green pointer-events-none"
                  style={{
                    width:p.size,height:p.size,
                    left:`calc(50% + ${p.x}px)`,top:`calc(50% + ${p.y}px)`,
                    opacity:p.op,
                    animation:`pulse ${p.dur} ${p.delay} ease-in-out infinite alternate`,
                    boxShadow:`0 0 ${p.size*3}px rgba(0,199,98,0.8)`
                  }}
                />
              ))}

              {/* ── Logo assembly ────────────────────────────── */}
              <div className="relative mb-8" style={{zIndex:1}}>
                {/* Outermost slow orbital ring */}
                <div className="absolute rounded-full border border-specsavers-green/8 animate-spin pointer-events-none"
                  style={{inset:-52,animationDuration:'40s'}}/>
                {/* Mid orbital ring — counter */}
                <div className="absolute rounded-full border border-specsavers-green/12 animate-spin pointer-events-none"
                  style={{inset:-36,animationDuration:'25s',animationDirection:'reverse'}}/>
                {/* Inner ring */}
                <div className="absolute rounded-full border border-specsavers-green/20 animate-spin pointer-events-none"
                  style={{inset:-20,animationDuration:'15s'}}/>

                {/* Soft bloom behind the SVG */}
                <div className="absolute pointer-events-none"
                  style={{inset:-16,borderRadius:80,background:'radial-gradient(ellipse at 50% 50%, rgba(0,150,80,0.35) 0%, transparent 70%)',filter:'blur(20px)'}}/>

                {/* ── Main SVG Logo ── */}
                <svg width="260" height="130" viewBox="0 0 260 130" fill="none" xmlns="http://www.w3.org/2000/svg"
                  style={{filter:'drop-shadow(0 0 24px rgba(0,199,98,0.55)) drop-shadow(0 0 60px rgba(0,119,73,0.3))'}}>
                  <defs>
                    <radialGradient id="lg1" cx="32%" cy="28%" r="68%">
                      <stop offset="0%"   stopColor="#30e882"/>
                      <stop offset="40%"  stopColor="#00b860"/>
                      <stop offset="100%" stopColor="#004d2e"/>
                    </radialGradient>
                    <radialGradient id="lg2" cx="68%" cy="28%" r="68%">
                      <stop offset="0%"   stopColor="#1cd970"/>
                      <stop offset="40%"  stopColor="#009950"/>
                      <stop offset="100%" stopColor="#003d25"/>
                    </radialGradient>
                    <radialGradient id="depth1" cx="50%" cy="85%" r="60%">
                      <stop offset="0%"   stopColor="#001f10" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#001f10" stopOpacity="0"/>
                    </radialGradient>
                    <radialGradient id="depth2" cx="50%" cy="85%" r="60%">
                      <stop offset="0%"   stopColor="#001a0d" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#001a0d" stopOpacity="0"/>
                    </radialGradient>
                    <radialGradient id="spec1" cx="38%" cy="22%" r="45%">
                      <stop offset="0%"   stopColor="white" stopOpacity="0.55"/>
                      <stop offset="100%" stopColor="white" stopOpacity="0"/>
                    </radialGradient>
                    <radialGradient id="spec2" cx="62%" cy="22%" r="45%">
                      <stop offset="0%"   stopColor="white" stopOpacity="0.45"/>
                      <stop offset="100%" stopColor="white" stopOpacity="0"/>
                    </radialGradient>
                    <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%"   stopColor="white" stopOpacity="0"/>
                      <stop offset="50%"  stopColor="white" stopOpacity="0.22"/>
                      <stop offset="100%" stopColor="white" stopOpacity="0"/>
                    </linearGradient>
                    <radialGradient id="edge1" cx="50%" cy="50%" r="50%">
                      <stop offset="70%"  stopColor="#00ff88" stopOpacity="0"/>
                      <stop offset="100%" stopColor="#00ff88" stopOpacity="0.2"/>
                    </radialGradient>
                    <radialGradient id="edge2" cx="50%" cy="50%" r="50%">
                      <stop offset="70%"  stopColor="#00cc66" stopOpacity="0"/>
                      <stop offset="100%" stopColor="#00cc66" stopOpacity="0.18"/>
                    </radialGradient>
                    <clipPath id="cl1"><ellipse cx="88" cy="65" rx="70" ry="58"/></clipPath>
                    <clipPath id="cl2"><ellipse cx="172" cy="65" rx="70" ry="58"/></clipPath>
                    <filter id="softBlur"><feGaussianBlur stdDeviation="2.5"/></filter>
                  </defs>
                  <ellipse cx="88"  cy="67" rx="74" ry="62" fill="#007749" opacity="0.22" filter="url(#softBlur)"/>
                  <ellipse cx="172" cy="67" rx="74" ry="62" fill="#005c38" opacity="0.22" filter="url(#softBlur)"/>
                  <ellipse cx="88"  cy="65" rx="70" ry="58" fill="url(#lg1)"/>
                  <ellipse cx="88"  cy="65" rx="70" ry="58" fill="url(#depth1)" clipPath="url(#cl1)"/>
                  <ellipse cx="88"  cy="65" rx="70" ry="58" fill="url(#edge1)"  clipPath="url(#cl1)"/>
                  <ellipse cx="88"  cy="65" rx="70" ry="58" fill="url(#spec1)"  clipPath="url(#cl1)"/>
                  <ellipse cx="68"  cy="44" rx="18" ry="10" fill="white" opacity="0.22" transform="rotate(-20 68 44)" clipPath="url(#cl1)"/>
                  <rect x="30" y="32" width="115" height="10" rx="5" fill="url(#streak)" opacity="0.6" transform="rotate(-12 88 65)" clipPath="url(#cl1)"/>
                  <ellipse cx="172" cy="65" rx="70" ry="58" fill="url(#lg2)"/>
                  <ellipse cx="172" cy="65" rx="70" ry="58" fill="url(#depth2)" clipPath="url(#cl2)"/>
                  <ellipse cx="172" cy="65" rx="70" ry="58" fill="url(#edge2)"  clipPath="url(#cl2)"/>
                  <ellipse cx="172" cy="65" rx="70" ry="58" fill="url(#spec2)"  clipPath="url(#cl2)"/>
                  <ellipse cx="152" cy="44" rx="16" ry="9"  fill="white" opacity="0.18" transform="rotate(-20 152 44)" clipPath="url(#cl2)"/>
                  <rect x="115" y="32" width="115" height="10" rx="5" fill="url(#streak)" opacity="0.5" transform="rotate(-12 172 65)" clipPath="url(#cl2)"/>
                  <ellipse cx="130" cy="65" rx="13" ry="54" fill="white" opacity="0.05"/>
                  <ellipse cx="130" cy="65" rx="5"  ry="54" fill="white" opacity="0.06"/>
                </svg>
              </div>

              {/* ── Wordmark ─────────────────────────────────── */}
              <div className="relative mb-6" style={{zIndex:1}}>
                <div className="absolute inset-0 blur-2xl rounded-full pointer-events-none"
                  style={{background:'radial-gradient(ellipse, rgba(0,180,90,0.25) 0%, transparent 70%)'}}/>
                <div className="relative flex items-baseline" style={{gap:2}}>
                  <span className="pb-4" style={{
                    fontSize:90,fontWeight:900,letterSpacing:'-0.04em',
                    fontFamily:'system-ui,-apple-system,sans-serif',lineHeight:1.1,
                    background:'linear-gradient(135deg, #116b3f 0%, #1e8c57 45%, #27c478 100%)',
                    WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
                    filter:'drop-shadow(0 4px 12px rgba(0,120,60,0.35))'
                  }}>Spec</span>
                  <span className="pb-4" style={{
                    fontSize:90,fontWeight:900,letterSpacing:'-0.04em',
                    fontFamily:'system-ui,-apple-system,sans-serif',lineHeight:1.1,
                    background:'linear-gradient(135deg,#00e676 0%,#00b84c 50%,#007a33 100%)',
                    WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',
                    filter:'drop-shadow(0 0 16px rgba(0,200,80,0.55))'
                  }}>Mate</span>
                </div>
              </div>

              {/* ── Heading + subtitle ───────────────────────── */}
              <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2" style={{zIndex:1}}>How can we help you today?</h2>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed" style={{zIndex:1}}>
                Ask anything about orders, policies, store operations, IT issues and more.
              </p>
            </div>
          </div>


        ) : (
          /* Active Chat Area */
          <div className="flex-1 w-full max-w-3xl mx-auto space-y-6 pb-4" ref={scrollRef}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-specsavers-green text-white flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,119,73,0.3)]">
                    ✨
                  </div>
                )}
                
                <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div className={`px-5 py-3.5 rounded-2xl text-[14px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-specsavers-green text-white rounded-br-sm"
                        : "bg-card border border-border text-foreground rounded-bl-sm"
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2 w-full">
                      {msg.sources.map((src: any, idx: number) => (
                        <SourceLink key={idx} title={src.title} link={src.link} />
                      ))}
                    </div>
                  )}

                  {msg.ticketDraft && (
                    <div className="mt-3 w-full max-w-sm">
                      <TicketDraft draft={msg.ticketDraft} />
                    </div>
                  )}

                  {msg.role === "assistant" && <MessageFeedback />}
                </div>

                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-specsavers-green text-white flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(0,119,73,0.3)]">
                  ✨
                </div>
                <div className="px-5 py-3.5 rounded-2xl bg-card border border-border text-muted-foreground rounded-bl-sm flex items-center gap-2 text-[14px]">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 pt-0 w-full max-w-4xl mx-auto">
        <div className="relative flex items-center bg-card border border-border rounded-2xl shadow-lg focus-within:ring-1 focus-within:ring-specsavers-green/50 transition-all overflow-hidden">
          <div className="flex gap-2 pl-4 text-muted-foreground">
            <button className="p-2 hover:text-foreground hover:bg-background rounded-full transition-colors">
              <Paperclip size={20} />
            </button>
            <button className="p-2 hover:text-foreground hover:bg-background rounded-full transition-colors">
              <Mic size={20} />
            </button>
            <button className="p-2 hover:text-foreground hover:bg-background rounded-full transition-colors text-specsavers-green">
              <div className="w-5 h-5 bg-specsavers-green/20 rounded-full flex items-center justify-center">✨</div>
            </button>
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent border-none py-4 px-3 text-[15px] text-foreground focus:outline-none placeholder:text-muted-foreground/60"
            disabled={isLoading}
          />
          
          <button
            onClick={() => handleSend(input)}
            disabled={!input.trim() || isLoading}
            className={`mr-3 p-2.5 rounded-xl transition-all ${
              input.trim() && !isLoading 
                ? "bg-specsavers-green text-white shadow-md hover:bg-specsavers-green/90" 
                : "bg-background text-muted-foreground opacity-50"
            }`}
          >
            <Send size={18} className={input.trim() && !isLoading ? "ml-0.5" : ""} />
          </button>
        </div>
        <div className="text-center mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldIcon />
          <span>Information provided reflects company data. Always follow store procedures and escalate if needed.</span>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0L0 2.66667V6.66667C0 10.3667 2.56667 13.82 6 14.6667C9.43333 13.82 12 10.3667 12 6.66667V2.66667L6 0ZM6 13.2533C3.3 12.44 1.33333 9.68667 1.33333 6.66667V3.68L6 1.60667L10.6667 3.68V6.66667C10.6667 9.68667 8.7 12.44 6 13.2533ZM6.66667 8H5.33333V4.66667H6.66667V8ZM6.66667 10.6667H5.33333V9.33333H6.66667V10.6667Z" fill="currentColor"/>
    </svg>
  );
}
