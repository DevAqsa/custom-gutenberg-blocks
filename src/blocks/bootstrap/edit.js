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
    ToggleControl 
} from '@wordpress/components';
const { Fragment } = wp.element;

import './editor.scss';
import colors from '../../utilities/colors-palette';

export default function Edit({ attributes, setAttributes }) {
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

    const marginOptions = [
        { label: 'None', value: 'm-0' },
        { label: 'Small', value: 'm-2' },
        { label: 'Medium', value: 'm-3' },
        { label: 'Large', value: 'm-4' },
        { label: 'Auto', value: 'm-auto' },
        { label: 'Y-Auto', value: 'my-auto' },
        { label: 'X-Auto', value: 'mx-auto' }
    ];

    const paddingOptions = [
        { label: 'None', value: 'p-0' },
        { label: 'Small', value: 'p-2' },
        { label: 'Medium', value: 'p-3' },
        { label: 'Large', value: 'p-4' },
        { label: 'X-Small', value: 'px-2' },
        { label: 'Y-Small', value: 'py-2' }
    ];

    const alignmentOptions = [
        { label: 'Left', value: 'text-start' },
        { label: 'Center', value: 'text-center' },
        { label: 'Right', value: 'text-end' },
        { label: 'Justify', value: 'text-justify' }
    ];

    const displayOptions = [
        { label: 'Block', value: 'd-block' },
        { label: 'None', value: 'd-none' },
        { label: 'Hidden on Mobile', value: 'd-none d-md-block' },
        { label: 'Hidden on Desktop', value: 'd-block d-md-none' },
        { label: 'Flex', value: 'd-flex' },
        { label: 'Inline', value: 'd-inline' },
        { label: 'Inline Block', value: 'd-inline-block' }
    ];

    const containerOptions = [
        { label: 'None', value: '' },
        { label: 'Container', value: 'container' },
        { label: 'Container Fluid', value: 'container-fluid' },
        { label: 'Container Small', value: 'container-sm' }
    ];

    const flexOptions = [
        { label: 'None', value: '' },
        { label: 'Flex Row', value: 'flex-row' },
        { label: 'Flex Column', value: 'flex-column' },
        { label: 'Justify Content Center', value: 'justify-content-center' },
        { label: 'Align Items Center', value: 'align-items-center' }
    ];

    const borderOptions = [
        { label: 'None', value: '' },
        { label: 'Border', value: 'border' },
        { label: 'Border-Top', value: 'border-top' },
        { label: 'Border-Bottom', value: 'border-bottom' },
        { label: 'Rounded', value: 'rounded' }
    ];

    const spacingOptions = [
        { label: 'None', value: '' },
        { label: 'Gap-1', value: 'gap-1' },
        { label: 'Gap-2', value: 'gap-2' },
        { label: 'Gap-3', value: 'gap-3' }
    ];

    const blockProps = useBlockProps({
        className: `${margin} ${padding} ${alignment} ${displayClass} ${containerType} ${flexProperties} ${borderClass} ${spacing}`
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody
                    title={__('Layout Settings', 'boilerplate')}
                    initialOpen={true}
                >
                    <SelectControl
                        label={__('Container Type', 'boilerplate')}
                        value={containerType}
                        options={containerOptions}
                        onChange={(value) => setAttributes({ containerType: value })}
                    />

                    <SelectControl
                        label={__('Display Options', 'boilerplate')}
                        value={displayClass}
                        options={displayOptions}
                        onChange={(value) => setAttributes({ displayClass: value })}
                    />

                    <SelectControl
                        label={__('Flex Properties', 'boilerplate')}
                        value={flexProperties}
                        options={flexOptions}
                        onChange={(value) => setAttributes({ flexProperties: value })}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Spacing & Borders', 'boilerplate')}
                    initialOpen={false}
                >
                    <SelectControl
                        label={__('Margin', 'boilerplate')}
                        value={margin}
                        options={marginOptions}
                        onChange={(value) => setAttributes({ margin: value })}
                    />

                    <SelectControl
                        label={__('Padding', 'boilerplate')}
                        value={padding}
                        options={paddingOptions}
                        onChange={(value) => setAttributes({ padding: value })}
                    />

                    <SelectControl
                        label={__('Border Style', 'boilerplate')}
                        value={borderClass}
                        options={borderOptions}
                        onChange={(value) => setAttributes({ borderClass: value })}
                    />

                    <SelectControl
                        label={__('Spacing', 'boilerplate')}
                        value={spacing}
                        options={spacingOptions}
                        onChange={(value) => setAttributes({ spacing: value })}
                    />
                </PanelBody>

                <PanelBody
                    title={__('Typography & Colors', 'boilerplate')}
                    initialOpen={false}
                >
                    <SelectControl
                        label={__('Text Alignment', 'boilerplate')}
                        value={alignment}
                        options={alignmentOptions}
                        onChange={(value) => setAttributes({ alignment: value })}
                    />

                    <p className="custom__editor__label">
                        {__('Text Color', 'boilerplate')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={color}
                        onChange={(newColor) => setAttributes({ color: newColor })}
                    />

                    <p className="custom__editor__label">
                        {__('Background Color', 'boilerplate')}
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={backgroundColor}
                        onChange={(newColor) => setAttributes({ backgroundColor: newColor })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps} style={{ backgroundColor }}>
                <RichText
                    tagName="h4"
                    value={content}
                    onChange={(newContent) => setAttributes({ content: newContent })}
                    style={{ color }}
                />
            </div>
        </Fragment>
    );
}