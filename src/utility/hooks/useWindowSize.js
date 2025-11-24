const useWindowSize = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener when component unmounts
    const cleanup = () => {
        window.removeEventListener('resize', handleResize);
    };

    // Return window dimensions and cleanup function
    return {
        width,
        height,
        cleanup
    };
};

export default useWindowSize;
