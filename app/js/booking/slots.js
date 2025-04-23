export function generateTimeSlots(startHour, endHour) {
  let slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${h.toString().padStart(2, '0')}:00`);
    slots.push(`${h.toString().padStart(2, '0')}:30`);
  }

  slots.push('22:00');
  return slots;
}

export function renderSlots(bookedSlots, slotsContainer, selectSlot) {
  if (!Array.isArray(bookedSlots)) {
    console.error("Ошибочные данные: ожидается массив");
    return;
  }

  slotsContainer.innerHTML = "";
  const startHour = 10, endHour = 22;
  const timeSlots = generateTimeSlots(startHour, endHour);

  timeSlots.forEach((time, index) => {
    const isBooked = bookedSlots.some(slot => isTimeWithinRange(time, slot.start_time, slot.end_time));
    const slotDiv = document.createElement("div");
    slotDiv.textContent = time;
    slotDiv.classList.add("time-slot");

    if (isBooked) {
      slotDiv.classList.add("booked");
    } else {
      slotDiv.addEventListener("click", () => selectSlot(time, index, slotDiv));
    }

    slotsContainer.appendChild(slotDiv);
  });

  if (typeof selectedStart !== "undefined" && typeof selectedEnd !== "undefined") {
    highlightIntermediateSlots(slotsContainer.children, selectedStart, selectedEnd);
  }
}

export function isTimeWithinRange(time, start, end) {
  const [timeHour, timeMinute] = time.split(":").map(Number);
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const timeInMinutes = timeHour * 60 + timeMinute;
  const startInMinutes = startHour * 60 + startMinute;
  const endInMinutes = endHour * 60 + endMinute;

  return timeInMinutes >= startInMinutes && timeInMinutes <= endInMinutes;
}

export function highlightIntermediateSlots(slots, selectedStart, selectedEnd) {
  const startIndex = Array.from(slots).findIndex(slot => slot.textContent === selectedStart);
  const endIndex = Array.from(slots).findIndex(slot => slot.textContent === selectedEnd);

  if (startIndex < endIndex) {
    for (let i = startIndex + 1; i < endIndex; i++) {
      slots[i].classList.add("intermediate");
    }
  } else {
    for (let i = endIndex + 1; i < startIndex; i++) {
      slots[i].classList.add("intermediate");
    }
  }
}

export function clearIntermediateHighlights() {
  document.querySelectorAll(".intermediate").forEach(el => el.classList.remove("intermediate"));
}