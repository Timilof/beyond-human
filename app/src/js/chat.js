(function() {
  var socket = io();
  const childNumber = Math.floor(Math.random() * 999) + 1;
  let userType = "Child"
  let badMembers = [];
  const status = document.querySelector(".chat-welcome p")
  const chatWindow = document.querySelector(".message-container")
  document.querySelector("h2").textContent = `Welcome child-${childNumber}`

  console.log("Speak")
  document.querySelector('.send').addEventListener("click", function(e) {
    e.preventDefault();
    const message = document.querySelector('.input').value
    if (message == '' || message == null || message === " " || message === "  " || message === "   " || message === "    ") {
      console.log("illegal message")
      document.querySelector('.input').value = "";
      document.querySelector('.input').focus();
    } else if (message == "mayke") {
      userType = "Guide";
      console.log(`${userType}-` + `${childNumber}`)
      document.querySelector('.input').value = "";
      document.querySelector('.input').focus();
      document.querySelector("h2").textContent = `Welcome guide-${childNumber}`
      status.textContent = "Guide our children"
      chatWindow.classList.remove("plebs")
    } else if (message == "warn") {
      socket.emit('warning');
      document.querySelector('.input').value = "";
      document.querySelector('.input').focus();
    } else {
      let seconds = new Date().getSeconds()
      let minutes = new Date().getMinutes()
      let hours = new Date().getHours()
      const timestamp = hours + ":" + minutes + ":" + seconds
      const messageId = Math.floor(Math.random() * 99999999) + 1;
      socket.emit('chat message', {
        msg: message,
        time: timestamp,
        userNumber: childNumber,
        member: userType,
        msgId: messageId
      });
      document.querySelector('.input').value = "";
      document.querySelector('.input').focus();
      return false;
    }
  });

  function deletingTon() {
    document.querySelectorAll(".deleteButton").forEach(butt => {
      butt.addEventListener("click", deltaButton)
    })
  }

  function shunningTon() {
    document.querySelectorAll(".shunButton").forEach(shunn => {
      shunn.addEventListener("click", foxButton)
    })
  }

  function deltaButton() {
    const current = this.parentElement.parentElement.id
    socket.emit('deleter', current)
  }

  function foxButton() {
    const badUser = this.parentElement.parentElement.classList[1].substring(1)
    socket.emit("shunner", badUser);
  }


  socket.on("shunner", function(outData) {
    console.log(outData)

    badMembers = outData.list;
    console.log(badMembers)
    const longChild = outData.xo
    const shunMessage = `
      <li class="warningMsg">
      <p>child-${longChild} has been shunned</p>
      </li>`;

    chatWindow.insertAdjacentHTML('beforeend', shunMessage)
    chatWindow.scrollTop = chatWindow.scrollHeight;
    document.querySelectorAll(`.c${outData.xo}`).forEach(xer => {
      // chatWindow.removeChild(xer)
    if(childNumber == outData.xo){
        status.textContent = "You have been shunned"
        status.setAttribute("style", "color: red;");
}
    })
  })

  socket.on('deleter', function(id) {
    console.log("delete " + id)
    const removable = document.querySelector(`#${id}`)
    chatWindow.removeChild(removable)
  })

  socket.on('warning', function() {

    const warningMessage = `
    <li class="warningMsg">
    <p>children, behave. Or you will be shunned</p>
    </li>`;

    chatWindow.insertAdjacentHTML('beforeend', warningMessage)
    console.log("warning to all children")
  })

  socket.on('chat message', function(data) {
    console.log(data)


    const forbiddenWords = {
      Cult : "Community",
      cult :  "Community",
      Sect: "Community",
      sect: "Community",
      member : "Child",
      members : "Children",
      leader : "Guide",
      controlling : "guiding",
      control : "guide",
      controls : "guides",
      controlled : "guided" ,
      oppressed : "strongly guided",
      oppress: "strongly guide",
      oppressing: "strongly guiding",
      oppresses: "strongly guides",
      oppression : "strong guidance",
      censor : "help",
      censors : "helps",
      censored: "helped",
      censoring: "helping",
      censorship : "a helping hand",
      brainwash: "reform",
      mindcontrol : "reform",
      leo: "Leo can zucc my big ole stick met zn brand en netwerk en al die troep 🖕🏻",
    }

    let newerMessage = data.substance.msg.replace(/Cult|cult|Sect|sect|member|members|leader|controlling|control|controls|controlled|oppressed|oppress|oppressing|oppresses|oppression|censor|censors|censored|censoring|censorship|brainwash|mindcontrol|leo/gi, function(matched) {
      return forbiddenWords[matched];

    });
    if (badMembers.length > 0) {
      badMembers.forEach(exChild => {
        if (exChild == data.substance.userNumber) {
          console.log("A bad mfer is typing!!!! " + exChild)
        } else {
          console.log("nothing too see here bois " + data.substance.userNumber)
          writer(data, newerMessage);
        }
      })
    } else {
      writer(data, newerMessage);
    }
  })

  function writer(data, newerMessage) {
    let theMessage
    if (data.substance.member == "Guide" && data.substance.userNumber == childNumber) {
      theMessage = `
    <li id="id${data.substance.msgId}" class="chatMessage myMsg c${data.substance.userNumber}">
      <p>Guide-${data.substance.userNumber}</p>
      <span>${data.substance.time}</span>
      <p>${newerMessage}</p>
      <div class="guideSkill">
      <button class="deleteButton" type="button" name="button">delete</button>
      <button class="shunButton" type="button" name="button">shun</button>
      </div>
    </li>
    `
    } else if (data.substance.member == "Guide") {
      theMessage = `
    <li id="id${data.substance.msgId}" class="chatMessage c${data.substance.userNumber}">
      <p>Guide-${data.substance.userNumber}</p>
      <span>${data.substance.time}</span>
      <p>${newerMessage}</p>
      <div class="guideSkill">
      <button class="deleteButton" type="button" name="button">delete</button>
      <button class="shunButton" type="button" name="button">shun</button>
      </div>
    </li>
    `
    } else if (data.substance.userNumber == childNumber) {
      theMessage = `
  <li id="id${data.substance.msgId}" class="chatMessage myMsg c${data.substance.userNumber}">
    <p>Child-${data.substance.userNumber}</p>
    <span>${data.substance.time}</span>
    <p>${newerMessage}</p>
    <div class="guideSkill">
    <button class="deleteButton" type="button" name="button">delete</button>
    <button class="shunButton" type="button" name="button">shun</button>
    </div>
  </li>
  `
    } else {
      theMessage = `
  <li id="id${data.substance.msgId}" class="chatMessage c${data.substance.userNumber}">
    <p>Child-${data.substance.userNumber}</p>
    <span>${data.substance.time}</span>
    <p>${newerMessage}</p>
    <div class="guideSkill">
    <button class="deleteButton" type="button" name="button">delete</button>
    <button class="shunButton" type="button" name="button">shun</button>
    </div>
  </li>
  `
    }

    chatWindow.insertAdjacentHTML('beforeend', theMessage)
    chatWindow.scrollTop = chatWindow.scrollHeight;
    deletingTon();
    shunningTon();
  }

  // socket.on('message history', function(data) {
  // console.log(data)
  //   data.forEach(x => {
  //     const theMessage =
  //       `
  // <li class="chatMessage">
  // <p>Member-???</p>
  // <span>${x.time}</span>
  // <p>${x.msg}</p>
  // </li>
  // `
  //     chatWindow.insertAdjacentHTML('beforeend', theMessage)
  //   })
  // })

}());
