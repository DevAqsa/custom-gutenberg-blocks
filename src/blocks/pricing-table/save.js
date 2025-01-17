import { useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { plans } = attributes;
    const blockProps = useBlockProps.save();

    return (
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
                                    {feature}
                                </div>
                            ))}
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
    );
}