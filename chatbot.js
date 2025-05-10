<script>
  let lang = navigator.language.startsWith('gu') ? 'gu' : navigator.language.startsWith('hi') ? 'hi' : 'en';

  const QnA = {
    en: {
      "hello": ["Hi there!", "Hello!", "Hey! How can I help you?"],
      "bye": ["Goodbye!", "See you later!", "Take care!"],
      "link": "Click here to view"
    },
    hi: {
      "hello": ["नमस्ते!", "हैलो!", "आपका स्वागत है!"],
      "bye": ["अलविदा!", "फिर मिलेंगे!", "ध्यान रखना!"],
      "link": "यहाँ क्लिक कर देखें"
    },
    gu: {
      "hello": ["હેલો!", "નમસ્તે!", "તમારું સ્વાગત છે!"],
      "bye": ["આવજો!", "પછી મળશે!", "સાંભળી ને રાખજો!"],
      "link": "અહીં ક્લિક કરો"
    }
  };

  function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    if (!message) return;

    const chatArea = document.getElementById('chatgpt-chat-area');
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerText = message;
    chatArea.appendChild(userMsg);
    input.value = '';
    chatArea.scrollTop = chatArea.scrollHeight;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'message bot';
      const lower = message.toLowerCase();

      // language switch
      if (["hindi", "हिन्दी"].includes(lower)) {
        lang = 'hi'; botMsg.innerText = "जरूर, अब हम हिन्दी में बात करेंगे।";
      } else if (["gujarati", "ગુજરાતી"].includes(lower)) {
        lang = 'gu'; botMsg.innerText = "હા જરૂર, હવે આપણે ગુજરાતીમાં વાત કરીએ.";
      } else if (["english"].includes(lower)) {
        lang = 'en'; botMsg.innerText = "Sure, we will now talk in English.";
      }

      // time
      else if (["time", "समय", "સમય"].includes(lower)) {
        const now = new Date();
        const timeString = now.toLocaleTimeString(lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-US');
        botMsg.innerText = {
          en: "Current time is: " + timeString,
          hi: "वर्तमान समय है: " + timeString,
          gu: "હાલનો સમય છે: " + timeString
        }[lang];
      }

      // fallback
      else {
        let reply = QnA[lang][lower];
        if (Array.isArray(reply)) {
          reply = reply[Math.floor(Math.random() * reply.length)];
        }

        if (reply) {
          reply = reply.replace(/(https?:\/\/[^\s]+)/g, `<a href="$1" target="_blank">${QnA[lang].link}</a>`);
          botMsg.innerHTML = reply;
        } else {
          const blogLink = `https://yourblog.blogspot.com/search?q=${encodeURIComponent(message)}`;
          botMsg.innerHTML = {
            en: `I couldn't find a direct answer. You may <a href="${blogLink}" target="_blank">click here</a> to search my blog.`,
            hi: `मुझे "<b>${message}</b>" का उत्तर नहीं मिला। <a href="${blogLink}" target="_blank">मेरे ब्लॉग पर खोजें</a>।`,
            gu: `મને "<b>${message}</b>" નો જવાબ ન મળ્યો. <a href="${blogLink}" target="_blank">મારા બ્લોગમાં શોધો</a>.`
          }[lang];
        }
      }

      chatArea.appendChild(botMsg);
      chatArea.scrollTop = chatArea.scrollHeight;
    }, 800);
  }
</script>
