document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.wp-block-gallery-block');
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'gallery-lightbox';
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        z-index: 9999;
        padding: 2rem;
    `;

    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    lightboxImage.style.cssText = `
        max-width: 90%;
        max-height: 90vh;
        margin: auto;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `;

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.className = 'lightbox-close';
    closeButton.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    `;

    lightbox.appendChild(lightboxImage);
    lightbox.appendChild(closeButton);
    document.body.appendChild(lightbox);

    // Add click handlers
    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('.gallery-image-wrapper');
        
        images.forEach(wrapper => {
            const img = wrapper.querySelector('.gallery-image');
            if (img && gallery.classList.contains('has-lightbox')) {
                wrapper.style.cursor = 'pointer';
                wrapper.addEventListener('click', function() {
                    lightbox.style.display = 'block';
                    lightboxImage.src = img.src;
                    document.body.style.overflow = 'hidden';
                });
            }
        });
    });

    // Close lightbox
    closeButton.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});