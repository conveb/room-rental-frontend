import React, { useState } from 'react';
import { usePayoutAccount } from '../../hooks/payout_providers/usePayoutAccount';
import { useCountryPayoutProviders } from '../../hooks/payout_providers/useCountryPayoutProviders';

const PayoutPage = () => {
  const { account, loading, addAccount } = usePayoutAccount();
  const { countryProviders, loading: loadingProviders } = useCountryPayoutProviders();
  console.log(countryProviders.id)
  const [showCreateForm, setShowCreateForm] = useState(false);

  if (loading || loadingProviders) return <div className="loading">Fetching details...</div>;

  return (
    <div className="payout-container" style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
      <header style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Payout Settings</h1>
        <p style={{ color: '#666' }}>Manage where you receive your earnings.</p>
      </header>

      {/* Case 1: Account Exists */}
      {account && !showCreateForm ? (
        <div className="account-card" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ margin: 0, color: '#333' }}>{account.provider_name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{account.currency} • {account.country_code}</p>
            </div>
            <span style={{ 
              padding: '4px 12px', 
              borderRadius: '20px', 
              fontSize: '0.8rem', 
              textTransform: 'capitalize',
              backgroundColor: account.status === 'pending' ? '#fff3e0' : '#e8f5e9',
              color: account.status === 'pending' ? '#ef6c00' : '#2e7d32'
            }}>
              {account.status}
            </span>
          </div>
          
          <div style={{ marginTop: '1.5rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#999', textTransform: 'uppercase' }}>Account Identifier</label>
            <p style={{ margin: '4px 0', fontFamily: 'monospace', fontSize: '1.1rem' }}>{account.account_identifier}</p>
          </div>

          {account.is_primary && (
            <div style={{ marginTop: '1rem', color: '#1a73e8', fontSize: '0.9rem' }}>
              ✓ Primary payout method
            </div>
          )}
        </div>
      ) : (
        /* Case 2: No Account or Create Mode */
        <div className="form-section">
          {!showCreateForm ? (
            <div style={{ textAlign: 'center', padding: '3rem', background: '#f9f9f9', borderRadius: '8px' }}>
              <p style={{ marginBottom: '1rem' }}>You haven't set up a payout account yet.</p>
              <button 
                onClick={() => setShowCreateForm(true)}
                style={{ backgroundColor: '#000', color: '#fff', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
              >
                + Add Payout Account
              </button>
            </div>
          ) : (
            <AccountForm 
              providers={countryProviders} 
              onSubmit={async (data) => {
                await addAccount(data);
                setShowCreateForm(false);
              }} 
              onCancel={() => setShowCreateForm(false)} 
            />
          )}
        </div>
      )}
    </div>
  );
};

const AccountForm = ({ providers, onSubmit, onCancel }) => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [identifier, setIdentifier] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      country_payout_provider: selectedProvider,
      account_identifier: identifier,
      is_primary: true
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 1rem 0' }}>Link New Account</h3>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Select Provider</label>
        <select 
          required
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">-- Choose a provider --</option>
          {providers?.map(p => (
            <option key={p.id} value={p.id}>
              {p.provider_name} ({p.currency})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Account Identifier (IBAN / Email / Phone)</label>
        <input 
          required
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="e.g. FR76..." 
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
        <button type="submit" style={{ flex: 1, padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Save Account
        </button>
        <button type="button" onClick={onCancel} style={{ flex: 1, padding: '10px', backgroundColor: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PayoutPage;