import React from 'react'

export const withLayout = (Story: React.ComponentType) => (
  <div style={{ width: '1120px', maxWidth: '100%' }}>
    <Story />
  </div>
)
