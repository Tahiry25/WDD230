function toggleMenu() {
  // alert('test');
  document.getElementById("primaryNav").classList.toggle("open");
}

const x = document.getElementById("hamburgerBtn");
x.onclick = toggleMenu;

let date = new Date().toUTCString();
document.getElementById("current").innerHTML = date;

// Weather Script
const css_file = document.createElement("link");
const widgetUrl = location.href;
css_file.setAttribute("rel", "stylesheet");
css_file.setAttribute("type", "text/css");
css_file.setAttribute(
  "href",
  "https://s.bookcdn.com/css/w/booked-wzs-prime-vertical-one.css?v=0.0.1"
);
document.getElementsByTagName("head")[0].appendChild(css_file);
function setWidgetData_58454(data) {
  if (typeof data != "undefined" && data.results.length > 0) {
    for (const i = 0; i < data.results.length; ++i) {
      const objMainBlock = document.getElementById(
        "m-booked-vertical-one-prime-58454"
      );
      if (objMainBlock !== null) {
        const copyBlock = document.getElementById(
          "m-bookew-weather-copy-" + data.results[i].widget_type
        );
        objMainBlock.innerHTML = data.results[i].html_code;
        if (copyBlock !== null) objMainBlock.appendChild(copyBlock);
      }
    }
  } else {
    alert("data=undefined||data.results is empty");
  }
}
const widgetSrc =
  "https://widgets.booked.net/weather/info?action=get_weather_info;ver=7;cityID=2334;type=7;scode=124;ltid=3458;domid=w209;anc_id=71827;countday=undefined;cmetric=0;wlangID=1;color=137AE9;wwidth=294;header_color=ffffff;text_color=333333;link_color=08488D;border_form=1;footer_color=ffffff;footer_text_color=333333;transparent=0;v=0.0.1";
widgetSrc += ";ref=" + widgetUrl;
widgetSrc += ";rand_id=58454";
const weatherBookedScript = document.createElement("script");
weatherBookedScript.setAttribute("type", "text/javascript");
weatherBookedScript.src = widgetSrc;
document.body.appendChild(weatherBookedScript);
