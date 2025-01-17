/* eslint-disable jsx-a11y/iframe-has-title */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
} from '@wordpress/block-editor';
import { 
    PanelBody,
    TextControl,
    SelectControl,
    ToggleControl,
    Placeholder,
    Button,
    Notice
} from '@wordpress/components';
const { Fragment, useState } = wp.element;

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { 
        videoUrl, 
        videoId, 
        aspectRatio, 
        autoplay, 
        controls, 
        showRelated 
    } = attributes;

    const [error, setError] = useState('');

    const aspectRatioOptions = [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
        { label: '1:1', value: '1:1' }
    ];

    // Extract YouTube video ID from URL
    const extractVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Handle URL change
    const handleURLChange = (newURL) => {
        setAttributes({ videoUrl: newURL });
        const newVideoId = extractVideoId(newURL);
        
        if (newVideoId) {
            setAttributes({ videoId: newVideoId });
            setError('');
        } else if (newURL) {
            setError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
        } else {
            setAttributes({ videoId: '' });
            setError('');
        }
    };

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

    const blockProps = useBlockProps();

    // Construct embed URL with parameters
    const getEmbedUrl = () => {
        if (!videoId) return '';
        let embedUrl = `https://www.youtube.com/embed/${videoId}?`;
        if (autoplay) embedUrl += '&autoplay=1';
        if (!controls) embedUrl += '&controls=0';
        if (!showRelated) embedUrl += '&rel=0';
        return embedUrl;
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={__('Video Settings', 'devaqsa-gutenberg-blocks')}
                    initialOpen={true}
                >
                    <TextControl
                        label={__('YouTube Video URL', 'devaqsa-gutenberg-blocks')}
                        value={videoUrl}
                        onChange={handleURLChange}
                        help={__('Paste the URL of the YouTube video you want to embed.', 'devaqsa-gutenberg-blocks')}
                    />

                    <SelectControl
                        label={__('Aspect Ratio', 'devaqsa-gutenberg-blocks')}
                        value={aspectRatio}
                        options={aspectRatioOptions}
                        onChange={(value) => setAttributes({ aspectRatio: value })}
                    />

                    <ToggleControl
                        label={__('Autoplay', 'devaqsa-gutenberg-blocks')}
                        checked={autoplay}
                        onChange={(value) => setAttributes({ autoplay: value })}
                    />

                    <ToggleControl
                        label={__('Show Controls', 'devaqsa-gutenberg-blocks')}
                        checked={controls}
                        onChange={(value) => setAttributes({ controls: value })}
                    />

                    <ToggleControl
                        label={__('Show Related Videos', 'devaqsa-gutenberg-blocks')}
                        checked={showRelated}
                        onChange={(value) => setAttributes({ showRelated: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                {!videoId ? (
                    <Placeholder
                        icon="video-alt3"
                        label={__('YouTube Video', 'devaqsa-gutenberg-blocks')}
                        instructions={__('Enter a YouTube video URL to embed it.', 'devaqsa-gutenberg-blocks')}
                    >
                        <TextControl
                            value={videoUrl}
                            onChange={handleURLChange}
                            // eslint-disable-next-line @wordpress/i18n-ellipsis
                            placeholder={__('Paste YouTube URL here...', 'devaqsa-gutenberg-blocks')}
                        />
                        {error && (
                            <Notice status="error" isDismissible={false}>
                                {error}
                            </Notice>
                        )}
                    </Placeholder>
                ) : (
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
                )}
            </div>
        </Fragment>
    );
}