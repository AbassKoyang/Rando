document.addEventListener('DOMContentLoaded', function() {
const nameInput = document.querySelector('.password-name-input');
const passwordInput = document.querySelector('.password-value-input');
const uppercaseCheckbox = document.querySelector('.uppercase-checkbox');
const lowercaseCheckbox = document.querySelector('.lowercase-checkbox');
const digitCheckbox = document.querySelector('.digit-checkbox');
const specialCharacterCheckbox = document.querySelector('.special-checkbox');
const generatePasswordButton = document.querySelector('.generate-password-button');
const passwordRange = document.querySelector('.password-range');
const addPasswordButton = document.querySelector('.add-new-password-button');
const passwordList = document.querySelector('.passwords-list');
const copyButtons = document.querySelectorAll('.copy-button');
const deleteButtons = document.querySelectorAll('.delete-button');

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = uppercase.toLocaleLowerCase();
const digits = '0123456789';
const specialCharacters = "!@#$%^&*()-_=+[]{}|;:'\",.<>/?`~";
let passwordLength = 8;

const generatePassword = () => {
    let password = ''
    const allCharacters = `${uppercaseCheckbox.checked ? uppercase : ''}${lowercaseCheckbox.checked ? lowercase : ''}${specialCharacterCheckbox.checked ? specialCharacters : ''}${digitCheckbox.checked ? digits : ''}`;
    if(uppercaseCheckbox.checked){
       password += uppercase[Math.floor(Math.random() * uppercase.length)];
    };
    if(lowercaseCheckbox.checked){
       password += lowercase[Math.floor(Math.random() * lowercase.length)];
    };
    if(specialCharacterCheckbox.checked){
       password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
    };
    if(digitCheckbox.checked){
       password += digits[Math.floor(Math.random() * digits.length)];
    };
    while (passwordLength > password.length) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
       };
    passwordInput.value = password;
}

generatePasswordButton.addEventListener('click', () => {
    if (uppercaseCheckbox.checked || lowercaseCheckbox.checked || specialCharacterCheckbox.checked || digitCheckbox.checked) {
        generatePassword();
    } else {
        alert('Please select at least one type of character')
    }
});

passwordRange.addEventListener('input', function () {
    document.querySelector('.password-length-display').textContent = this.value;
    passwordLength = this.value;
  });

  const savePassword = () => {
    localStorage.setItem('data', passwordList.innerHTML)
}

const showPasswords = () => {
 passwordList.innerHTML = localStorage.getItem('data')
}

addPasswordButton.addEventListener('click', () => {
    if (nameInput.value === '' || passwordInput.value === '') {
        alert('Please enter your password name and password or generate password automatically.')
    } else {
    const li = document.createElement('li');
    const passwordCon = document.createElement('div');
    const p = document.createElement('p');
    const span = document.createElement('span');
    const buttonsCon = document.createElement('div');
    const copyButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    //Adding classes to elements
    passwordCon.classList.add('password-con');
    buttonsCon.classList.add('buttons-con');
    copyButton.classList.add('copy-button');
    deleteButton.classList.add('delete-button');
    //Appending elements
    li.appendChild(passwordCon);
    li.appendChild(buttonsCon)
    passwordCon.appendChild(p);
    passwordCon.appendChild(span);
    p.textContent = nameInput.value;
    span.textContent = passwordInput.value;
    buttonsCon.appendChild(copyButton);
    buttonsCon.appendChild(deleteButton);
    copyButton.innerHTML = '<i class="ri-file-copy-line"></i>';
    deleteButton.innerHTML = '<i class="ri-delete-bin-line"></i>';
    
    // li.innerHTML =
    //     `<div class="password-con">
    //         <p>${nameInput.value}</p>
    //         <span>${passwordInput.value}</span>
    //     </div>
    //     <div class="buttons-con">
    //         <button class="copy-button"><i class="ri-file-copy-line"></i></button>
    //         <button class="delete-button"><i class="ri-delete-bin-line"></i></button>
    //     </div>`;
    passwordList.appendChild(li);
    passwordInput.value = '';
    nameInput.value = '';
    savePassword();
    }
  });

  const deleteOrCopyPassword = (event) => {
    const target = event.target;
    if (target.classList.contains('copy-button')) {
      const passwordSpan = target.parentElement.parentElement.querySelector('.password-con span');
      navigator.clipboard.writeText(passwordSpan.textContent);
      console.log('Password span',passwordSpan)
    }
    if (target.classList.contains('delete-button')) {
        const hasConfirmed = confirm('Are you sure you want to delete this password.');
        if (hasConfirmed) {
            const listItem = target.parentElement.parentElement;
            listItem.remove();
            savePassword();
        }
    }
  };

  passwordList.addEventListener('click', deleteOrCopyPassword);

// //   deleteButtons.forEach(function (button) {
// //     button.addEventListener('click', function () {
        
// //     });
//   });
showPasswords();
})