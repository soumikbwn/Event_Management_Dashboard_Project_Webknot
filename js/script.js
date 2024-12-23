document.addEventListener("DOMContentLoaded", () => {
    // Mock data
    let events = [];
    let attendees = [];
    let tasks = [];
  
    // Utility functions
    const generateID = () => "_" + Math.random().toString(36).substr(2, 9);
  
    // DOM Elements
    const createEventButton = document.querySelector(".create-event");
  
    // Event Management
    function createEvent(name, description, location, date) {
      const newEvent = { id: generateID(), name, description, location, date, attendees: [] };
      events.push(newEvent);
      displayEvents();
    }
  
    function deleteEvent(eventID) {
      events = events.filter(event => event.id !== eventID);
      displayEvents();
    }
  
    function displayEvents() {
      const eventList = document.querySelector(".upcoming-events ul");
      eventList.innerHTML = "";
      events.forEach(event => {
        const listItem = document.createElement("li");
        listItem.textContent = `${event.name} - ${event.location}`;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteEvent(event.id);
        listItem.appendChild(deleteBtn);
        eventList.appendChild(listItem);
      });
    }
  
    // Attendee Management
    function addAttendee(name) {
      const newAttendee = { id: generateID(), name, tasks: [] };
      attendees.push(newAttendee);
      displayAttendees();
    }
  
    function deleteAttendee(attendeeID) {
      attendees = attendees.filter(attendee => attendee.id !== attendeeID);
      displayAttendees();
    }
  
    function displayAttendees() {
      const attendeeList = document.querySelector(".recent-sells ul");
      attendeeList.innerHTML = "";
      attendees.forEach(attendee => {
        const listItem = document.createElement("li");
        listItem.textContent = attendee.name;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.onclick = () => deleteAttendee(attendee.id);
        listItem.appendChild(deleteBtn);
        attendeeList.appendChild(listItem);
      });
    }
  
    // Task Management
    function createTask(eventID, name, deadline, assignedAttendeeID) {
      const newTask = { id: generateID(), name, deadline, status: "Pending", assignedAttendeeID };
      tasks.push(newTask);
      updateTaskProgress(eventID);
    }
  
    function updateTaskStatus(taskID, status) {
      const task = tasks.find(task => task.id === taskID);
      if (task) task.status = status;
    }
  
    function getTasksByEvent(eventID) {
      return tasks.filter(task => task.eventID === eventID);
    }
  
    function updateTaskProgress(eventID) {
      const eventTasks = getTasksByEvent(eventID);
      const completedTasks = eventTasks.filter(task => task.status === "Completed").length;
      const progress = eventTasks.length ? (completedTasks / eventTasks.length) * 100 : 0;
  
      // Update progress bar (replace with your progress bar logic)
      console.log(`Progress for Event ${eventID}: ${progress}%`);
    }
  
    // Event Listeners
    createEventButton.addEventListener("click", () => {
      const name = prompt("Enter event name:");
      const description = prompt("Enter event description:");
      const location = prompt("Enter event location:");
      const date = prompt("Enter event date (YYYY-MM-DD):");
      if (name && description && location && date) {
        createEvent(name, description, location, date);
      } else {
        alert("All fields are required.");
      }
    });
  
    // Initial Display
    displayEvents();
    displayAttendees();
  });
  