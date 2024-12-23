// Import FullCalendar
import { Calendar } from 'https://cdn.jsdelivr.net/npm/@fullcalendar/core@3.2.0/main.min.js';
import dayGridPlugin from 'https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@3.2.0/main.min.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the calendar
    var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
        plugins: [dayGridPlugin],  // Use the dayGridPlugin for month view
        initialView: 'dayGridMonth',  // Set the default view to month
        events: [
            // Sample events for 2025
            { 
                title: 'New Year\'s Day', 
                start: '2025-01-01', 
                description: 'Celebrating the start of the year'
            },
            { 
                title: 'Independence Day', 
                start: '2025-07-04', 
                description: 'National Independence Day celebration'
            },
            { 
                title: 'Christmas Day', 
                start: '2025-12-25', 
                description: 'Christmas celebrations'
            },
            { 
                title: 'Labor Day', 
                start: '2025-09-01', 
                description: 'Labor Day holiday'
            },
            { 
                title: 'Thanksgiving Day', 
                start: '2025-11-27', 
                description: 'Thanksgiving celebrations'
            },
            { 
                title: 'Diwali', 
                start: '2025-11-14', 
                description: 'Festival of Lights'
            },
            { 
                title: 'Easter', 
                start: '2025-04-20', 
                description: 'Easter Sunday celebration'
            }
        ]
    });

    // Render the calendar
    calendar.render();
});
