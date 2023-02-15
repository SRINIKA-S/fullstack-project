import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Forgotpswd from './Forgotpswd';

describe('<Forgotpswd />', () => {
  test('it should mount', () => {
    render(<Forgotpswd />);
    
    const forgotpswd = screen.getByTestId('Forgotpswd');

    expect(forgotpswd).toBeInTheDocument();
  });
});