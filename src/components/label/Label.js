import React from 'react';

function Label({ props, children }) {
     const label_class = `label flex ${props.flex} `;

     return (
          <label className={label_class}>
               <span className='label-text mb-2 ml-2 mr-2'>{props.text}{props.required && (<span className='text-red-500'>*</span>)}</span>
               {children}
		</label>
	);
}

export default Label;
