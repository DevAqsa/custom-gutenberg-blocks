import { __ } from '@wordpress/i18n';
import { 
    InspectorControls, 
    MediaUpload, 
    MediaUploadCheck,
    useBlockProps,
    PanelColorSettings
} from '@wordpress/block-editor';
import {
    PanelBody,
    SelectControl,
    Button,
    Notice,
    DropZone,
    RangeControl,
    ToggleControl,
    __experimentalNumberControl as NumberControl
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import classnames from 'classnames';

const Edit = ({ attributes, setAttributes }) => {
    const { 
        images, 
        cropType, 
        lightboxEnabled,
        imageBorderRadius,
        imageSpacing,
        shadowEnabled,
        shadowIntensity,
        hoverEffect,
        captionStyle,
        captionPosition,
        overlayColor,
        overlayOpacity,
        columns
    } = attributes;

    const [isDragging, setIsDragging] = useState(false);
    
    const blockProps = useBlockProps({
        className: classnames('wp-block-gallery-block', {
            [`crop-${cropType}`]: true,
            'has-lightbox': lightboxEnabled,
            [`hover-${hoverEffect}`]: true,
            [`caption-${captionStyle}`]: true,
            [`caption-${captionPosition}`]: captionStyle === 'overlay'
        })
    });

    const onSelectImages = (newImages) => {
        const selectedImages = newImages.slice(0, 6).map(image => ({
            url: image.url,
            id: image.id,
            alt: image.alt || '',
            caption: image.caption || ''
        }));
        setAttributes({ images: selectedImages });
    };

    const onDropImages = (files) => {
        const uploaderFiles = Array.from(files).slice(0, 6).map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(uploaderFiles).then((images) => {
            setAttributes({
                images: images.map((image, index) => ({
                    url: image,
                    id: `new-${index}`,
                    alt: '',
                    caption: ''
                }))
            });
        });
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setAttributes({ images: newImages });
    };

    const getComputedStyles = () => {
        return {
            '--image-border-radius': `${imageBorderRadius}px`,
            '--image-spacing': `${imageSpacing}px`,
            '--shadow-intensity': shadowEnabled ? shadowIntensity : 0,
            '--overlay-color': overlayColor,
            '--overlay-opacity': overlayOpacity / 100
        };
    };

    return (
        <div {...blockProps} style={getComputedStyles()}>
            <InspectorControls>
                <PanelBody title={__('Layout Settings', 'my-blocks')} initialOpen={true}>
                    <RangeControl
                        label={__('Columns', 'my-blocks')}
                        value={columns}
                        onChange={(value) => setAttributes({ columns: value })}
                        min={1}
                        max={4}
                    />
                    <SelectControl
                        label={__('Crop Type', 'my-blocks')}
                        value={cropType}
                        options={[
                            { label: __('Square', 'my-blocks'), value: 'square' },
                            { label: __('Landscape', 'my-blocks'), value: 'landscape' },
                            { label: __('Portrait', 'my-blocks'), value: 'portrait' },
                        ]}
                        onChange={(value) => setAttributes({ cropType: value })}
                    />
                    <RangeControl
                        label={__('Image Spacing', 'my-blocks')}
                        value={imageSpacing}
                        onChange={(value) => setAttributes({ imageSpacing: value })}
                        min={0}
                        max={40}
                    />
                </PanelBody>

                <PanelBody title={__('Image Style', 'my-blocks')} initialOpen={false}>
                    <RangeControl
                        label={__('Border Radius', 'my-blocks')}
                        value={imageBorderRadius}
                        onChange={(value) => setAttributes({ imageBorderRadius: value })}
                        min={0}
                        max={20}
                    />
                    <ToggleControl
                        label={__('Enable Shadow', 'my-blocks')}
                        checked={shadowEnabled}
                        onChange={(value) => setAttributes({ shadowEnabled: value })}
                    />
                    {shadowEnabled && (
                        <RangeControl
                            label={__('Shadow Intensity', 'my-blocks')}
                            value={shadowIntensity}
                            onChange={(value) => setAttributes({ shadowIntensity: value })}
                            min={1}
                            max={5}
                        />
                    )}
                    <SelectControl
                        label={__('Hover Effect', 'my-blocks')}
                        value={hoverEffect}
                        options={[
                            { label: __('None', 'my-blocks'), value: 'none' },
                            { label: __('Lift', 'my-blocks'), value: 'lift' },
                            { label: __('Zoom', 'my-blocks'), value: 'zoom' },
                            { label: __('Lift & Zoom', 'my-blocks'), value: 'lift-zoom' }
                        ]}
                        onChange={(value) => setAttributes({ hoverEffect: value })}
                    />
                </PanelBody>

                <PanelBody title={__('Caption Settings', 'my-blocks')} initialOpen={false}>
                    <SelectControl
                        label={__('Caption Style', 'my-blocks')}
                        value={captionStyle}
                        options={[
                            { label: __('Overlay', 'my-blocks'), value: 'overlay' },
                            { label: __('Below Image', 'my-blocks'), value: 'below' },
                            { label: __('None', 'my-blocks'), value: 'none' }
                        ]}
                        onChange={(value) => setAttributes({ captionStyle: value })}
                    />
                    {captionStyle === 'overlay' && (
                        <>
                            <SelectControl
                                label={__('Caption Position', 'my-blocks')}
                                value={captionPosition}
                                options={[
                                    { label: __('Bottom', 'my-blocks'), value: 'bottom' },
                                    { label: __('Top', 'my-blocks'), value: 'top' },
                                    { label: __('Center', 'my-blocks'), value: 'center' }
                                ]}
                                onChange={(value) => setAttributes({ captionPosition: value })}
                            />
                            <RangeControl
                                label={__('Overlay Opacity', 'my-blocks')}
                                value={overlayOpacity}
                                onChange={(value) => setAttributes({ overlayOpacity: value })}
                                min={0}
                                max={100}
                            />
                        </>
                    )}
                </PanelBody>

                <PanelBody title={__('Lightbox Settings', 'my-blocks')} initialOpen={false}>
                    <ToggleControl
                        label={__('Enable Lightbox', 'my-blocks')}
                        checked={lightboxEnabled}
                        onChange={(value) => setAttributes({ lightboxEnabled: value })}
                    />
                </PanelBody>

                <PanelColorSettings
                    title={__('Color Settings', 'my-blocks')}
                    colorSettings={[
                        {
                            value: overlayColor,
                            onChange: (value) => setAttributes({ overlayColor: value }),
                            label: __('Overlay Color', 'my-blocks')
                        }
                    ]}
                />
            </InspectorControls>

            {images.length > 6 && (
                <Notice status="warning" isDismissible={false}>
                    {__('Only the first 6 images will be displayed.', 'my-blocks')}
                </Notice>
            )}

            <div className="gallery-controls">
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectImages}
                        allowedTypes={['image']}
                        multiple
                        value={images.map(img => img.id)}
                        render={({ open }) => (
                            <Button
                                variant="primary"
                                onClick={open}
                            >
                                {images.length === 0 ? 
                                    __('Add Images (Select up to 6)', 'my-blocks') : 
                                    __('Edit Gallery', 'my-blocks')
                                }
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
            </div>

            <div 
                className={classnames('gallery-grid', {
                    'is-dragging': isDragging
                })}
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: `${imageSpacing}px`
                }}
            >
                <DropZone
                    onFilesDrop={onDropImages}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={() => setIsDragging(false)}
                />
                
                {images.slice(0, 6).map((image, index) => (
                    <div 
                        key={image.id || index} 
                        className={`gallery-image-wrapper crop-${cropType}`}
                        style={{
                            position: 'relative',
                            aspectRatio: cropType === 'landscape' ? '16/9' : 
                                       cropType === 'portrait' ? '3/4' : '1/1',
                            borderRadius: `${imageBorderRadius}px`,
                            overflow: 'hidden'
                        }}
                    >
                        <img
                            src={image.url}
                            alt={image.alt}
                            data-id={image.id}
                            className="gallery-image"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        {image.caption && captionStyle !== 'none' && (
                            <div 
                                className={`image-caption ${captionStyle} ${captionPosition}`}
                                style={{
                                    background: captionStyle === 'overlay' ? overlayColor : 'none',
                                    opacity: captionStyle === 'overlay' ? overlayOpacity / 100 : 1
                                }}
                            >
                                {image.caption}
                            </div>
                        )}
                        <Button
                            className="remove-image"
                            icon="no-alt"
                            label={__('Remove image', 'my-blocks')}
                            onClick={() => removeImage(index)}
                        />
                    </div>
                ))}
                
                {Array.from({ length: Math.max(0, 6 - images.length) }).map((_, index) => (
                    <div 
                        key={`placeholder-${index}`}
                        className={`gallery-image-wrapper placeholder crop-${cropType}`}
                        style={{
                            position: 'relative',
                            aspectRatio: cropType === 'landscape' ? '16/9' : 
                                       cropType === 'portrait' ? '3/4' : '1/1',
                            backgroundColor: '#f0f0f0',
                            border: '2px dashed #ccc',
                            borderRadius: `${imageBorderRadius}px`
                        }}
                    >
                        <div className="placeholder-content"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                color: '#757575'
                            }}
                        >
                            {__('Add Image', 'my-blocks')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Edit;