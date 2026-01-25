function RecycleBin() {
    window.location.href = "RecycleBin.html";
}

function BackWindows() {
    window.location.href = "index.html";
}
const customMenu = document.getElementById("customMenu");

const initialIcons = [
    {
        id: "webstorm",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/WebStorm_Icon.svg/250px-WebStorm_Icon.svg.png",
        alt: "WebStorm",
        className: "desktop-icon"
    },
    {
        id: "file",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Windows_Explorer.svg/1024px-Windows_Explorer.svg.png",
        alt: "File Explorer",
        className: "desktop-icon"
    }
];

if (!localStorage.getItem("restoredFiles")) {
    localStorage.setItem("restoredFiles", JSON.stringify(initialIcons));
}

window.addEventListener("load", renderDesktop);

function renderDesktop() {
    const container = document.getElementById("icons");
    container.innerHTML = "";

    const restoredFiles = JSON.parse(localStorage.getItem("restoredFiles") || "[]");
    const deletedFiles = JSON.parse(localStorage.getItem("deletedFiles") || "[]");
    console.log(restoredFiles)
    console.log(deletedFiles)
    const deletedIds = deletedFiles.map(f => f.id);

    let clickedElement = null;

    restoredFiles.forEach(file => {
        if (deletedIds.includes(file.id)) return;
        if (document.getElementById(file.id)) return;
        const img = document.createElement("img");
        img.src = file.src;
        img.alt = file.alt;
        img.id = file.id;
        img.className = file.className;
        container.appendChild(img);


        img.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            clickedElement = img;
            customMenu.style.top = `${event.pageY}px`;
            customMenu.style.left = `${event.pageX}px`;
            customMenu.style.display = "block";
        });
    });

    document.addEventListener("click", () => {
        customMenu.style.display = "none";
    });


    const deleteOption = document.getElementById("deleteOption");
    deleteOption.onclick = () => {
        if (!clickedElement) return;
        const deletedFiles = JSON.parse(localStorage.getItem("deletedFiles") || "[]");
        deletedFiles.push({
            id: clickedElement.id,
            src: clickedElement.src,
            alt: clickedElement.alt,
            className: clickedElement.className
        });
        localStorage.setItem("deletedFiles", JSON.stringify(deletedFiles));

        renderDesktop();
        customMenu.style.display = "none";
    };
}



function recycleBinPage() {
    const recycleBinContainer = document.getElementById("recycleBin");
    recycleBinContainer.innerHTML = ""; // clear any previous icons

    const deletedFiles = JSON.parse(localStorage.getItem("deletedFiles") || "[]");
    let clickedElement = null;

    deletedFiles.forEach(file => {
        const img = document.createElement("img");
        img.src = file.src;
        img.alt = file.alt;
        img.id = file.id;
        img.className = file.className;
        recycleBinContainer.appendChild(img);


        img.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            clickedElement = img;
            customMenu.style.top = `${event.pageY}px`;
            customMenu.style.left = `${event.pageX}px`;
            customMenu.style.display = "block";
        });
    });


    document.addEventListener("click", () => {
        customMenu.style.display = "none";
    });

    const restoreOption = document.getElementById("restoreOption");
    restoreOption.onclick = () => {
        if (!clickedElement) return;

        const restoredFiles = JSON.parse(localStorage.getItem("restoredFiles") || "[]");
        restoredFiles.push({
            id: clickedElement.id,
            src: clickedElement.src,
            alt: clickedElement.alt,
            className: clickedElement.className
        });
        localStorage.setItem("restoredFiles", JSON.stringify(restoredFiles));

        const updatedDeleted = deletedFiles.filter(f => f.id !== clickedElement.id);
        localStorage.setItem("deletedFiles", JSON.stringify(updatedDeleted));

        clickedElement.remove();
        customMenu.style.display = "none";
    };
}