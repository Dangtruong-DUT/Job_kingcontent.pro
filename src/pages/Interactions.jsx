import React from 'react';
import {Helmet} from 'react-helmet';
import Interaction from '@/components/Interactions';

const Interactions = (props) => {
	return (
		<>
			<Helmet>
				<title>Nhiá»u tÆ°Æ¡ng tÃ¡c</title>
			</Helmet>
			<Interaction />
		</>
	);
};

export default React.memo(Interactions);


