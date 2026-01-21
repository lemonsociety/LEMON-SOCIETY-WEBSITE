// =============================
// Events Page Logic
// =============================

// Define all events here
// date format: "YYYY-MM-DD"
const eventsData = [
    {
        title: "First Public Meeting Held",
        date: "2025-09-02",
        location: "Google Meet Online Platform",
        description: "Developed 'Lemon Scoiety, Assam, India' and constructed the executive body of the society."
    },
    {
        title: "First Executive Meeting Held",
        date: "2025-11-23",
        location: "Google Meet Online Platform",
        description: "Discussed on constitution, website and advisory panel."
    },
    {
        title: "One week internship on 'Lemon Entrepreneurship'",
        date: "2026-02-23",
        location: "Institutional Biotech Hub, Science College, Kokrajhar",
        description: "IBH, Science College, Kokrajhar in collaboration with Lemon Society, Assam, India is going to conduct a one week internship course on 'Lemon Entrepreneurship'."
    },
    {
        title: "Second Executive Meeting Held",
        date: "2025-12-30",
        location: "Google Meet Online Platform",
        description: "Discussed on draft constitution, full fledged committe and future activities."
    },
    {
        title: "Plantation Drive",
        date: "2026-04-16",
        location: "Gauhati University",
        description: "Different varieties of Citrus, including lemon, will be planted at GU campus in the month of April."
    },
    {
        title: "One day hands-on training on 'Lemon Cultivation and Tree Management'",
        date: "2026-01-26",
        location: "Chithila, Kokrajhar",
        description: "Organizing one day hands-on training on 'Lemon Cultivation and Tree Management' at Cithila, Kokrajhar by Biotech Hub, Science College, Kokrajhar in collaboration with ‘Lemon Society, Assam, India."
    },
    {
        title: "One day National Conference on 'Preserving and enhancing the culture and cultivation of Assam Lemon - Citrus limon (L.) Burm f.'",
        date: "2026-03-21",
        location: "Kokrajhar/Guwahati",
        description: "One day National Conference on 'Preserving and enhancing the culture and cultivation of Assam Lemon - Citrus limon (L.) Burm f.' is going to be held at Kokrajhar/Guwahati."
    }

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
