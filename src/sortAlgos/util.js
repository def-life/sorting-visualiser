const debounce = (func, delay) => {
    let timeout = null;

    return (ev) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.call(ev);
        }, delay)
    }
}

function disable_btn() {
    document.querySelectorAll("button").forEach((b) => {
        b.disabled = true;
    })

    document.querySelector(".buttons").classList.add("overlay");
}

function enable_btn() {
    document.querySelectorAll("button").forEach((b) => {
        b.disabled = false;
    })

    document.querySelector(".buttons").classList.remove("overlay");
}

export {debounce, disable_btn, enable_btn};