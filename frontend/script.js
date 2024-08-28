const addButton = document.getElementById("add");


// Localstorage function
const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    console.log(textAreaData)

    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });
    console.log(notes);

    localStorage.setItem("notes", JSON.stringify(notes))
}

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");

  const htmlData = `
    <div class="operation">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea> `;

  note.insertAdjacentHTML("afterbegin", htmlData);

  // Getting the references
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // Deleting the node
  delButton.addEventListener('click', () => {
    note.remove();
  })

  // Toggle using edit button
  textArea.value = text;
  mainDiv.innerHTML = text;

  editButton.addEventListener('click', () => {
    mainDiv.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  })

  textArea.addEventListener('change', (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;

    //Localstorage data function call
    updateLSData();
  })

  document.body.appendChild(note);
};

// Fetching data from localStorage
const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) {notes.forEach((note) => addNewNote(note))}

addButton.addEventListener("click", () => addNewNote());
