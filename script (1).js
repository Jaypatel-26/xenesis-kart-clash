const form = document.getElementById("loginForm");
const toast = document.getElementById("toast");
const cancelBtn = document.getElementById("cancelBtn");

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2600);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const fullname = data.get("fullname").trim();
  const mobile = data.get("mobile").trim();
  const enroll = data.get("enroll").trim();
  const kartId = data.get("kartId").trim();

  if (!fullname || !mobile || !enroll || !kartId) {
    showToast("Please fill all fields");
    return;
  }
  if (!/^[0-9]{10}$/.test(mobile)) {
    showToast("Enter a valid 10-digit mobile");
    return;
  }

  const payload = { fullname, mobile, enroll, kartId, ts: Date.now() };
  try {
    localStorage.setItem("kartclash_player", JSON.stringify(payload));
  } catch (e) {}
  showToast("Welcome, " + (kartId || fullname) + "!");
  // simple success animation
  form.querySelector(".btn.primary").disabled = true;
  setTimeout(() => {
    form.querySelector(".btn.primary").disabled = false;
  }, 2200);
});

cancelBtn.addEventListener("click", () => {
  form.reset();
  showToast("Form cleared");
});
