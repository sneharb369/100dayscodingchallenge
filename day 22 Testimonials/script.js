(function () {
  const name = document.querySelector(".customer-name");
  const text = document.querySelector(".text");
  const btn = document.querySelectorAll(".btn");

  let index = 0;
  const customers = [];

  function Customer(nameOfCus, textOfCus) {
    this.nameOfCus = nameOfCus;
    this.textOfCus = textOfCus;
  }

  function creatingCustomer(nameOfCus, textOfCus) {
    let customer = new Customer(nameOfCus, textOfCus);

    customers.push(customer);
  }

  creatingCustomer(
    "Bill Gates",
    "It's fine to celebrate success, but it is more important to heed the lessons of failure."
  );
  creatingCustomer(
    "Jeff Bezos",
    "Good intentions don't work, mechanisms do"
  );
  creatingCustomer(
    "Elon Musk",
    "Some people don't like change, but you need to embrace change if the alternative is disaster"
  );
  creatingCustomer(
    "Mark Zuckerberg",
    "The biggest risk is not taking any risk in a world that is changing really quickly, the only strategy that is guaranteed to fail is not taking risks"
  );
  creatingCustomer(
    "Steve Jobs",
    "Innovation distinguishes between a leader and a follower."
  );

  btn.forEach(function (button) {
    button.addEventListener("click", function (e) {
      if (e.target.parentElement.classList.contains("prev")) {
        if (index === 0) {
          index = customers.length;
        }
        index--;
        name.textContent = customers[index].nameOfCus;
        text.textContent = customers[index].textOfCus;
      }
      if (e.target.parentElement.classList.contains("next")) {
        index++;
        if (index === customers.length) {
          index = 0;
        }
        name.textContent = customers[index].nameOfCus;
        text.textContent = customers[index].textOfCus;
      }
    });
  });
})();
