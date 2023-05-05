import { render } from '@testing-library/react';

import HomePage from './page';

describe('HomePage', () => {
  const renderHomePage = () => render((
    <HomePage />
  ));

  it('Should be visible "app/page.tsx"', () => {
    const { container } = renderHomePage();

    expect(container).toHaveTextContent('app/page.tsx');
  });
});
