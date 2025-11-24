export default function hexToRGBA(passedHex, alpha = 1) {

    const getPrimary = () => window.getComputedStyle(document.body).getPropertyValue("--bs-primary").trim().replace('#', '');
    const hex = passedHex?.replace('#', '') ?? getPrimary();
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);
    return {
        r, g, b, a: alpha
    }
}