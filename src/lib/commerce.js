import Commerce from '@chec/commerce.js';
import {REACT_APP_CHEC_PUBLIC_KEY} from '../helpers/envVars';

export const commerce = new Commerce(REACT_APP_CHEC_PUBLIC_KEY, true); 