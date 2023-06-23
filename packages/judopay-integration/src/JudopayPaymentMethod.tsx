import React, { FunctionComponent, useCallback, useEffect } from 'react';

import {
    PaymentMethodProps,
    PaymentMethodResolveId,
    toResolvableComponent,
} from '@bigcommerce/checkout/payment-integration-api';
import { LoadingOverlay } from '@bigcommerce/checkout/ui';

const JudopayPaymentMethod: FunctionComponent<PaymentMethodProps> = ({
    method,
    checkoutService,
    checkoutState,
}) => {

    const initializePayment = useCallback(async () => {
        const payByLink = 'https://pay-sandbox.judopay.com/v9MYA6'

        console.log(checkoutService.getState().data.getCheckout().id)
        console.log(checkoutService)
        document.getElementById('checkout-payment-continue')?.addEventListener('click', function() {
            window.location.href = payByLink
        })
    }, [
        checkoutService,
    ]);

    useEffect(() => {
        void initializePayment();
    }, [initializePayment]);

    return (
        <div className="loadingSpinner">
            <LoadingOverlay isLoading={checkoutState.statuses.isInitializingPayment(method.id)}>
                <div style={{ minHeight: '0px' }} />
            </LoadingOverlay>
        </div>
    );
};

export default toResolvableComponent<PaymentMethodProps, PaymentMethodResolveId>(
    JudopayPaymentMethod,
    [{ id: 'judopay' }],
);
