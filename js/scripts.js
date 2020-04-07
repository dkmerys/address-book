// Business Logic for AddressBook ------------
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId(); 
  this.contacts.push(contact);
}



AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i<this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id ==id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ------------
function Emails(personalEmail, workEmail) {
  this.personalEmail = personalEmail;
  this.workEmail = workEmail;
}

function Contact(firstName, lastName, phoneNumber, emails, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emails = emails;
  this.physicalAddress = physicalAddress;
  // this.personalEmail = personalEmail;
  // this.workEmail = workEmail;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Front-end logic
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay){
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id =" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};
// $(function() {
//   $("#myForm").submit(function() {
//     $("#myForm *").filter(":input").each(function(){
//       if ($(this).val() == '')
//         $(this).prop("disabled", true);
//     });

//     return true; // ensure form still submits
//   });
// });


function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  if(contact.firstName) {
    $(".first-name").html("<p>First Name: " + contact.firstName + "</p>");
  };
  if(contact.lastName) {
    $(".last-name").html("<p>Last Name: " + contact.lastName + "</p>");
  };
  if(contact.phoneNumber) {
    $(".phone-number").html("<p>Phone Number: " + contact.phoneNumber + "</p>");
  };
  if(contact.physicalAddress) {
    $(".physical-address").html("<p>Physical Address: " + contact.physicalAddress + "</p>");
  };
  if(contact.emails.personalEmail || contact.emails.workEmail) {
    $(".email-list").html("<p>Emails:</p>");
  };
  if(contact.emails.personalEmail) {
    $(".personal-email").html("<li>" + contact.emails.personalEmail + "</li>");
  };
  if(contact.emails.workEmail) {
    $(".work-email").html("<li>" + contact.emails.workEmail + "</li>");
  };
  

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedPersonalEmail = $("input#new-personal-email").val();
    var inputtedWorkEmail = $("input#new-work-email").val();
    var inputtedPhysicalAddress = $("input#new-physical-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-personal-email").val("");
    $("input#new-work-email").val("");
    $("input#new-physical-address").val("");
    

    var emails = new Emails(inputtedPersonalEmail, inputtedWorkEmail);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, emails, inputtedPhysicalAddress);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})