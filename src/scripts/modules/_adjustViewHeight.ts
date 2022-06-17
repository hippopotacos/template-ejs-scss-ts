declare var $: any;

export default function adjustViewHeight() {
    const setFillHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    window.addEventListener('resize', setFillHeight);
    setFillHeight();
}