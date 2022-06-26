const video = document.querySelector(".video");

video.addEventListener("pointerdown", (e) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.id = e.pointerId;
  positionDot(e, dot);
  video.append(dot);
});

video.addEventListener("pointermove", (e) => {
  const dot = document.getElementById(e.pointerId);
  if (dot === null) return;
  positionDot(e, dot);
});

video.addEventListener("pointercancel", (e) => {
  clearPointer(e);
});

video.addEventListener("pointerup", (e) => {
  clearPointer(e);
});

function positionDot(e, dot) {
  dot.style.width = e.width * 2 + "px";
  dot.style.height = e.height * 2 + "px";
  dot.style.left = e.pageX - 15 + "px";
  dot.style.top = e.pageY - 15 + "px";
}

function clearPointer(e) {
  const dot = document.getElementById(e.pointerId);
  if (dot === null) return;
  dot.remove();
}
