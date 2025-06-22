import { useState } from 'react';

export default function Checkout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('creditCard');
  const [formData, setFormData] = useState({
    shipping: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'United States',
    },
    payment: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
    }
  });
  
  const [orderSummary] = useState({
    items: [
      { id: 1, name: "Premium Headphones", price: 149.99, quantity: 1, image: "headphones" },
      { id: 2, name: "Wireless Charger", price: 29.99, quantity: 2, image: "charger" },
      { id: 3, name: "Phone Case", price: 19.99, quantity: 1, image: "case" },
    ],
    subtotal: 229.96,
    shipping: 5.99,
    tax: 16.20,
    total: 252.15
  });

  const handleChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process payment based on selected method
    if (selectedPayment === 'creditCard') {
      // Process credit card payment
      console.log("Processing credit card payment...");
    } else if (selectedPayment === 'paypal') {
      console.log("Redirecting to PayPal...");
    } else if (selectedPayment === 'applePay') {
      console.log("Processing with Apple Pay...");
    }
    
    setCurrentStep(4); // Confirmation step
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return <ShippingForm data={formData.shipping} onChange={(e) => handleChange(e, 'shipping')} />;
      case 2:
        return <PaymentForm 
          data={formData.payment} 
          onChange={(e) => handleChange(e, 'payment')} 
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
        />;
      case 3:
        return <ReviewForm data={formData} order={orderSummary} paymentMethod={selectedPayment} />;
      case 4:
        return <Confirmation data={formData} order={orderSummary} paymentMethod={selectedPayment} />;
      default:
        return <ShippingForm data={formData.shipping} onChange={(e) => handleChange(e, 'shipping')} />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
          <div className="flex justify-center">
            <div className="flex items-center">
              <StepIndicator step={1} currentStep={currentStep} label="Shipping" />
              <div className="h-1 w-16 bg-gray-300 mx-2"></div>
              <StepIndicator step={2} currentStep={currentStep} label="Payment" />
              <div className="h-1 w-16 bg-gray-300 mx-2"></div>
              <StepIndicator step={3} currentStep={currentStep} label="Review" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-7/12 bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            {renderStep()}
            
            {currentStep < 4 && (
              <div className="flex justify-between mt-10">
                <button 
                  type="button" 
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    currentStep === 1 
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Back
                </button>
                
                <button 
                  type="button" 
                  onClick={currentStep === 3 ? handleSubmit : nextStep}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  {currentStep === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            )}
          </div>
          
          <div className="lg:w-5/12">
            <OrderSummary order={orderSummary} />
          </div>
        </div>
      </div>
    </main>
  );
}

