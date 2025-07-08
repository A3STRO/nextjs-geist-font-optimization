import React, { useState } from 'react';
import { portfolioAPI } from '../../services/api';

const AddressForm = ({ onAddressAdded }) => {
  const [formData, setFormData] = useState({
    blockchain: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const blockchains = [
    { value: 'bitcoin', label: 'Bitcoin (BTC)', placeholder: 'e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
    { value: 'ethereum', label: 'Ethereum (ETH)', placeholder: 'e.g., 0x742d35Cc6634C0532925a3b8D4C9db96' },
    { value: 'dogecoin', label: 'Dogecoin (DOGE)', placeholder: 'e.g., DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L' },
    { value: 'litecoin', label: 'Litecoin (LTC)', placeholder: 'e.g., LdP8Qox1VAhCzLJNqrr74YovaWYyNBUWvL' },
    { value: 'bitcoin-cash', label: 'Bitcoin Cash (BCH)', placeholder: 'e.g., 1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear messages when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!formData.blockchain || !formData.address) {
      setError('Please select a blockchain and enter an address');
      setLoading(false);
      return;
    }

    try {
      await portfolioAPI.addAddress(formData);
      setSuccess('Address added successfully!');
      setFormData({ blockchain: '', address: '' });
      
      // Call the callback to refresh portfolio
      if (onAddressAdded) {
        onAddressAdded();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const selectedBlockchain = blockchains.find(b => b.value === formData.blockchain);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Address</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="blockchain" className="block text-sm font-medium text-gray-700 mb-1">
              Blockchain
            </label>
            <select
              id="blockchain"
              name="blockchain"
              value={formData.blockchain}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            >
              <option value="">Select a blockchain</option>
              {blockchains.map((blockchain) => (
                <option key={blockchain.value} value={blockchain.value}>
                  {blockchain.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder={selectedBlockchain?.placeholder || 'Enter wallet address'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
            {success}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <>
                <div className="spinner mr-2"></div>
                Adding...
              </>
            ) : (
              <>
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Address
              </>
            )}
          </button>
        </div>
      </form>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex">
          <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">How to find your wallet address:</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600">
              <li>For most wallets, look for "Receive" or "Deposit" option</li>
              <li>Copy the public address (never share your private key)</li>
              <li>Make sure the address matches the selected blockchain</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
