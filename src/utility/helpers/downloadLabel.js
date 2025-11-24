export const downloadLabel = (labelUrl) => {
    const link = document.createElement('a');
    link.href = labelUrl;
    link.download = 'label.pdf';
    link.target = '_blank';
    link.click();
};
