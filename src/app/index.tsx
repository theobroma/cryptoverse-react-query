import { Routing } from '@/pages';

import './addons/fonts';
import { withProviders } from './providers';

export const App = withProviders(() => <Routing />);
