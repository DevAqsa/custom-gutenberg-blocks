jQuery(document).ready(function($) {
    $('.testimonials-carousel').each(function() {
        const $carousel = $(this);
        
        $carousel.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: $carousel.data('autoplay') || false,
            autoplaySpeed: $carousel.data('autoplay-speed') || 3000,
            dots: $carousel.data('dots') || false,
            arrows: $carousel.data('arrows') || false,
            infinite: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });
});