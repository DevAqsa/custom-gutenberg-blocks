import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

const Save = ({ attributes }) => {
    const { images, cropType, lightboxEnabled } = attributes;
    const blockProps = useBlockProps.save({
        className: classnames('wp-block-gallery-block', {
            [`crop-${cropType}`]: true,
            'has-lightbox': lightboxEnabled
        })
    });

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div {...blockProps}>
            <div 
                className="gallery-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem'
                }}
            >
                {images.slice(0, 6).map((image, index) => (
                    <div 
                        key={index}
                        className={`gallery-image-wrapper crop-${cropType}`}
                        style={{
                            position: 'relative',
                            aspectRatio: cropType === 'landscape' ? '16/9' : 
                                       cropType === 'portrait' ? '3/4' : '1/1'
                        }}
                    >
                        <img
                            src={image.url}
                            alt={image.alt || ''}
                            className="gallery-image"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        {image.caption && (
                            <div 
                                className="image-caption"
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    color: 'white',
                                    padding: '0.5rem',
                                    fontSize: '0.875rem'
                                }}
                            >
                                {image.caption}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Save;