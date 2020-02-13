let projectType,
  buildingType,
  complexity,
  size,
  design,
  floor,
  firstname,
  lastname,
  email,
  agree;

let stepOne = select("step-one");
let stepTwo = select("step-two");
let stepThree = select("step-three");
let stepFour = select("step-four");

//selector function

function select(x) {
  return document.getElementById(x);
}

function getName(x) {
  return document.getElementsByName(x);
}

//getting the design checkboxes
design = getName("deliverables");

//processing and validating step-one
function processStepOne() {
  valid = false;
  projectType = getName("projectType");

  //going through all of the radio buttons
  for (let i = 0, length = projectType.length; i < length; i++) {
    //checking if one of them is checked
    if (projectType[i].checked) {
      // if one of them is checked then "valid" turns "true"
      valid = true;

      //don't check the rest after getting the one that is checked
      break;
    }
  }

  window.projectError = select("projectError");

  if (valid) {
    //if valid is true display the next section of form
    stepOne.style.display = "none";
    stepTwo.style.display = "block";
  } else {
    // if valid is not true display error message
    window.projectError.innerHTML = "Please choose one of the options";
    return false;
  }
}

select("nextOne").addEventListener("click", processStepOne);

document.querySelectorAll(".projectType").forEach(item => {
  item.addEventListener("click", function projectErrorOff() {
    if (window.projectError.innerHTML) {
      window.projectError.innerHTML = "";
    }
  });
});

//processing and validating step two

function processStepTwo() {
  valid = false;
  buildingType = getName("buildType");

  //going through all of the radio buttons
  for (let i = 0, length = buildingType.length; i < length; i++) {
    //checking if one of them is checked
    if (buildingType[i].checked) {
      // if one of them is checked then "valid" turns "true"
      valid = true;

      //don't check the rest after getting the one that is checked
      break;
    }
  }

  let buildingError = select("buildingError");
  if (valid) {
    //if valid is true display the next section of form
    if (buildingError.innerHTML) {
      buildingError.innerHTML = "";
    }
    stepTwo.style.display = "none";
    stepThree.style.display = "block";
  } else {
    // if valid is not true display error message
    buildingError.innerHTML = "Please choose one of the options";
    return false;
  }
}

select("nextTwo").addEventListener("click", processStepTwo);

document.querySelectorAll(".buildType").forEach(item => {
  item.addEventListener("click", function buildingErrorOff() {
    if (buildingError.innerHTML) {
      buildingError.innerHTML = "";
    }
  });
});

//processing and validating step three

function processStepThree() {
  validSize = false;
  validDesign = false;

  //selection project complexity dropdown
  let e = select("complexity");

  //getting the value of the dropdown
  complexity = e.options[e.selectedIndex].value;

  //getting value of "size"
  size = select("size").value;

  //if the "size" input is empty or it is not a number then it gives and error message
  if (size == "" || isNaN(size)) {
    select("sizeError").innerHTML = "Please fill out this section";
  }

  //otherwise it validates
  else {
    validSize = true;
  }

  //going through all of the checkboxes
  for (let i = 0; i < design.length; i++) {
    //checking if one of them is checked
    if (design[i].checked) {
      // if one of them is checked then "valid" turns "true" --------------------------------- put API stuff here??
      validDesign = true;
    }
  }

  if (!validDesign) {
    select("designError").innerHTML = "Please choose one of the options";
    return false;
  }

  //selection project complexity dropdown
  let n = select("floor");

  //getting the value of the dropdown
  floor = n.options[n.selectedIndex].value;

  if (validSize && validDesign) {
    stepThree.style.display = "none";
    stepFour.style.display = "block";
  }
}

select("nextThree").addEventListener("click", processStepThree);

//checkbox that checks all the checkboxes that are in the design section
select("design-all").addEventListener("click", function checkAll() {
  let i;
  if (this.checked) {
    for (i = 0; i < design.length; i++) {
      design[i].checked = this.checked;
    }
  } else {
    for (i = 0; i < design.length; i++) {
      design[i].checked = this.checked;
    }
  }
});

select("size").addEventListener("keypress", function sizeErrorOff() {
  if (sizeError.innerHTML) {
    sizeError.innerHTML = "";
  }
});

document.querySelectorAll(".deliverables").forEach(item => {
  item.addEventListener("click", function designErrorOff() {
    if (designError.innerHTML) {
      designError.innerHTML = "";
    }
  });
});

//processing and validating step four

function processStepFour() {
  validEmail = false;
  validFirstName = false;
  validLastName = false;

  firstname = select("firstName").value;
  lastname = select("lastName").value;
  email = select("email").value;

  firstnameError = select("firstnameError");
  lastnameError = select("lastnameError");
  emailError = select("emailError");

  let emailRegX = /^([a-z\d\.-])+@([a-z\d-])+\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  let firstNameRegX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  let lastNameRegX = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

  if (firstNameRegX.test(firstname)) {
    validFirstName = true;
  } else {
    firstnameError.innerHTML = "First Name is not valid";
  }

  if (lastNameRegX.test(lastname)) {
    validLastName = true;
  } else {
    lastnameError.innerHTML = "Last Name is not valid";
  }

  if (emailRegX.test(email)) {
    validEmail = true;
  } else {
    emailError.innerHTML = "Email is not valid";
  }
}

select("nextFour").addEventListener("click", processStepFour);

select("firstName").addEventListener("keypress", function firstNameErrorOff() {
  if (firstnameError.innerHTML) {
    firstnameError.innerHTML = "";
  }
});

select("lastName").addEventListener("keypress", function lastNameErrorOff() {
  if (lastnameError.innerHTML) {
    lastnameError.innerHTML = "";
  }
});

select("email").addEventListener("keypress", function emailErrorOff() {
  if (emailError.innerHTML) {
    emailError.innerHTML = "";
  }
});

let form = select("form");
let object = {};

agree = select("agree-two");

let agreeError = select("agreeError");

//submitting form/preventing reload
form.addEventListener("submit", function(e) {
  e.preventDefault();
  //console.log($(this).serializeArray());
  // const formData = new FormData(this);

  //turning form data into JSON
  // formData.forEach(function(value, key) {
  //   object[key] = value;
  // });

  // let projectInfromation = document.querySelectorAll(".step");

  // for (let i = 0; i < projectInfromation.length; i++) {
  //   objectTwo.push(projectInfromation[i].value);
  // }

  // let json = JSON.stringify(object);

  //Terms and Coniditions validation
  // if (!agree.checked) {
  //   agreeError.innerHTML =
  //     "You must agree to the Terms and Conditions to continue";
  // }
  // if (agree.checked && validEmail && validFirstName && validLastName) {
  //   console.log(json);
  // }
});

agree.addEventListener("click", function agreeErrorOff() {
  if (agreeError.innerHTML) {
    agreeError.innerHTML = "";
  }
});

//Previous button functions
function prevOne() {
  stepTwo.style.display = "none";
  stepOne.style.display = "block";
}

select("prevOne").addEventListener("click", prevOne);

function prevTwo() {
  stepThree.style.display = "none";
  stepTwo.style.display = "block";
}

select("prevTwo").addEventListener("click", prevTwo);

function prevThree() {
  stepFour.style.display = "none";
  stepThree.style.display = "block";
}

select("prevThree").addEventListener("click", prevThree);
