const elements = {
  form: document.querySelector('.feedback-form'),
  fields: document.querySelectorAll(
    '.feedback-form input, .feedback-form textarea'
  ),
  submitButton: document.querySelector('.feedback-form button'),
};

elements.fields.forEach(field => {
  field.classList.add('input-field');
  if (field.tagName === 'TEXTAREA') {
    field.classList.add('textarea');
  }
});
elements.submitButton.classList.add('submit-btn');

const STORAGE_KEY = 'feedback-form-data';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

const populateFields = () => {
  elements.fields.forEach(field => {
    if (formData[field.name]) {
      field.value = formData[field.name];
    }
  });
};

populateFields();

const saveInput = event => {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const handleSubmit = event => {
  event.preventDefault();

  const { email = '', message = '' } = formData;
  if (!email || !message) {
    alert('Please fill in all fields.');
    return;
  }

  console.log('Submitted data:', formData);

  localStorage.removeItem(STORAGE_KEY);
  event.target.reset();
  formData = {};
};

elements.form.addEventListener('input', saveInput);
elements.form.addEventListener('submit', handleSubmit);
