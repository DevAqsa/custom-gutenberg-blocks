/* eslint-disable no-unused-vars */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './editor.scss';
import './style.scss';
import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: Save,
});
