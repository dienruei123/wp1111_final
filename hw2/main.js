const member_name = {
  member1: "許景淯",
  member2: "網服好簡單",
  member3: "丙申",
  member4: "你知道這是什麼嗎？",
  member5: "死線",
  member6: "海綿寶寶",
  member7: "均包",
  member8: "起司",
  member9: "大魔王",
  member10: "馬力歐",
  member11: "掛機仔",
  member12: "躺分大師",
  member13: "爆哥拿冠軍了！",
  member14: "小智",
  member15: "彭教授",
};
var vacant_member = [];

const init = () => {
  for (var i = 0; i < Object.keys(member_name).length; i++) {
    vacant_member.push(i + 1);
  }
  var num = getRndInteger(0, 15);
  for (var i = 0; i < num; i++) {
    create_member(choose_random());
  }

  const Time = () => {
    let currentDate = new Date();
    let time = currentDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    // console.log(time);
    document.getElementById("currentTime").innerHTML = time;
    setTimeout(Time, 10000);
  };
  Time();
  if (num === 0) {
    pin("self");
  }
  sizing();
  member_count();
};
const member_count = () => {
  var num = Object.keys(member_name).length - vacant_member.length + 1;
  document.getElementsByClassName(
    "google-meet__footer-member-count"
  )[0].innerHTML = num;
};
const is_pinned = () => {
  return !document
    .getElementsByClassName("google-meet__self")[0]
    .classList.contains("hidden");
};
const sizing = () => {
  if (is_pinned()) {
    var pinned = document.getElementsByClassName("google-meet__self-block")[0];
    pinned.classList = "";
    pinned.classList.add("google-meet__self-block");
    if (
      pinned
        .getElementsByClassName("google-meet__self-profile-pic")[0]
        .classList.contains("google-meet__member-profile-pic-larger")
    ) {
      pinned
        .getElementsByClassName("google-meet__self-profile-pic")[0]
        .classList.remove("google-meet__member-profile-pic-larger");
    }
  }
  const member_num =
    Object.keys(member_name).length -
    vacant_member.length +
    (is_pinned() ? 0 : 1);
  var hori = Math.ceil(Math.sqrt(member_num));
  if (is_pinned())
    hori = Math.ceil(Math.sqrt(Math.max(member_num / 1.18 - 2, 1)));
  var vert = Math.ceil(member_num / hori);
  var members = document.getElementsByClassName("google-meet__member");
  [].forEach.call(members, (element) => {
    element.classList = "";
    element.classList.add("google-meet__member");
    element.classList.add(`google-meet__member_width${hori}`);
    element.classList.add(`google-meet__member_height${vert}`);
  });
  var modify = hori * vert - member_num;
  if (modify != 0) modify = hori - modify;
  // console.log(modify);
  for (var i = member_num - modify; i < member_num; i++) {
    members[i].classList.add(`google-meet__member_width_mod${modify}`);
  }
  if (member_num + (is_pinned() ? 1 : 0) <= 2) {
    // console.log(member_num + (is_pinned() ? 1 : 0));
    [].forEach.call(members, (element) => {
      var node = element.getElementsByClassName(
        "google-meet__member-profile"
      )[0].firstElementChild;
      if (node.classList.contains("google-meet__member-profile-pic")) {
        node.classList.remove("google-meet__member-profile-pic");
        node.classList.add("google-meet__member-profile-pic-larger");
      }
    });
  } else {
    [].forEach.call(members, (element) => {
      var node = element.getElementsByClassName(
        "google-meet__member-profile"
      )[0].firstElementChild;
      if (node.classList.contains("google-meet__member-profile-pic-larger")) {
        node.classList.remove("google-meet__member-profile-pic-larger");
        node.classList.add("google-meet__member-profile-pic");
      }
    });
  }
};

