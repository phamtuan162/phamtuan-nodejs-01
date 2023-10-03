const searchBox = document.querySelector(".search-box");
const btn = searchBox.querySelector(".btn");
const action = searchBox.querySelector(".action");
var isSuccess = false;
const actionsAndKeywords = [
  { action: "google drive", keywords: ["google drive"] },
  { action: "google maps", keywords: ["google maps", "bản đồ"] },
  { action: "google", keywords: ["google"] },
  { action: "youtube", keywords: ["youtube"] },
  { action: "facebook", keywords: ["facebook"] },
  { action: "maps", keywords: ["chỉ đường", "đường tới", "tới"] },
  { action: "music", keywords: ["bài hát", "mở bài hát", "nghe bài hát"] },
  { action: "video", keywords: ["video", "mở video", "xem video"] },
];

const SpeechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition || false;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.lang = "vi-VI";

  recognition.continuous = false;

  const handleSpeech = (transcript) => {
    const text = transcript.toLowerCase().replaceAll(".", "").trim();
    for (const item of actionsAndKeywords) {
      for (const keyword of item.keywords) {
        if (text.includes(keyword)) {
          isSuccess = true;
          const textNew = text.split(keyword).pop().trim();

          const checkKeyword = item.keywords.some((keyword) =>
            textNew.includes(keyword)
          );
          console.log(checkKeyword);
          if (!checkKeyword) {
            switch (item.action) {
              case "google":
              case "youtube":
              case "facebook":
                window.open(`https://${item.action}.com`);
                break;
              case "google drive":
                window.open("https://drive.google.com");
                break;
              case "google maps":
                window.open(`https://maps.google.com`);
                break;
              case "maps":
                window.open(`https://www.google.com/maps/search/${textNew}`);
                break;
              case "music":
                window.open(`https://zingmp3.vn/tim-kiem/tat-ca?q=${textNew}`);
                break;
              case "video":
                window.open(
                  `https://www.youtube.com/results?search_query=${textNew}`
                );
                break;
            }
            break;
          }
        }
      }
      if (isSuccess) break;
    }
  };
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    recognition.start();
    action.textContent = "Hãy nói nội dung bạn muốn";
    action.style.color = "red";
    document.querySelector(".result")?.remove();
  });

  recognition.addEventListener("result", (e) => {
    const transcript = e.results[0][0].transcript;
    const result = document.createElement("div");
    result.classList.add("result");
    searchBox.appendChild(result);
    result.textContent = `Đang thực hiện: ${transcript}`;
    setTimeout(() => {
      handleSpeech(transcript);
      if (isSuccess) {
        result.textContent = "Thực hiện thành công";
      } else {
        result.textContent = "Không thực hiện được yêu cầu";
      }
    }, 1000);
  });

  recognition.addEventListener("error", (e) => {
    recognition.stop();
    action.textContent = "Không nhận diện được ngôn ngữ";
  });

  recognition.addEventListener("speechend", (e) => {
    recognition.stop();
    action.textContent = "Đã nói xong. Hy Vọng Kết quả như ý bạn";
    action.style.color = "green";
  });
}
