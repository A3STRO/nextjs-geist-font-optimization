import React, { useState } from 'react';
import { portfolioAPI } from '../../services/api';

const PortfolioCard = ({ address, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getBlockchainInfo = (blockchain) => {
    const blockchainMap = {
      'bitcoin': { name: 'Bitcoin', symbol: 'BTC', color: 'bg-orange-500' },
      'ethereum': { name: 'Ethereum', symbol: 'ETH', color: 'bg-blue-500' },
      'dogecoin': { name: 'Dogecoin', symbol: 'DOGE', color: 'bg-yellow-500' },
      'litecoin': { name: 'Litecoin', symbol: 'LTC', color: 'bg-gray-500' },
      'bitcoin-cash': { name: 'Bitcoin Cash', symbol: 'BCH', color: 'bg-green-500' }
    };
    return blockchainMap[blockchain] || { name: blockchain, symbol: blockchain.toUpperCase(), color: 'bg-gray-500' };
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await portfolioAPI.deleteAddress(address.id);
      if (onDelete) {
        onDelete();
      }
    } catch (err) {
      console.error('Delete error:', err);
      // You could add error handling here
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatAddress = (addr) => {
    if (!addr) return 'N/A';
    if (addr.length <= 16) return addr;
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  const formatBalance = (balance) => {
    if (typeof balance !== 'number') return '0';
    return balance.toLocaleString('en-US', { 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 8 
    });
  };

  const formatValue = (value) => {
    const numValue = parseFloat(value) || 0;
    return numValue.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const blockchainInfo = getBlockchainInfo(address.blockchain);
  const hasError = !!address.error;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full ${blockchainInfo.color} flex items-center justify-center text-white font-bold text-sm mr-3`}>
            {blockchainInfo.symbol.slice(0, 3)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{blockchainInfo.name}</h3>
            <p className="text-sm text-gray-500">{blockchainInfo.symbol}</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-gray-400 hover:text-red-500 transition-colors duration-200"
          title="Delete address"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Address */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-1">Address</p>
        <p className="text-sm font-mono bg-gray-50 px-2 py-1 rounded border text-gray-700">
          {formatAddress(address.address)}
        </p>
      </div>

      {/* Balance and Value */}
      {hasError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-center">
            <svg className="h-4 w-4 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-red-600">{address.error}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <p className="text-xs text-gray-500 mb-1">Balance</p>
            <p className="text-lg font-semibold text-gray-900">
              {formatBalance(address.balance)} {blockchainInfo.symbol}
            </p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Estimated Value</p>
            <p className="text-xl font-bold text-primary-600">
              ${formatValue(address.estimatedValueUSD)}
            </p>
          </div>
        </div>
      )}

      {/* Last Updated */}
      {address.lastUpdated && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Last updated: {new Date(address.lastUpdated).toLocaleString()}
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Address</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to remove this {blockchainInfo.name} address from your portfolio?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                {deleting ? (
                  <div className="spinner mx-auto"></div>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioCard;