function StepIndicator({ step, currentStep, label }) {
  const isComplete = currentStep > step;
  const isCurrent = currentStep === step;
  
  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
        isComplete 
          ? 'bg-green-500 text-white' 
          : isCurrent 
            ? 'bg-indigo-600 text-white' 
            : 'bg-gray-200 text-gray-500'
      }`}>
        {isComplete ? '✓' : step}
      </div>
      <span className={`mt-2 text-sm font-medium transition-colors ${
        isComplete || isCurrent ? 'text-gray-900' : 'text-gray-500'
      }`}>
        {label}
      </span>
    </div>
  );
}

function ShippingForm({ data, onChange }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={data.fullName}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="(123) 456-7890"
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={data.address}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="123 Main St"
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="sm:col-span-2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={data.city}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="New York"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={data.postalCode}
              onChange={onChange}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="10001"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            id="country"
            name="country"
            value={data.country}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>Germany</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function PaymentForm({ data, onChange, selectedPayment, setSelectedPayment }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Method</h2>
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <button
            type="button"
            onClick={() => setSelectedPayment('creditCard')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedPayment === 'creditCard'
                ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8 mr-3 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              </div>
              <span className="font-medium">Credit Card</span>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setSelectedPayment('paypal')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedPayment === 'paypal'
                ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8 mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              </div>
              <span className="font-medium">PayPal</span>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setSelectedPayment('applePay')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedPayment === 'applePay'
                ? 'border-indigo-600 bg-indigo-50 shadow-sm'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8 mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <span className="font-medium">Apple Pay</span>
            </div>
          </button>
        </div>
        
        {selectedPayment === 'creditCard' && (
          <>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <div className="relative">
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={data.cardNumber}
                  onChange={onChange}
                  required
                  maxLength="19"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="0000 0000 0000 0000"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="h-6 w-8 bg-gray-200 rounded flex items-center justify-center">
                    <div className="w-5 h-5 rounded-full bg-red-400 mr-1"></div>
                    <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                value={data.nameOnCard}
                onChange={onChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={data.expiryDate}
                  onChange={onChange}
                  required
                  maxLength="5"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <div className="relative">
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={data.cvv}
                    onChange={onChange}
                    required
                    maxLength="4"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="123"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  id="save-card"
                  name="save-card"
                  type="checkbox"
                  className="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="save-card" className="ml-3 text-gray-700">Save card for future purchases</label>
              </div>
            </div>
          </>
        )}
        
        {selectedPayment === 'paypal' && (
          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-500 rounded-sm"></div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Pay with PayPal</h3>
            <p className="text-gray-600 mb-4">You'll be redirected to PayPal to complete your payment securely</p>
            <button className="px-6 py-3 bg-yellow-400 text-gray-800 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
              Continue to PayPal
            </button>
          </div>
        )}
        
        {selectedPayment === 'applePay' && (
          <div className="bg-gray-50 rounded-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center">
                <div className="w-10 h-10 bg-black rounded-full"></div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Pay with Apple Pay</h3>
            <p className="text-gray-600 mb-4">Complete your purchase quickly with Apple Pay</p>
            <button className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Continue with Apple Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewForm({ data, order, paymentMethod }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Review Your Order</h2>
      
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Shipping Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-700">{data.shipping.fullName}</p>
            <p className="text-gray-600">{data.shipping.address}</p>
            <p className="text-gray-600">{data.shipping.city}, {data.shipping.postalCode}</p>
            <p className="text-gray-600">{data.shipping.country}</p>
          </div>
          <div>
            <p className="text-gray-600"><span className="font-medium">Email:</span> {data.shipping.email}</p>
            <p className="text-gray-600"><span className="font-medium">Phone:</span> {data.shipping.phone}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Method</h3>
        <div className="flex items-center">
          {paymentMethod === 'creditCard' && (
            <>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8 mr-3 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              </div>
              <span className="font-medium">Credit Card ending in •••• 4242</span>
            </>
          )}
          {paymentMethod === 'paypal' && (
            <>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8 mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              </div>
              <span className="font-medium">PayPal</span>
            </>
          )}
          {paymentMethod === 'applePay' && (
            <>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-8 mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-black rounded-full"></div>
              </div>
              <span className="font-medium">Apple Pay</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function OrderSummary({ order }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
      
      <div className="space-y-5 mb-8">
        {order.items.map(item => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center text-gray-500">
                {item.image === 'headphones' && (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                )}
                {item.image === 'charger' && (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )}
                {item.image === 'case' && (
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )}
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 border-t border-gray-200 pt-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>${order.shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t border-gray-200">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="flex items-start">
          <svg className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <p className="text-sm text-gray-600">Your order is secure. All transactions are encrypted and secure.</p>
        </div>
      </div>
    </div>
  );
}

function Confirmation({ data, order, paymentMethod }) {
  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
        <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h2>
      <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
        Thank you for your order. We've sent a confirmation email to <span className="font-medium text-indigo-600">{data.shipping.email}</span> with your order details.
      </p>
      
      <div className="bg-gray-50 rounded-xl p-6 text-left max-w-md mx-auto mb-8">
        <h3 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h3>
        
        <div className="flex justify-between mb-3">
          <span className="text-gray-600">Order Number</span>
          <span className="font-medium">#ORD-23876</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-gray-600">Date</span>
          <span className="font-medium">June 22, 2025</span>
        </div>
        <div className="flex justify-between mb-3">
          <span className="text-gray-600">Total</span>
          <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Payment Method</span>
          <span className="font-medium">
            {paymentMethod === 'creditCard' && 'Credit Card ending in •••• 4242'}
            {paymentMethod === 'paypal' && 'PayPal'}
            {paymentMethod === 'applePay' && 'Apple Pay'}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          View Order Details
        </button>
        <button 
          className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}