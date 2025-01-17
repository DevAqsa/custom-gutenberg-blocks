import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        testimonials,
        autoplay,
        autoplaySpeed,
        showDots,
        showArrows,
    } = attributes;

    const blockProps = useBlockProps.save({
        className: 'testimonials-carousel-block'
    });

    if (!testimonials?.length) {
        return null;
    }

    return (
        <div {...blockProps}>
            <div 
                className="testimonials-carousel"
                data-autoplay={autoplay}
                data-autoplay-speed={autoplaySpeed}
                data-arrows={showArrows}
                data-dots={showDots}
            >
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-item">
                        {testimonial.imageUrl && (
                            <div className="testimonial-image">
                                <img src={testimonial.imageUrl} alt="" />
                            </div>
                        )}
                        <div className="testimonial-content">
                            {testimonial.content}
                        </div>
                        <div className="testimonial-author">
                            <div className="testimonial-author-name">
                                {testimonial.authorName}
                            </div>
                            <div className="testimonial-author-title">
                                {testimonial.authorTitle}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}