
const editFormElements = document.getElementById("editForm").getElementsByTagName('input');
// const editFormElements = document.querySelector("#editForm input");
const addFormElements = document.getElementById("addForm").getElementsByTagName('input');
// const addFormElements = document.querySelector("#addForm input");

const saveBtn = document.getElementById('saveBtn');
const addBtn = document.getElementById('addBtn');

changeEditFormStatus(false);
changeBtnStatus(addBtn,false);

for (let i = 0, len = editFormElements.length; i < len; ++i) {
    editFormElements[i].addEventListener('change', function () {
        validateFormInputs(this,editFormElements,saveBtn);
    });
}
for (let i = 0, len = addFormElements.length; i < len; ++i) {
    addFormElements[i].addEventListener('change', function () {
        validateFormInputs(this,addFormElements,addBtn);
    });
}

document.querySelectorAll('.deletePersonBtn').forEach(btn => {
    let id = btn.getAttribute("id");
    let {tdSurname, tdName, tdPatronymic, tdEmail} = getCellContent(id);
    let val = tdSurname + " " + tdName + " " + tdPatronymic + " " + tdEmail;
    btn.setAttribute("value", val);
});

function changeBtnStatus(btn,status) {
    if (status)
        btn.removeAttribute("disabled");
    else
        btn.setAttribute("disabled", !status + "");
}

function validateFormInputs(th,formElemets, btn) {
    th.value = th.value.replace(/\s/g, "");
    for (let i = 0, len = formElemets.length; i < len; ++i) {
        if (formElemets[i].value === "") {
            changeBtnStatus(btn,false);
            return;
        }
    }
    changeBtnStatus(btn,true);
}

function changeEditFormStatus(status) {
    for (let i = 0, len = editFormElements.length; i < len; ++i) {
        editFormElements[i].disabled = !status;
    }
    if(!status)
        changeBtnStatus(saveBtn,status);
}

function getCellContent(id) {
    let numId = id.replace(/\D/g, '');
    let tdSurname = document.getElementById("tdSurname" + numId).innerText;
    let tdName = document.getElementById("tdName" + numId).innerText;
    let tdPatronymic = document.getElementById("tdPatronymic" + numId).innerText;
    let tdEmail = document.getElementById("tdEmail" + numId).innerText;
    return {tdSurname, tdName, tdPatronymic, tdEmail};
}

document.querySelectorAll('.editPersonBtn').forEach(btn => {
    btn.addEventListener('click', function (event) {
        changeEditFormStatus(true);
        let id = this.getAttribute("id");
        let {tdSurname, tdName, tdPatronymic, tdEmail} = getCellContent(id);

        document.getElementById("edit-surname").value = tdSurname;
        document.getElementById("edit-name").value = tdName;
        document.getElementById("edit-patronymic").value = tdPatronymic;
        document.getElementById("edit-email").value = tdEmail;
        let val = tdSurname + " " + tdName + " " + tdPatronymic + " " + tdEmail;
        saveBtn.setAttribute("value", val);
    })
});


