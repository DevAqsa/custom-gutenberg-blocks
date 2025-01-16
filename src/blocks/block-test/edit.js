import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
    RichText,
} from '@wordpress/block-editor';
import { 
    PanelBody, 
    ColorPalette,
    SelectControl,
    __experimentalUnitControl as UnitControl,
    ToggleControl,
    TextControl
} from '@wordpress/components';
const { Fragment } = wp.element;

// editor style
import './editor.scss';

// colors
import colors from '../../utilities/colors-palette';

// Font families
const FONT_FAMILIES = [
    { label: 'Default', value: 'inherit' },
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Helvetica', value: 'Helvetica, sans-serif' },
    { label: 'Times New Roman', value: 'Times New Roman, serif' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Verdana', value: 'Verdana, sans-serif' },
    { label: 'Roboto', value: '"Roboto", sans-serif' },
    { label: 'Open Sans', value: '"Open Sans", sans-serif' }
];

export default function Edit({ attributes, setAttributes }) {
    const { 
        content, 
        color,
        textAlignment,
        fontSize,
        backgroundColor,
        padding,
        fontFamily,
        borderWidth,
        borderStyle,
        borderColor,
        borderRadius,
        marginTop,
        marginBottom,
        textTransform,
        letterSpacing,
        lineHeight,
        fontWeight,
        boxShadow,
        customClasses
    } = attributes;

    const boxShadowStyle = boxShadow ? '0 4px 8px rgba(0,0,0,0.1)' : 'none';

    const blockProps = useBlockProps({
        style: {
            textAlign: textAlignment,
            fontSize,
            backgroundColor,
            padding: padding ? `${padding}px` : undefined,
            fontFamily,
            borderWidth,
            borderStyle,
            borderColor,
            borderRadius,
            marginTop,
            marginBottom,
            textTransform,
            letterSpacing,
            lineHeight,
            fontWeight,
            boxShadow: boxShadowStyle
        },
        className: customClasses
    });

    return (
        <Fragment>
            <InspectorControls>
                {/* Text Settings Panel */}
                <PanelBody
                    title={__('Text Settings', 'boilerplate')}
                    initialOpen={true}
                >
                    <p className="custom__editor__label">
                        {__('Text Color', 'boilerplate')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={color}
                        onChange={(newColor) =>
                            setAttributes({ color: newColor })
                        }
                    />

                    <SelectControl
                        label={__('Font Family', 'boilerplate')}
                        value={fontFamily}
                        options={FONT_FAMILIES}
                        onChange={(newFont) => setAttributes({ fontFamily: newFont })}
                    />

                    <UnitControl
                        label={__('Font Size', 'boilerplate')}
                        value={fontSize}
                        onChange={(value) => setAttributes({ fontSize: value })}
                        units={[
                            { value: 'px', label: 'px', default: 16 },
                            { value: 'em', label: 'em', default: 1 },
                            { value: 'rem', label: 'rem', default: 1 },
                        ]}
                    />

                    <SelectControl
                        label={__('Text Transform', 'boilerplate')}
                        value={textTransform}
                        options={[
                            { label: 'None', value: 'none' },
                            { label: 'Uppercase', value: 'uppercase' },
                            { label: 'Lowercase', value: 'lowercase' },
                            { label: 'Capitalize', value: 'capitalize' }
                        ]}
                        onChange={(value) => setAttributes({ textTransform: value })}
                    />

                    <SelectControl
                        label={__('Font Weight', 'boilerplate')}
                        value={fontWeight}
                        options={[
                            { label: 'Normal', value: 'normal' },
                            { label: 'Bold', value: 'bold' },
                            { label: 'Light', value: '300' },
                            { label: 'Medium', value: '500' },
                            { label: 'Semi Bold', value: '600' }
                        ]}
                        onChange={(value) => setAttributes({ fontWeight: value })}
                    />

                    <UnitControl
                        label={__('Letter Spacing', 'boilerplate')}
                        value={letterSpacing}
                        onChange={(value) => setAttributes({ letterSpacing: value })}
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: 'em', label: 'em', default: 0 }
                        ]}
                    />

                    <UnitControl
                        label={__('Line Height', 'boilerplate')}
                        value={lineHeight}
                        onChange={(value) => setAttributes({ lineHeight: value })}
                        units={[
                            { value: 'px', label: 'px', default: 'normal' },
                            { value: 'em', label: 'em', default: 1 }
                        ]}
                    />
                </PanelBody>

                {/* Layout Settings Panel */}
                <PanelBody
                    title={__('Layout Settings', 'boilerplate')}
                    initialOpen={false}
                >
                    <SelectControl
                        label={__('Text Alignment', 'boilerplate')}
                        value={textAlignment}
                        options={[
                            { label: 'Left', value: 'left' },
                            { label: 'Center', value: 'center' },
                            { label: 'Right', value: 'right' },
                            { label: 'Justify', value: 'justify' }
                        ]}
                        onChange={(newAlignment) => setAttributes({ textAlignment: newAlignment })}
                    />

                    <UnitControl
                        label={__('Margin Top', 'boilerplate')}
                        value={marginTop}
                        onChange={(value) => setAttributes({ marginTop: value })}
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: 'em', label: 'em', default: 0 }
                        ]}
                    />

                    <UnitControl
                        label={__('Margin Bottom', 'boilerplate')}
                        value={marginBottom}
                        onChange={(value) => setAttributes({ marginBottom: value })}
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: 'em', label: 'em', default: 0 }
                        ]}
                    />

                    <UnitControl
                        label={__('Padding', 'boilerplate')}
                        value={`${padding}px`}
                        onChange={(value) => {
                            const numericValue = parseInt(value);
                            setAttributes({ padding: isNaN(numericValue) ? 0 : numericValue });
                        }}
                        units={[
                            { value: 'px', label: 'px', default: 0 }
                        ]}
                    />
                </PanelBody>

                {/* Style Settings Panel */}
                <PanelBody
                    title={__('Style Settings', 'boilerplate')}
                    initialOpen={false}
                >
                    <p className="custom__editor__label">
                        {__('Background Color', 'boilerplate')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={backgroundColor}
                        onChange={(newBgColor) =>
                            setAttributes({ backgroundColor: newBgColor })
                        }
                    />

                    <UnitControl
                        label={__('Border Width', 'boilerplate')}
                        value={borderWidth}
                        onChange={(value) => setAttributes({ borderWidth: value })}
                        units={[
                            { value: 'px', label: 'px', default: 0 }
                        ]}
                    />

                    <SelectControl
                        label={__('Border Style', 'boilerplate')}
                        value={borderStyle}
                        options={[
                            { label: 'Solid', value: 'solid' },
                            { label: 'Dashed', value: 'dashed' },
                            { label: 'Dotted', value: 'dotted' },
                            { label: 'Double', value: 'double' }
                        ]}
                        onChange={(value) => setAttributes({ borderStyle: value })}
                    />

                    <p className="custom__editor__label">
                        {__('Border Color', 'boilerplate')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={borderColor}
                        onChange={(newColor) =>
                            setAttributes({ borderColor: newColor })
                        }
                    />

                    <UnitControl
                        label={__('Border Radius', 'boilerplate')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        units={[
                            { value: 'px', label: 'px', default: 0 },
                            { value: '%', label: '%', default: 0 }
                        ]}
                    />

                    <ToggleControl
                        label={__('Box Shadow', 'boilerplate')}
                        checked={boxShadow}
                        onChange={(value) => setAttributes({ boxShadow: value })}
                    />
                </PanelBody>

                {/* Advanced Settings Panel */}
                <PanelBody
                    title={__('Advanced', 'boilerplate')}
                    initialOpen={false}
                >
                    <TextControl
                        label={__('Additional CSS Classes', 'boilerplate')}
                        value={customClasses}
                        onChange={(value) => setAttributes({ customClasses: value })}
                        help={__('Add custom CSS classes separated by spaces', 'boilerplate')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <RichText
                    tagName="h4"
                    value={content}
                    onChange={(newContent) =>
                        setAttributes({ content: newContent })
                    }
                    style={{ color }}
                />
            </div>
        </Fragment>
    );
}