const create_member = (member) => {
  if (member === false) {
    return;
  }
  let div = 'document.createElement("div")';
  let img = 'document.createElement("img")';
  let input = 'document.createElement("input")';
  let label = 'document.createElement("label")';
  let span = 'document.createElement("span")';

  let root = document
    .getElementsByClassName("google-meet__members")[0]
    .appendChild(eval(div));
  root.setAttribute("id", member);
  root.setAttribute("class", "google-meet__member");
  // console.log(root);

  // header
  let header = root.appendChild(eval(div));
  header.setAttribute("class", "google-meet__member-header");
  header = header.appendChild(eval(div));
  header.setAttribute("class", "google-meet__delete");
  header.setAttribute("onclick", `delete_member('${member}')`);

  let image = header.appendChild(eval(img));
  image.setAttribute("src", "./images/delete-button.png");
  image.setAttribute("draggable", false);
  image.setAttribute("alt", "delete");
  image.setAttribute("width", 25);
  image.setAttribute("height", 25);

  header = header.parentNode.appendChild(eval(div));
  header.setAttribute("class", "google-meet__mute");
  image = header.appendChild(eval(img));
  image.setAttribute("src", "./images/mute.png");
  image.setAttribute("draggable", false);
  image.setAttribute("alt", "muted");
  image.setAttribute("width", 20);
  image.setAttribute("height", 20);

  // profile
  let profile = root.appendChild(eval(div));
  profile.setAttribute("class", "google-meet__member-profile");
  profile = profile.appendChild(eval(div));
  profile.setAttribute("class", "google-meet__member-profile-pic");
  image = profile.appendChild(eval(img));
  image.setAttribute("src", `./images/${member}.png`);
  image.setAttribute("draggable", false);
  image.setAttribute("alt", member);
  image.setAttribute("width", 60);
  image.setAttribute("height", 60);

  // footer
  let footer = root.appendChild(eval(div));
  footer.setAttribute("class", "google-meet__member-footer");
  footer = footer.appendChild(eval(div));
  footer.setAttribute("class", "google-meet__member-footer-text");
  footer.appendChild(
    eval(span)
  ).innerHTML = `&nbsp;&nbsp;${member_name[member]}`;

  // member-options
  let options = root.appendChild(eval(div));
  options.setAttribute("class", "google-meet__member-options");
  options.setAttribute("onclick", `pin('${member}')`);

  options = options.appendChild(eval(div));
  options.setAttribute("class", "google-meet__member-options-button");
  image = options.appendChild(eval(img));
  image.setAttribute("src", `./images/pin.png`);
  image.setAttribute("draggable", false);
  image.setAttribute("alt", "pin yourself");
  image.setAttribute("width", 25);
  image.setAttribute("height", 25);
  let input_ = options.appendChild(eval(input));
  input_.setAttribute("type", "checkbox");
  input_.setAttribute("id", "member-option-pin");
  let label_ = options.appendChild(eval(label));
  label_.setAttribute("for", "member-option-pin");

  options = options.parentNode.appendChild(eval(div));
  options.setAttribute("class", "google-meet__member-options-button");
  image = options.appendChild(eval(img));
  image.setAttribute("src", `./images/mute.png`);
  image.setAttribute("draggable", false);
  image.setAttribute("alt", "mute the member");
  image.setAttribute("width", 20);
  image.setAttribute("height", 20);
  input_ = options.appendChild(eval(input));
  input_.setAttribute("type", "checkbox");
  input_.setAttribute("id", "member-option-mute");
  label_ = options.appendChild(eval(label));
  label_.setAttribute("for", "member-option-mute");

  options = options.parentNode.appendChild(eval(div));
  options.setAttribute("class", "google-meet__member-options-button");
  image = options.appendChild(eval(img));
  image.setAttribute("src", `./images/remove.png`);
  image.setAttribute("draggable", false);
  image.setAttribute("alt", "remove the member from the meet");
  image.setAttribute("width", 20);
  image.setAttribute("height", 20);
  input_ = options.appendChild(eval(input));
  input_.setAttribute("type", "checkbox");
  input_.setAttribute("id", "member-option-remove");
  label_ = options.appendChild(eval(label));
  label_.setAttribute("for", "member-option-remove");

  sizing();
  member_count();
};
const delete_member = (member) => {
  // console.log(member.match(/(\d+)/)[0]);
  if (member != "self") {
    vacant_member.push(parseInt(member.match(/(\d+)/)[0]));
  }

  if (
    document
      .getElementById(member)
      .classList.contains("google-meet__self-block")
  ) {
    document
      .getElementsByClassName("google-meet__members")[0]
      .classList.add("google-meet__full");
    document
      .getElementsByClassName("google-meet__self")[0]
      .classList.add("hidden");
  }

  // console.log(vacant_member);
  document.getElementById(member).remove();

  if (vacant_member.length === Object.keys(member_name).length) {
    if (
      document.getElementsByClassName("google-meet__self")[0]
        .childElementCount != 0
    ) {
      pin(
        document.getElementsByClassName("google-meet__self")[0]
          .firstElementChild.id
      );
    }
    document
      .getElementsByClassName("google-meet__members")[0]
      .classList.add("google-meet__full");
    document
      .getElementsByClassName("google-meet__self")[0]
      .classList.add("hidden");
  }
  sizing();
  member_count();
};
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const choose_random = () => {
  if (vacant_member.length === 0) {
    alert("Max number of members reached!!");
    return false;
  }
  var pos = getRndInteger(1, vacant_member.length);
  var num = vacant_member[pos - 1];
  // console.log(num, vacant_member, vacant_member[pos - 1]);
  vacant_member.splice(pos - 1, 1);
  return `member${num}`;
};

