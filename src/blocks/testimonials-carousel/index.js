import { registerBlockType } from '@wordpress/blocks';
import './style.scss';

import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    ...metadata,
    edit: Edit,
    save: Save,
});