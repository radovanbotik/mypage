"use client";

import { cn } from "@/app/lib/cn";
import { useEffect, useState } from "react";

interface Ticket {
  id: string;
  title: string;
  status:
    | "Closed"
    | "Resolved"
    | "Declined"
    | "In Progress"
    | "Escalated"
    | "Waiting";
  priority: "P1" | "P2" | "P3" | "P4";
  assignee?: string;
}

const mockTickets: Ticket[] = [
  {
    id: "42069",
    title: "User can't find the any key",
    status: "Closed",
    priority: "P3",
  },
  {
    id: "9001",
    title: "It's over 9000! (Server load)",
    status: "Resolved",
    priority: "P1",
    assignee: "by clearing cache",
  },
  {
    id: "1337",
    title: "CSS not displaying in IE6",
    status: "Declined",
    priority: "P4",
    assignee: "(politely)",
  },
  {
    id: "80085",
    title: "Calculator app showing inappropriate numbers",
    status: "Closed",
    priority: "P2",
  },
  {
    id: "404",
    title: "User's motivation not found",
    status: "In Progress",
    priority: "P3",
  },
  {
    id: "500",
    title: "Coffee machine returning internal server error",
    status: "Escalated",
    priority: "P1",
  },
  {
    id: "123456",
    title: "Password is too secure, user can't remember it",
    status: "Resolved",
    priority: "P2",
    assignee: "by password reset",
  },
  {
    id: "666",
    title: "Printer possessed by demons (again)",
    status: "Waiting",
    priority: "P1",
    assignee: "for exorcist",
  },
  {
    id: "2023",
    title: "User still using Internet Explorer",
    status: "Declined",
    priority: "P4",
    assignee: "(intervention required)",
  },
  {
    id: "8080",
    title: "Port 8080 having identity crisis",
    status: "Resolved",
    priority: "P3",
  },
  {
    id: "31337",
    title: "Hacker trying to hack the Gibson",
    status: "Closed",
    priority: "P1",
  },
  {
    id: "90210",
    title: "Beverly Hills network outage",
    status: "Resolved",
    priority: "P2",
  },
];

const statusColors = {
  Closed: "text-green-400 bg-green-900/30",
  Resolved: "text-blue-400 bg-blue-900/30",
  Declined: "text-red-400 bg-red-900/30",
  "In Progress": "text-yellow-400 bg-yellow-900/30",
  Escalated: "text-orange-400 bg-orange-900/30",
  Waiting: "text-purple-400 bg-purple-900/30",
};

const priorityColors = {
  P1: "text-red-400",
  P2: "text-orange-400",
  P3: "text-yellow-400",
  P4: "text-green-400",
};

export function ServiceNowTickerFeed() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Duplicate tickets for seamless loop
  const extendedTickets = [...mockTickets, ...mockTickets, ...mockTickets];

  return (
    <div
      className={cn(
        "//border-slate-700 //bg-slate-900/95 //border-white/20 //backdrop-blur-sm fixed top-0 right-0 bottom-0 z-10 w-80 border-l bg-white/10 transition-all duration-1000",
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
        "hidden xl:block", // Only show on extra large screens
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800/50 p-4">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
            <span className="font-mono text-xs tracking-wider text-gray-400 uppercase">
              ServiceNow Feed
            </span>
          </div>
          <span className="font-mono text-xs text-gray-500">Live</span>
        </div>

        {/* Scrolling Ticker */}
        <div className="relative flex-1 overflow-hidden">
          <div className="animate-scroll-vertical flex flex-col space-y-3 py-4">
            {extendedTickets.map((ticket, index) => (
              <TicketItem key={`${ticket.id}-${index}`} ticket={ticket} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }
        .animate-scroll-vertical {
          animation: scroll-vertical 80s linear infinite;
        }
      `}</style>
    </div>
  );
}

function TicketItem({ ticket }: { ticket: Ticket }) {
  const statusEmoji = {
    Closed: "✅",
    Resolved: "🔧",
    Declined: "❌",
    "In Progress": "⏳",
    Escalated: "🚨",
    Waiting: "⏸️",
  };

  return (
    <div className="mx-4 rounded-lg border border-slate-600/50 bg-slate-800/50 p-3 transition-colors hover:bg-slate-700/50">
      {/* Header with ID and Priority */}
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-sm text-cyan-400">#{ticket.id}</span>
        <span
          className={cn(
            "rounded px-2 py-1 text-xs font-bold",
            priorityColors[ticket.priority],
          )}
        >
          {ticket.priority}
        </span>
      </div>

      {/* Title */}
      <p className="mb-2 text-sm leading-relaxed text-gray-200">
        {ticket.title}
      </p>

      {/* Status and Assignee */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <span
            className={cn(
              "rounded-full px-2 py-1 text-xs font-medium",
              statusColors[ticket.status],
            )}
          >
            {ticket.status}
          </span>
          <span className="text-sm">{statusEmoji[ticket.status]}</span>
        </div>
        {ticket.assignee && (
          <span className="max-w-24 truncate text-xs text-gray-400 italic">
            {ticket.assignee}
          </span>
        )}
      </div>
    </div>
  );
}
