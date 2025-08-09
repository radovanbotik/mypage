import { cn } from "@/app/lib/cn";

interface Ticket {
  number: string;
  shortDescription: string;
  approval: "Approved" | "Rejected" | "Requested" | "Not Yet Requested";
  type: string;
  state:
    | "New"
    | "Review"
    | "Implement"
    | "Scheduled"
    | "Authorize"
    | "Closed"
    | "Cancelled";
  assignedTo: string;
  plannedStartDate: string;
}

const mockTickets: Ticket[] = [
  {
    number: "CHG0042069",
    shortDescription: "User can't find the any key",
    approval: "Approved",
    type: "Normal",
    state: "Closed",
    assignedTo: "ITIL User",
    plannedStartDate: "2024-01-15 09:00:00",
  },
  {
    number: "CHG0009001",
    shortDescription: "It's over 9000! (Server load)",
    approval: "Approved",
    type: "Emergency",
    state: "Implement",
    assignedTo: "Cache Clearer",
    plannedStartDate: "2024-01-16 14:30:00",
  },
  {
    number: "CHG0001337",
    shortDescription: "CSS not displaying in IE6",
    approval: "Rejected",
    type: "Normal",
    state: "Cancelled",
    assignedTo: "Web Team",
    plannedStartDate: "2024-01-17 10:00:00",
  },
  {
    number: "CHG0080085",
    shortDescription: "Calculator app showing inappropriate numbers",
    approval: "Approved",
    type: "Normal",
    state: "Closed",
    assignedTo: "Math Police",
    plannedStartDate: "2024-01-18 11:00:00",
  },
  {
    number: "CHG0000404",
    shortDescription: "User's motivation not found",
    approval: "Requested",
    type: "Standard",
    state: "Review",
    assignedTo: "HR Team",
    plannedStartDate: "2024-01-19 13:00:00",
  },
  {
    number: "CHG0000500",
    shortDescription: "Coffee machine returning internal server error",
    approval: "Approved",
    type: "Emergency",
    state: "Implement",
    assignedTo: "Caffeine Admin",
    plannedStartDate: "2024-01-20 08:00:00",
  },
  {
    number: "CHG0123456",
    shortDescription: "Password is too secure, user can't remember it",
    approval: "Approved",
    type: "Normal",
    state: "Closed",
    assignedTo: "Security Team",
    plannedStartDate: "2024-01-21 15:00:00",
  },
  {
    number: "CHG0000666",
    shortDescription: "Printer possessed by demons (again)",
    approval: "Not Yet Requested",
    type: "Emergency",
    state: "New",
    assignedTo: "Exorcist",
    plannedStartDate: "2024-01-22 16:00:00",
  },
  {
    number: "CHG0002023",
    shortDescription: "User still using Internet Explorer",
    approval: "Rejected",
    type: "Normal",
    state: "Cancelled",
    assignedTo: "Browser Police",
    plannedStartDate: "2024-01-23 12:00:00",
  },
  {
    number: "CHG0008080",
    shortDescription: "Port 8080 having identity crisis",
    approval: "Approved",
    type: "Standard",
    state: "Scheduled",
    assignedTo: "Network Team",
    plannedStartDate: "2024-01-24 14:00:00",
  },
];

const approvalColors = {
  Approved: "text-green-600 bg-green-50",
  Rejected: "text-red-600 bg-red-50",
  Requested: "text-yellow-600 bg-yellow-50",
  "Not Yet Requested": "text-gray-600 bg-gray-50",
};

const approvalIcons = {
  Approved: "●",
  Rejected: "●",
  Requested: "●",
  "Not Yet Requested": "●",
};

const stateColors = {
  New: "text-blue-700",
  Review: "text-orange-700",
  Implement: "text-purple-700",
  Scheduled: "text-indigo-700",
  Authorize: "text-yellow-700",
  Closed: "text-green-700",
  Cancelled: "text-red-700",
};

