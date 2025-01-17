import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { 
        content, 
        color, 
        margin, 
        padding, 
        alignment, 
        displayClass,
        backgroundColor,
        containerType,
        flexProperties,
        borderClass,
        spacing
    } = attributes;
    
    const blockProps = useBlockProps.save({
        className: `${margin} ${padding} ${alignment} ${displayClass} ${containerType} ${flexProperties} ${borderClass} ${spacing}`
    });

    return (
        <div {...blockProps} style={{ backgroundColor }}>
            <RichText.Content tagName="h4" value={content} style={{ color }} />
        </div>
    );
}