const searchBox = document.querySelector(".search-box");
const btn = searchBox.querySelector(".btn");
const action = searchBox.querySelector(".action");
var isSuccess = true;
const SpeechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition || false;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();

  recognition.lang = "vi-VI";

  recognition.continuous = false;

  handleSpeech = (transcript) => {
    const text = transcript.toLowerCase().replaceAll(".", "");
    let textNew;
    switch (text) {
      case "google":
        window.open("https://google.com");
        break;
      case "youtube":
        window.open("https://youtube.com");
        break;

      case "facebook":
        window.open("https://facebook.com");
        break;

      case "google maps":
      case "maps":
        window.open("https://maps.google.com");
        break;

      case "google drive":
        window.open("https://drive.google.com");
        break;
      default:
        if (
          text.includes("chỉ đường") ||
          text.includes("đường tới") ||
          text.includes("tới")
        ) {
          textNew = text
            .replace("chỉ đường", "")
            .replace("tới", "")
            .replace("đường tới", "")
            .replace("chỉ đường tới", "")
            .trim();
          window.open(`https://www.google.com/maps/search/${textNew}`);
        } else if (
          text.includes("bài hát") ||
          text.includes("mở bài hát") ||
          text.includes("nghe bài hát")
        ) {
          textNew = text
            .replace("bài hát", "")
            .replace("mở bài hát", "")
            .replace("nghe bài hát", "")
            .trim();
          window.open(`https://zingmp3.vn/tim-kiem/tat-ca?q=${textNew}`);
        } else if (
          text.includes("video") ||
          text.includes("mở video") ||
          text.includes("xem video")
        ) {
          textNew = text
            .replace("video", "")
            .replace("mở video", "")
            .replace("xem video", "")
            .trim();
          window.open(
            `https://www.youtube.com/results?search_query=${textNew}`
          );
        } else {
          isSuccess = false;
          return "Không thực hiện được yêu cầu";
        }
        break;
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
        result.textContent = handleSpeech(transcript);
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
