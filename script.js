let addIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
<path id="ic_add_24px" d="M23,15.286H15.286V23H12.714V15.286H5V12.714h7.714V5h2.571v7.714H23Z" transform="translate(-5 -5)"/>
</svg>`

let subIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="2" viewBox="0 0 18 2">
<path id="ic_remove_24px" d="M23,13H5V11H23Z" transform="translate(-5 -11)"/>
</svg>`

let addIcons = document.querySelectorAll('.add-icon');
addIcons.forEach(function (icon){
    icon.innerHTML = addIcon
    if (Array.from(icon.classList).indexOf('small-icon') !== -1) {
        smallIcon = addIcon.replace('width="14"', 'width="10"')
        icon.innerHTML = smallIcon;
    }
});

let subIcons = document.querySelectorAll('.sub-icon');
subIcons.forEach(function (icon){
    icon.innerHTML = subIcon
    if (Array.from(icon.classList).indexOf('small-icon') !== -1) {
        smallIcon = subIcon.replace('width="14"', 'width="10"')
        icon.innerHTML = smallIcon;
    }
});

