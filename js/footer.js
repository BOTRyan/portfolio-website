async function loadFooter() {
    const response = await fetch('/controls/footer.html');
    const html = await response.text();

    document.getElementById('footer').innerHTML = html;
}

loadFooter();
