    document.addEventListener("DOMContentLoaded", () => {
        const textarea = document.getElementById("message");
        const charCountSpanParent = document.getElementById("messageCharCountParent");
        const charCountSpan = document.getElementById("messageCharCount");

        textarea.addEventListener("input", () => {
            const count = textarea.value.length;
            const max = 2000;
            const percent = count / max;

            charCountSpan.textContent = count;

            charCountSpanParent.classList.remove("warning", "danger");

            if (percent >= 0.95) {
                charCountSpanParent.classList.add("danger");
            } else if (percent >= 0.8) {
                charCountSpanParent.classList.add("warning");
            }
        });

        const form = document.querySelector(".email-form");
        const status = document.querySelector(".email-form-status");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const button = form.querySelector("button");
            var responseText = "";
            var wasSuccessful = false;

            status.classList.remove("success", "error");
            status.style.display = "block";
            button.disabled = true;
            button.textContent = "Sending...";

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        Accept: "application/json"
                    }
                });
                if (response.ok) {
                    responseText = "Message sent successfully!";
                    wasSuccessful = true;
                    charCountSpan.textContent = "0";
                    charCountSpanParent.classList.remove("warning", "danger");
                    form.reset();
                } else {
                    responseText = "Something went wrong. Please try again.";
                }
            } catch (err) {
                responseText = "Network error. Please try again.";
            }

            setTimeout(() => {
                if (wasSuccessful) status.classList.add("success");
                else status.classList.add("error");
                status.textContent = responseText;
                button.disabled = false;
                button.textContent = "Send Message";
            }, 1000);
        });

        form.addEventListener("input", () => {
            status.style.display = "none";
            status.classList.remove("success", "error");
            status.textContent = "";
        })
    });
