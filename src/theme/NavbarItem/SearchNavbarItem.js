/* 
  Swizzled component. Original item does not render anything on the sidebar on mobile.

  This one passes down if it renders on mobile so the search bar apply different classes.
*/

import React from 'react';
import SearchBar from '@theme/SearchBar';
export default function SearchNavbarItem({ mobile }) {
  return <SearchBar mobile={mobile} />;
}
