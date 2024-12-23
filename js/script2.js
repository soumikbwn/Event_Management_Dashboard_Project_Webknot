document.addEventListener("DOMContentLoaded", () => {
    const peopleTableBody = document.querySelector(".people-list tbody");
    const addPersonButton = document.querySelector(".btn.add-person");

    // Fetch attendees from local storage (simulating backend API)
    function fetchAttendees() {
        const attendees = JSON.parse(localStorage.getItem('attendees')) || [];
        renderAttendees(attendees);
    }

    // Render attendees in the table
    function renderAttendees(attendees) {
        peopleTableBody.innerHTML = ""; // Clear the table
        attendees.forEach((attendee) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${attendee.name}</td>
                <td>${attendee.email}</td>
                <td>${attendee.assignedEvent || "Unassigned"}</td>
                <td>
                    <button class="btn edit" data-id="${attendee.id}">Edit</button>
                    <button class="btn delete" data-id="${attendee.id}">Delete</button>
                </td>
            `;
            peopleTableBody.appendChild(row);
        });
    }

    // Add new attendee (Create)
    addPersonButton.addEventListener("click", () => {
        const name = prompt("Enter attendee's name:");
        const email = prompt("Enter attendee's email:");
        if (!name || !email) {
            alert("Name and email are required!");
            return;
        }
        addAttendee({ name, email });
    });

    // Add attendee to local storage
    function addAttendee(attendee) {
        const attendees = JSON.parse(localStorage.getItem('attendees')) || [];
        attendee.id = Date.now(); // Use a timestamp as a unique ID
        attendees.push(attendee);
        localStorage.setItem('attendees', JSON.stringify(attendees));
        alert("Attendee added successfully!");
        fetchAttendees(); // Refresh the list
    }

    // Edit attendee (Update)
    peopleTableBody.addEventListener("click", async (event) => {
        if (event.target.classList.contains("edit")) {
            const attendeeId = event.target.getAttribute("data-id");
            const attendees = JSON.parse(localStorage.getItem('attendees')) || [];
            const attendee = attendees.find(a => a.id == attendeeId);
            const newName = prompt("Edit attendee's name:", attendee.name);
            const newEmail = prompt("Edit attendee's email:", attendee.email);
            if (!newName || !newEmail) {
                alert("Name and email are required!");
                return;
            }
            updateAttendee(attendeeId, { name: newName, email: newEmail });
        }
    });

    // Update attendee in local storage
    function updateAttendee(id, updatedData) {
        const attendees = JSON.parse(localStorage.getItem('attendees')) || [];
        const index = attendees.findIndex(a => a.id == id);
        if (index !== -1) {
            attendees[index] = { ...attendees[index], ...updatedData };
            localStorage.setItem('attendees', JSON.stringify(attendees));
            alert("Attendee updated successfully!");
            fetchAttendees(); // Refresh the list
        }
    }

    // Delete attendee (Delete)
    peopleTableBody.addEventListener("click", async (event) => {
        if (event.target.classList.contains("delete")) {
            const attendeeId = event.target.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this attendee?")) {
                deleteAttendee(attendeeId);
            }
        }
    });

    // Remove attendee from local storage
    function deleteAttendee(id) {
        let attendees = JSON.parse(localStorage.getItem('attendees')) || [];
        attendees = attendees.filter(a => a.id != id);
        localStorage.setItem('attendees', JSON.stringify(attendees));
        alert("Attendee deleted successfully!");
        fetchAttendees(); // Refresh the list
    }

    // Initial fetch
    fetchAttendees();
});
