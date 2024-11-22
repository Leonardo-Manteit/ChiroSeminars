import GooglePayButton from '@google-pay/button-react'

export default function GooglePay() {
    return (
        <>
            <GooglePayButton 
                environment='TEST'
                buttonSizeMode='fill'
                paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                        {
                            type: 'CARD',
                            parameters: {
                                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                allowedCardNetworks: ['MASTERCARD', 'VISA']
                            },
                            tokenizationSpecification: {
                                type: 'DIRECT',
                                parameters: {
                                    // gateway: 'exampleGateway',
                                    // gatewayMerchantId: 'exampleMerchantId12345',
                                },
                            },
                        },
                    ],
                    merchantInfo: {
                        merchantId: '12345678901234567890',
                        merchantName: 'Test Merchant'
                    },
                    transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        // totalPrice: item.price.toFixed(2),
                        totalPrice: 1.00,
                        currencyCode: 'AUD',
                        countryCode: 'AU',
                    },
                }}
                onLoadPaymentData={paymentData => {
                    console.log('TODO: send order to server', paymentData.paymentMethodData);
                    history.push('/confirm')
                    
                }}
            />
        </>
    )
}