const pin = (member) => {
  // console.log(member);
  // console.log(
  //   document.getElementsByClassName("google-meet__self")[0].firstElementChild.id
  // );
  if (vacant_member.length === Object.keys(member_name).length) {
    if (
      document.getElementsByClassName("google-meet__self")[0]
        .childElementCount != 0
    ) {
      // remove block in self-block(only self)
      document
        .getElementsByClassName("google-meet__self")[0]
        .classList.add("hidden");
      document
        .getElementsByClassName("google-meet__members")[0]
        .classList.add("google-meet__full");
      let member_node = document.getElementById(member);
      member_node.classList.remove("google-meet__self-block");
      member_node.classList.add("google-meet__member");

      var img_size = member_node.getElementsByClassName(
        "google-meet__self-profile"
      )[0];
      img_size.classList.remove("google-meet__self-profile");
      img_size.classList.add("google-meet__member-profile");
      img_size = img_size.firstElementChild;
      img_size.classList.remove("google-meet__self-profile-pic");
      img_size.classList.add("google-meet__member-profile-pic");

      var footer = member_node.getElementsByClassName(
        "google-meet__self-footer"
      )[0];
      footer.innerHTML = "";
      footer = add_footer(footer, member);

      member_node = member_node.cloneNode(true);
      document.getElementById(member).remove();
      document
        .getElementsByClassName("google-meet__members")[0]
        .appendChild(member_node);
    }
    return;
  }

  if (
    document.getElementsByClassName("google-meet__self")[0]
      .childElementCount === 0
  ) {
    // self-block is empty
    document
      .getElementsByClassName("google-meet__self")[0]
      .classList.remove("hidden");
    document
      .getElementsByClassName("google-meet__members")[0]
      .classList.remove("google-meet__full");
    let member_node = document.getElementById(member);
    member_node.classList.remove("google-meet__member");
    member_node.classList.add("google-meet__self-block");
    var img_size = member_node.getElementsByClassName(
      "google-meet__member-profile"
    )[0];
    img_size.classList.add("google-meet__self-profile");
    img_size.classList.remove("google-meet__member-profile");
    img_size = img_size.firstElementChild;
    img_size.classList.add("google-meet__self-profile-pic");
    img_size.classList.remove("google-meet__member-profile-pic");

    var footer = member_node.getElementsByClassName(
      "google-meet__member-footer"
    )[0];
    footer.innerHTML = "";
    footer = add_self_footer(footer, member);

    member_node = member_node.cloneNode(true);
    document.getElementById(member).remove();
    document
      .getElementsByClassName("google-meet__self")[0]
      .appendChild(member_node);
  } else if (
    document.getElementsByClassName("google-meet__self")[0].firstElementChild
      .id === member
  ) {
    // remove block in self-block
    document
      .getElementsByClassName("google-meet__self")[0]
      .classList.add("hidden");
    document
      .getElementsByClassName("google-meet__members")[0]
      .classList.add("google-meet__full");
    let member_node = document.getElementById(member);
    member_node.classList.remove("google-meet__self-block");
    member_node.classList.add("google-meet__member");

    var img_size = member_node.getElementsByClassName(
      "google-meet__self-profile"
    )[0];
    img_size.classList.remove("google-meet__self-profile");
    img_size.classList.add("google-meet__member-profile");
    img_size = img_size.firstElementChild;
    img_size.classList.remove("google-meet__self-profile-pic");
    img_size.classList.add("google-meet__member-profile-pic");

    var footer = member_node.getElementsByClassName(
      "google-meet__self-footer"
    )[0];
    footer.innerHTML = "";
    footer = add_footer(footer, member);

    member_node = member_node.cloneNode(true);
    document.getElementById(member).remove();
    document
      .getElementsByClassName("google-meet__members")[0]
      .appendChild(member_node);
  } else {
    let pin_node = document.getElementsByClassName(
      "google-meet__self-block"
    )[0];
    pin_node.classList.remove("google-meet__self-block");
    pin_node.classList.add("google-meet__member");
    const pin_id = pin_node.id;

    var pin_img_size = pin_node.getElementsByClassName(
      "google-meet__self-profile"
    )[0];
    pin_img_size.classList.remove("google-meet__self-profile");
    pin_img_size.classList.add("google-meet__member-profile");
    pin_img_size = pin_img_size.firstElementChild;
    pin_img_size.classList.remove("google-meet__self-profile-pic");
    pin_img_size.classList.add("google-meet__member-profile-pic");

    var pin_footer = pin_node.getElementsByClassName(
      "google-meet__self-footer"
    )[0];
    pin_footer.innerHTML = "";
    pin_footer = add_footer(pin_footer, pin_id);

    pin_node = pin_node.cloneNode(true);
    document.getElementById(pin_id).remove();
    document
      .getElementsByClassName("google-meet__members")[0]
      .appendChild(pin_node);

    let member_node = document.getElementById(member);
    member_node.classList.remove("google-meet__member");
    member_node.classList.add("google-meet__self-block");

    var img_size = member_node.getElementsByClassName(
      "google-meet__member-profile"
    )[0];
    img_size.classList.add("google-meet__self-profile");
    img_size.classList.remove("google-meet__member-profile");
    img_size = img_size.firstElementChild;
    img_size.classList.add("google-meet__self-profile-pic");
    img_size.classList.remove("google-meet__member-profile-pic");

    var footer = member_node.getElementsByClassName(
      "google-meet__member-footer"
    )[0];
    footer.innerHTML = "";
    footer = add_self_footer(footer, member);

    member_node = member_node.cloneNode(true);
    document.getElementById(member).remove();
    document
      .getElementsByClassName("google-meet__self")[0]
      .appendChild(member_node);
  }

  sizing();
};
const close_window = () => {
  if (confirm("Leave meet?")) {
    window.close();
  }
};

