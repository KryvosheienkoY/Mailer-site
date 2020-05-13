const textField = document.getElementById('letter-send-text');
const subjectField = document.getElementById('letter-send-subject');

document.querySelectorAll('.js-select-letter').forEach(input => {
    input.addEventListener('change', function (event) {
        textField.value = this.dataset.text;
        subjectField.value = this.dataset.subject;
    });
});
