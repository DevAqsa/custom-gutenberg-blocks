/* eslint-disable @wordpress/no-unused-vars-before-return */
/* eslint-disable jsx-a11y/iframe-has-title */
import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { videoId, aspectRatio, autoplay, controls, showRelated } = attributes;
    
    const blockProps = useBlockProps.save();

    // Calculate responsive wrapper style based on aspect ratio
    const getResponsiveStyle = () => {
        let paddingTop;
        switch (aspectRatio) {
            case '4:3':
                paddingTop = '75%';
                break;
            case '1:1':
                paddingTop = '100%';
                break;
            default:
                paddingTop = '56.25%'; // 16:9
        }
        return { paddingTop };
    };

    // Construct embed URL with parameters
    const getEmbedUrl = () => {
        if (!videoId) return '';
        let embedUrl = `https://www.youtube.com/embed/${videoId}?`;
        if (autoplay) embedUrl += '&autoplay=1';
        if (!controls) embedUrl += '&controls=0';
        if (!showRelated) embedUrl += '&rel=0';
        return embedUrl;
    };

    if (!videoId) {
        return null;
    }

    return (
        <div {...blockProps}>
            <div className="wp-block-embed is-type-video">
                <div className="wp-block-embed__wrapper" style={getResponsiveStyle()}>
                    <iframe
                        src={getEmbedUrl()}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}