const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [{
    logo: "A",
    url: "https://www.acfun.cn"
  },
  {
    logo: "B",
    url: "https://www.bilibili.com"
  }
];
const simplifyUrl = url => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除/开头的内容到结尾
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    console.log(index);
    const $li = $(`<li>
            <div class="site">
              <div class="logo">${node.logo}</div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
                <svg class="icon">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </div>
            </div>
    <li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", e => {
      e.stopPropagation(); //阻止冒泡
      console.log(hashMap);
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请问你要添加的网址是什么？");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logotype: "text",
    url: url
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};