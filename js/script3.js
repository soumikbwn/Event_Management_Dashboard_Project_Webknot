document.addEventListener("DOMContentLoaded", () => {
    const sendMessageButton = document.querySelector(".send-message");
    const messageFormContainer = document.getElementById("message-form-container");
    const messageForm = document.getElementById("message-form");

    // Show the form to send a message
    sendMessageButton.addEventListener("click", () => {
        messageFormContainer.style.display = "block";
    });

    // Hide the message form
    function closeSendMessageForm() {
        messageFormContainer.style.display = "none";
    }

    // Handle form submission (Send message)
    messageForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        const contactType = document.getElementById("contact-type").value;
        const contactValue = document.getElementById("contact-value").value;
        const messageContent = document.getElementById("message-content").value;

        // Validate contact information
        if (!contactValue || !messageContent) {
            alert("Please fill in all fields.");
            return;
        }

        // Simulate sending the message (add it to the message list)
        const messageSent = {
            contactType: contactType === "phone" ? "Phone" : "Email",
            contactValue: contactValue,
            messageContent: messageContent,
            status: "Message Sent"
        };

        displaySentMessage(messageSent);

        // Clear the form fields
        messageForm.reset();
        closeSendMessageForm();
    });

    // Function to display the sent message in the list
    function displaySentMessage(message) {
        const messageList = document.querySelector(".message-list");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message-item");
        messageDiv.innerHTML = `
            <p><strong>Sent to:</strong> ${message.contactType} - ${message.contactValue}</p>
            <p><strong>Message:</strong> ${message.messageContent}</p>
            <p><strong>Status:</strong> ${message.status}</p>
        `;
        messageList.appendChild(messageDiv);
    }

    // Close form
    window.closeSendMessageForm = closeSendMessageForm;
});