const add_self_footer = (node, member) => {
  node.classList.add("google-meet__self-footer");
  node.classList.remove("google-meet__member-footer");
  node = node.appendChild(document.createElement("div"));
  node.setAttribute("class", "google-meet__self-footer-text");
  node.appendChild(document.createElement("p")).innerHTML = "&nbsp;&nbsp;";

  var image = node.appendChild(document.createElement("img"));
  image.setAttribute("src", "./images/pin.png");
  image.setAttribute("draggable", false);
  image.setAttribute("alt", "pinned");
  image.setAttribute("width", 30);
  image.setAttribute("height", 30);

  var text = node.appendChild(document.createElement("span"));
  if (member === "self") {
    text.innerHTML = "&nbsp;&nbsp;你";
  } else {
    text.innerHTML = `&nbsp;&nbsp;${member_name[member]}`;
  }
  return node;
};
const add_footer = (node, member) => {
  node.classList.remove("google-meet__self-footer");
  node.classList.add("google-meet__member-footer");
  node = node.appendChild(document.createElement("div"));
  node.setAttribute("class", "google-meet__member-footer-text");

  var text = node.appendChild(document.createElement("span"));
  if (member === "self") {
    text.innerHTML = "&nbsp;&nbsp;你";
  } else {
    text.innerHTML = `&nbsp;&nbsp;${member_name[member]}`;
  }
  return node;
};
