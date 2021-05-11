import { render, screen } from '@testing-library/react';
import WebsocketApp from './WebsocketApp';

test('renders learn react link', () => {
  render(<WebsocketApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
