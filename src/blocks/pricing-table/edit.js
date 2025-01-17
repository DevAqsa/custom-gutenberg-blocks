import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls,
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ToggleControl,
    Button,
    TextareaControl,
} from '@wordpress/components';
const { Fragment } = wp.element;

import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const { plans } = attributes;
    const blockProps = useBlockProps();

    const updatePlan = (index, field, value) => {
        const newPlans = [...plans];
        newPlans[index] = {
            ...newPlans[index],
            [field]: value
        };
        setAttributes({ plans: newPlans });
    };

    const updateFeature = (planIndex, featureIndex, value) => {
        const newPlans = [...plans];
        newPlans[planIndex].features[featureIndex] = value;
        setAttributes({ plans: newPlans });
    };

    const addFeature = (planIndex) => {
        const newPlans = [...plans];
        newPlans[planIndex].features.push("New Feature");
        setAttributes({ plans: newPlans });
    };

    const removeFeature = (planIndex, featureIndex) => {
        const newPlans = [...plans];
        newPlans[planIndex].features.splice(featureIndex, 1);
        setAttributes({ plans: newPlans });
    };

    return (
        <Fragment>
            <InspectorControls>
                {plans.map((plan, planIndex) => (
                    <PanelBody
                        key={planIndex}
                        title={`${plan.name} Plan Settings`}
                        initialOpen={planIndex === 0}
                    >
                        <TextControl
                            label={__('Plan Name', 'devaqsa-gutenberg-blocks')}
                            value={plan.name}
                            onChange={(value) => updatePlan(planIndex, 'name', value)}
                        />
                        <TextControl
                            label={__('Currency', 'devaqsa-gutenberg-blocks')}
                            value={plan.currency}
                            onChange={(value) => updatePlan(planIndex, 'currency', value)}
                        />
                        <TextControl
                            label={__('Price', 'devaqsa-gutenberg-blocks')}
                            value={plan.price}
                            onChange={(value) => updatePlan(planIndex, 'price', value)}
                        />
                        <TextControl
                            label={__('Period', 'devaqsa-gutenberg-blocks')}
                            value={plan.period}
                            onChange={(value) => updatePlan(planIndex, 'period', value)}
                        />
                        <TextControl
                            label={__('Button Text', 'devaqsa-gutenberg-blocks')}
                            value={plan.buttonText}
                            onChange={(value) => updatePlan(planIndex, 'buttonText', value)}
                        />
                        <TextControl
                            label={__('Button URL', 'devaqsa-gutenberg-blocks')}
                            value={plan.buttonUrl}
                            onChange={(value) => updatePlan(planIndex, 'buttonUrl', value)}
                        />
                        <ToggleControl
                            label={__('Highlight Plan', 'devaqsa-gutenberg-blocks')}
                            checked={plan.highlighted}
                            onChange={(value) => updatePlan(planIndex, 'highlighted', value)}
                        />
                    </PanelBody>
                ))}
            </InspectorControls>

            <div {...blockProps}>
                <div className="pricing-table">
                    {plans.map((plan, planIndex) => (
                        <div 
                            key={planIndex} 
                            className={`pricing-plan ${plan.highlighted ? 'highlighted' : ''}`}
                        >
                            <div className="plan-header">
                                <h3 className="plan-name">{plan.name}</h3>
                                <div className="plan-price">
                                    <span className="currency">{plan.currency}</span>
                                    <span className="amount">{plan.price}</span>
                                    <span className="period">/{plan.period}</span>
                                </div>
                            </div>
                            <div className="plan-features">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="feature-item">
                                        <TextControl
                                            value={feature}
                                            onChange={(value) => updateFeature(planIndex, featureIndex, value)}
                                        />
                                        <Button
                                            isDestructive
                                            onClick={() => removeFeature(planIndex, featureIndex)}
                                        >
                                            ×
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    isPrimary
                                    onClick={() => addFeature(planIndex)}
                                >
                                    {__('Add Feature', 'devaqsa-gutenberg-blocks')}
                                </Button>
                            </div>
                            <div className="plan-footer">
                                <a
                                    href={plan.buttonUrl}
                                    className="wp-block-button__link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {plan.buttonText}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}