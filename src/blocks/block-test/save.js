import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        content, 
        color, 
        textAlignment, 
        fontSize, 
        backgroundColor, 
        padding,
        fontFamily
    } = attributes;

    const blockProps = useBlockProps.save({
        style: {
            textAlign: textAlignment,
            fontSize,
            backgroundColor,
            padding: padding ? `${padding}px` : undefined,
            fontFamily
        }
    });

    return (
        <div {...blockProps}>
            <RichText.Content 
                tagName="h4" 
                value={content} 
                style={{ color }} 
            />
        </div>
    );
}