export function ServiceNowTickerFeed() {
  // Duplicate tickets for seamless loop
  const extendedTickets = [...mockTickets, ...mockTickets, ...mockTickets];

  return (
    <div
      className={cn(
        "z-10 mb-8 w-full border-t border-gray-300 bg-white shadow-lg transition-all duration-1000",
      )}
    >
      {/* ServiceNow Header */}
      <div className="border-b border-gray-300 bg-white px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button className="text-gray-600 hover:text-gray-800">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <span className="text-sm font-medium text-gray-700">
                Change Requests
              </span>
              <button className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700">
                New
              </button>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2 text-xs">
              <svg
                className="h-3 w-3 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-blue-600">All</span>
              <span className="text-gray-400">{">"}</span>
              <span className="text-blue-600">Active = true</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-mono text-xs text-gray-500">
              The good old days...
            </span>
            <div className="flex items-center space-x-1">
              <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
              <span className="text-xs text-gray-500">Live Feed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="border-b border-gray-300 bg-gray-50 px-6 py-2">
        <div className="flex items-center space-x-6 text-xs font-medium text-gray-700">
          <div className="w-4"></div>
          <div className="w-32 cursor-pointer text-blue-600 hover:underline">
            Number ▲
          </div>
          <div className="flex-1 text-gray-700">Short description</div>
          <div className="w-24 text-gray-700">Approval</div>
          <div className="w-20 text-gray-700">State</div>
          <div className="w-24 text-gray-700">Type</div>
          <div className="w-32 text-gray-700">Assigned to</div>
        </div>
      </div>

      {/* Scrolling Table Content - Fixed to scroll vertically */}
      <div className="relative h-80 overflow-hidden bg-white">
        <div className="animate-scroll-vertical flex flex-col">
          {extendedTickets.map((ticket, index) => (
            <TicketRow key={`${ticket.number}-${index}`} ticket={ticket} />
          ))}
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
          animation: scroll-vertical 120s linear infinite;
        }
      `}</style>
    </div>
  );
}

function TicketRow({ ticket }: { ticket: Ticket }) {
  return (
    <div className="flex-shrink-0 border-b border-gray-200 transition-colors hover:bg-blue-50">
      <div className="flex items-center space-x-6 px-6 py-3 text-xs">
        {/* Checkbox and Info Icon */}
        <div className="flex w-4 items-center space-x-1">
          <input type="checkbox" className="h-3 w-3" />
          <div className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-100">
            <span className="text-xs font-bold text-blue-600">i</span>
          </div>
        </div>

        {/* Number */}
        <div className="w-32">
          <a href="#" className="font-medium text-blue-600 hover:underline">
            {ticket.number}
          </a>
        </div>

        {/* Short Description */}
        <div
          className="flex-1 truncate text-gray-700"
          title={ticket.shortDescription}
        >
          {ticket.shortDescription}
        </div>

        {/* Approval */}
        <div className="w-24">
          <span
            className={cn(
              "inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium",
              approvalColors[ticket.approval],
            )}
          >
            <span
              className={cn(
                ticket.approval === "Approved" && "text-green-600",
                ticket.approval === "Rejected" && "text-red-600",
                ticket.approval === "Requested" && "text-yellow-600",
                ticket.approval === "Not Yet Requested" && "text-gray-600",
              )}
            >
              {approvalIcons[ticket.approval]}
            </span>
            <span className="truncate">{ticket.approval}</span>
          </span>
        </div>

        {/* State */}
        <div className="w-20">
          <span className={cn("font-medium", stateColors[ticket.state])}>
            {ticket.state}
          </span>
        </div>

        {/* Type */}
        <div className="w-24 text-gray-700">{ticket.type}</div>

        {/* Assigned To */}
        <div className="w-32 truncate text-gray-700">{ticket.assignedTo}</div>
      </div>
    </div>
  );
}
