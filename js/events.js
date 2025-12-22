// =============================
// Events Page Logic
// =============================

// Define all events here
// date format: "YYYY-MM-DD"
const eventsData = [
    {
        title: "First Public Meeting Held",
        date: "2025-09-02",
        location: "Google Online Platform",
        description: "Developed 'Lemon Scoiety, Assam, India' and constructed the executive body of the society."
    },
    {
        title: "First Executive Meeting Held",
        date: "2025-11-23",
        location: "Google Online Platform",
        description: "Discussed on constitution, website and advisory panel."
    },
    
];

// Helper: parse "YYYY-MM-DD" safely as local date
function parseLocalDate(dateStr) {
    // Add T00:00:00 so JS treats it as local midnight
    return new Date(dateStr + "T00:00:00");
}

// Create a DOM card for an event
function createEventCard(event) {
    const card = document.createElement("div");
    card.className = "event-card";

    const titleEl = document.createElement("div");
    titleEl.className = "event-title";
    titleEl.textContent = event.title;

    const metaEl = document.createElement("div");
    metaEl.className = "event-meta";

    const eventDate = parseLocalDate(event.date);
    const formatted = eventDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    metaEl.textContent = `${formatted} • ${event.location}`;

    const descEl = document.createElement("p");
    descEl.className = "event-desc";
    descEl.textContent = event.description;

    card.appendChild(titleEl);
    card.appendChild(metaEl);
    card.appendChild(descEl);

    return card;
}

document.addEventListener("DOMContentLoaded", () => {
    const upcomingContainer = document.getElementById("upcomingList");
    const pastContainer = document.getElementById("pastList");

    if (!upcomingContainer || !pastContainer) return;

    const today = new Date();
    // Zero out time for fair comparison
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = [];
    const pastEvents = [];

    eventsData.forEach(event => {
        const eventDate = parseLocalDate(event.date);

        if (eventDate >= today) {
            upcomingEvents.push(event);
        } else {
            pastEvents.push(event);
        }
    });

    // Sort upcoming by nearest date first
    upcomingEvents.sort((a, b) => parseLocalDate(a.date) - parseLocalDate(b.date));

    // Sort past events by most recent first
    pastEvents.sort((a, b) => parseLocalDate(b.date) - parseLocalDate(a.date));

    // Render upcoming events
    if (upcomingEvents.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.className = "no-events";
        emptyMsg.textContent = "No upcoming events at the moment.";
        upcomingContainer.appendChild(emptyMsg);
    } else {
        upcomingEvents.forEach(ev => {
            upcomingContainer.appendChild(createEventCard(ev));
        });
    }

    // Render past events
    if (pastEvents.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.className = "no-events";
        emptyMsg.textContent = "No past events recorded yet.";
        pastContainer.appendChild(emptyMsg);
    } else {
        pastEvents.forEach(ev => {
            pastContainer.appendChild(createEventCard(ev));
        });
    }
});
