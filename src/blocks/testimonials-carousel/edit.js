import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck,
    RichText,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    ToggleControl,
    RangeControl,
} from '@wordpress/components';
import { X } from 'lucide-react';

export default function Edit({ attributes, setAttributes }) {
    const {
        testimonials,
        autoplay,
        autoplaySpeed,
        showDots,
        showArrows,
    } = attributes;

    const blockProps = useBlockProps({
        className: 'testimonials-carousel-block'
    });

    const addNewTestimonial = () => {
        const newTestimonials = [...testimonials, {
            authorName: '',
            authorTitle: '',
            content: '',
            imageUrl: '',
            imageId: 0,
        }];
        setAttributes({ testimonials: newTestimonials });
    };

    const removeTestimonial = (index) => {
        const newTestimonials = [...testimonials];
        newTestimonials.splice(index, 1);
        setAttributes({ testimonials: newTestimonials });
    };

    const updateTestimonialProperty = (index, property, value) => {
        const newTestimonials = [...testimonials];
        newTestimonials[index] = {
            ...newTestimonials[index],
            [property]: value,
        };
        setAttributes({ testimonials: newTestimonials });
    };

    const onSelectImage = (index, media) => {
        const newTestimonials = [...testimonials];
        newTestimonials[index] = {
            ...newTestimonials[index],
            imageUrl: media.url,
            imageId: media.id,
        };
        setAttributes({ testimonials: newTestimonials });
    };

    const removeImage = (index) => {
        const newTestimonials = [...testimonials];
        newTestimonials[index] = {
            ...newTestimonials[index],
            imageUrl: '',
            imageId: 0,
        };
        setAttributes({ testimonials: newTestimonials });
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Carousel Settings', 'devaqsa-gutenberg-blocks')}>
                    <ToggleControl
                        label={__('Enable Autoplay', 'devaqsa-gutenberg-blocks')}
                        checked={autoplay}
                        onChange={(value) => setAttributes({ autoplay: value })}
                    />
                    {autoplay && (
                        <RangeControl
                            label={__('Autoplay Speed (ms)', 'devaqsa-gutenberg-blocks')}
                            value={autoplaySpeed}
                            onChange={(value) => setAttributes({ autoplaySpeed: value })}
                            min={1000}
                            max={10000}
                            step={500}
                        />
                    )}
                    <ToggleControl
                        label={__('Show Dots', 'devaqsa-gutenberg-blocks')}
                        checked={showDots}
                        onChange={(value) => setAttributes({ showDots: value })}
                    />
                    <ToggleControl
                        label={__('Show Arrows', 'devaqsa-gutenberg-blocks')}
                        checked={showArrows}
                        onChange={(value) => setAttributes({ showArrows: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div className="testimonials-editor">
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-item">
                            <button
                                onClick={() => removeTestimonial(index)}
                                className="remove-testimonial-icon"
                                aria-label="Remove testimonial"
                            >
                                <X size={16} />
                            </button>

                            <div className="image-upload-container">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(media) => onSelectImage(index, media)}
                                        allowedTypes={['image']}
                                        value={testimonial.imageId}
                                        render={({ open }) => (
                                            <div className="image-container">
                                                {testimonial.imageUrl ? (
                                                    <div className="image-preview">
                                                        <img 
                                                            src={testimonial.imageUrl} 
                                                            alt={__('Testimonial author', 'devaqsa-gutenberg-blocks')} 
                                                        />
                                                        <div className="image-controls">
                                                            <Button
                                                                onClick={open}
                                                                variant="secondary"
                                                                isSmall
                                                            >
                                                                {__('Replace', 'devaqsa-gutenberg-blocks')}
                                                            </Button>
                                                            <Button
                                                                onClick={() => removeImage(index)}
                                                                variant="secondary"
                                                                isDestructive
                                                                isSmall
                                                            >
                                                                {__('Remove', 'devaqsa-gutenberg-blocks')}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        onClick={open}
                                                        variant="secondary"
                                                        className="upload-button"
                                                    >
                                                        {__('Upload Image', 'devaqsa-gutenberg-blocks')}
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    />
                                </MediaUploadCheck>
                            </div>

                            <RichText
                                tagName="div"
                                className="testimonial-content"
                                value={testimonial.content}
                                onChange={(content) => updateTestimonialProperty(index, 'content', content)}
                                // eslint-disable-next-line @wordpress/i18n-ellipsis
                                placeholder={__('Write testimonial content...', 'devaqsa-gutenberg-blocks')}
                            />

                            <RichText
                                tagName="div"
                                className="testimonial-author-name"
                                value={testimonial.authorName}
                                onChange={(name) => updateTestimonialProperty(index, 'authorName', name)}
                                placeholder={__('Author name', 'devaqsa-gutenberg-blocks')}
                            />

                            <RichText
                                tagName="div"
                                className="testimonial-author-title"
                                value={testimonial.authorTitle}
                                onChange={(title) => updateTestimonialProperty(index, 'authorTitle', title)}
                                placeholder={__('Author title & company', 'devaqsa-gutenberg-blocks')}
                            />
                        </div>
                    ))}
                </div>

                <Button
                    onClick={addNewTestimonial}
                    variant="primary"
                    className="add-testimonial-button"
                >
                    {__('Add Testimonial', 'devaqsa-gutenberg-blocks')}
                </Button>
            </div>
        </div>
    );
}