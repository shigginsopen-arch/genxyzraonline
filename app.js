const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

$("#year").textContent = new Date().getFullYear();

const navToggle = $(".nav-toggle");
const nav = $("#site-nav");
navToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
$$(".site-nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const form = $("#chat-form");
const input = $("#chat-input");
const messages = $("#chat-messages");
const clear = $("#clear-chat");
let conversation = [];

function appendMessage(role, text, loading = false) {
  const row = document.createElement("div");
  row.className = `message ${role}${loading ? " loading" : ""}`;
  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = text;
  row.appendChild(bubble);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
  return row;
}

async function sendPrompt(prompt) {
  const value = (prompt || input.value).trim();
  if (!value) return;

  appendMessage("user", value);
  conversation.push({ role: "user", content: value });
  input.value = "";
  input.style.height = "auto";
  input.disabled = true;

  const loading = appendMessage("assistant", "GENI is thinking…", true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: value })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Unable to reach GENI.");

    loading.remove();
    appendMessage("assistant", data.response);
    conversation.push({ role: "assistant", content: data.response });
  } catch (error) {
    loading.remove();
    appendMessage("assistant", "I’m unable to respond right now. Please try again shortly. The website can still be explored while GENI reconnects.");
    console.error(error);
  } finally {
    input.disabled = false;
    input.focus();
  }
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  sendPrompt();
});

input?.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
});
input?.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

$$("[data-prompt]").forEach(button => button.addEventListener("click", () => {
  document.querySelector("#geni").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => sendPrompt(button.dataset.prompt), 450);
}));

clear?.addEventListener("click", () => {
  conversation = [];
  messages.innerHTML = "";
  appendMessage("assistant", "Conversation cleared. What would you like to accomplish?");
});
