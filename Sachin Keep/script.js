const addBtn = document.querySelector("#add");

const upadteLSDData = () => {
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });
    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addNewNote = (text = "") => {

    const note = document.createElement("div");
    note.classList.add("note");

    const htmlData = `
    <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class='main ${text ? "" : "hidden"}'></div>
            <textarea class='${text ? "hidden" : ""}'></textarea>
    `;

    note.insertAdjacentHTML("afterbegin", htmlData);
    // console.log(note);

    //getting refrences
    const editBtn = note.querySelector(".edit");
    const delBtn = note.querySelector(".delete");
    const mainDiv = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    //delete the data
    delBtn.addEventListener("click", () => {
        note.remove();
        upadteLSDData();
    });

    //toggle using edit

    textArea.value = text;
    mainDiv.innerHTML = text;

    editBtn.addEventListener("click", () => {
        mainDiv.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    textArea.addEventListener("change", (event) => {
        const value = event.target.value;
        console.log(value);
        mainDiv.innerHTML = value;

        upadteLSDData();
    });


    document.body.appendChild(note);
}

// getting dtat back from local storage 
const notes = JSON.parse(localStorage.getItem('notes'));

if (notes) { notes.forEach((note) => addNewNote(note)) };

addBtn.addEventListener("click", () => addNewNote());


