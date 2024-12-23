document.addEventListener("DOMContentLoaded", () => {
    loadEvents(); // Load events from localStorage
});

// Open Create Event Form
function openCreateEventForm(event = null) {
    if (event) {
        document.getElementById("event-name").value = event.name;
        document.getElementById("event-description").value = event.description;
        document.getElementById("event-location").value = event.location;
        document.getElementById("event-date").value = event.date;

        // Change form to update mode
        const submitButton = document.querySelector("#event-form button[type='submit']");
        submitButton.textContent = "Update Event";
        document.getElementById("event-form").onsubmit = function(e) {
            e.preventDefault();
            updateEvent(event.id);
        };
    } else {
        const submitButton = document.querySelector("#event-form button[type='submit']");
        submitButton.textContent = "Create Event";
        document.getElementById("event-form").onsubmit = function(e) {
            e.preventDefault();
            createEvent();
        };
    }

    document.getElementById("event-form-container").style.display = "block";
}

// Close Create Event Form
function closeCreateEventForm() {
    document.getElementById("event-form-container").style.display = "none";
}

// Load events from localStorage
function loadEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventsList = document.getElementById("events-list");
    eventsList.innerHTML = ""; // Clear the events list

    events.forEach(event => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${event.name}</td>
            <td>${event.description}</td>
            <td>${event.location}</td>
            <td>${event.date}</td>
            <td>
                <button class="btn edit" onclick="openCreateEventForm(${JSON.stringify(event)})">Edit</button>
                <button class="btn delete" onclick="deleteEvent(${event.id})">Delete</button>
            </td>
        `;
        eventsList.appendChild(row);
    });
}

// Create Event
function createEvent() {
    const name = document.getElementById("event-name").value;
    const description = document.getElementById("event-description").value;
    const location = document.getElementById("event-location").value;
    const date = document.getElementById("event-date").value;

    const events = JSON.parse(localStorage.getItem("events")) || [];
    const newEvent = {
        id: Date.now(),
        name,
        description,
        location,
        date
    };
    events.push(newEvent);
    localStorage.setItem("events", JSON.stringify(events));
    closeCreateEventForm();
    loadEvents(); // Reload events list
}

// Update Event
function updateEvent(id) {
    const name = document.getElementById("event-name").value;
    const description = document.getElementById("event-description").value;
    const location = document.getElementById("event-location").value;
    const date = document.getElementById("event-date").value;

    const events = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = events.map(event => {
        if (event.id === id) {
            event.name = name;
            event.description = description;
            event.location = location;
            event.date = date;
        }
        return event;
    });

    localStorage.setItem("events", JSON.stringify(updatedEvents));
    closeCreateEventForm();
    loadEvents(); // Reload events list
}

// Delete Event
function deleteEvent(id) {
    if (confirm("Are you sure you want to delete this event?")) {
        const events = JSON.parse(localStorage.getItem("events")) || [];
        const filteredEvents = events.filter(event => event.id !== id);
        localStorage.setItem("events", JSON.stringify(filteredEvents));
        loadEvents(); // Reload events list
    }
}
