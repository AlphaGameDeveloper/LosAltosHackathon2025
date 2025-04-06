// Copyright (c) 2025 Damien Boisvert (AlphaGameDeveloper)
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react';

interface SpamLabelProps {
  isSpam: boolean;
}

export function SpamLabel({ isSpam }: SpamLabelProps) {
  const spamLabel = isSpam ? 'Spam' : 'Not Spam';
  
  const bgColor = isSpam ? '#ff4d4d' : '#4caf50';
  return (
    <div 
      style={{
        display: 'inline-block',
        backgroundColor: bgColor,
        color: 'white',
        fontWeight: 'bold',
        padding: '2px 12px',
        borderRadius: '16px',
        fontSize: '12px',
      }}
    >
      {spamLabel}
    </div>
  );
}

