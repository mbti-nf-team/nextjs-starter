import { render } from '@testing-library/react';

import IndexPage from './index';

describe('IndexPage', () => {
  const renderIndexPage = () => render((
    <IndexPage />
  ));

  it('Should be visible "Next.js"', () => {
    const { container } = renderIndexPage();

    expect(container).toHaveTextContent('Next.js');
  });
});
