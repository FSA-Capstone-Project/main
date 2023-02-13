


function textAiCall(message) {
  fetch("http://localhost:3002/text-completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })
    .then((res) => res.json())
      .then((data) => {
      return (data.message);
    });
}

export default textAiCall;
