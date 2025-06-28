let darkMode = localStorage.getItem('darkMode');

let themeSwitch = document.getElementById('theme-switch');

const enableDarkMode = () => {
  document.body.classList.add('darkMode');
  localStorage.setItem('darkMode',  'active');
};


const disableDarkMode = () => {
  document.body.classList.remove('darkMode');
  localStorage.removeItem('darkMode',  null);
};

if (darkMode == 'active')
   enableDarkMode()
   
themeSwitch.addEventListener('click', () => {
  darkMode = localStorage.getItem('darkMode');
  darkMode !== 'active' ? 
  enableDarkMode() : 
   disableDarkMode()
})