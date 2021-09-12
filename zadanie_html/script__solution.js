(function () {
  "use strict";
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formValues = new FormData(e.target);
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: JSON.stringify({
        firstName: formValues.get("firstName"),
        lastName: formValues.get("lastName"),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        document.querySelector(".form__feedback").innerHTML = res.data;
      });
  });
})();
