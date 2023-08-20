import React, { useState, } from 'react';

const TagForm = ({ updateTags }) => {
	const [tag1, setTag1] = useState('')
	const [tag1Error, setTag1Error] = useState(false);
	const [tag2, setTag2] = useState('')
	const [tag2Error, setTag2Error] = useState(false);
	const [tag3, setTag3] = useState('')
	const [tag3Error, setTag3Error] = useState(false);


	const addTag1 = (e) => {
		e.preventDefault();
		if (tag1.length > 10) {
			setTag1Error(true);
			return;
		}

		updateTags(tag1, null, null); // Solo actualiza tag1, mantén tag2 y tag3 sin cambios
		setTag1('');
		setTag1Error(false);
	};

	const addTag2 = (e) => {
		e.preventDefault();
		if (tag2.length > 10) {
			setTag2Error(true);
			return;
		}

		updateTags(null, tag2, null); // Solo actualiza tag2, mantén tag1 y tag3 sin cambios
		setTag2('');
		setTag2Error(false);
	};

	const addTag3 = (e) => {
		e.preventDefault();
		if (tag3.length > 10) {
			setTag3Error(true);
			return;
		}

		updateTags(null, null, tag3); // Solo actualiza tag3, mantén tag1 y tag2 sin cambios
		setTag3('');
		setTag3Error(false);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
				<form onSubmit={addTag1}>
					<input
						type="text"
						placeholder="Max length 10"
						value={tag1}
						onChange={(e) => {
							setTag1(e.target.value);
							setTag1Error(e.target.value.length > 10);
						}}
						style={{ height: '30px', width: '200px', margin: '10px', borderColor: tag1Error ? 'red' : '', }}
					/>
					<button
						className='btn'
						style={{
							height: '30px',
							width: 'auto',
							margin: '10px',
							backgroundColor: 'rgb(88, 175, 221)',
							borderColor: tag1Error ? 'red' : '',
						}}
						type='submit'
					>
						Add Tag1
					</button>
				</form>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
				<form onSubmit={addTag2}>
					<input
						type="text"
						placeholder="Max length 10"
						value={tag2}
						onChange={(e) => {
							setTag2(e.target.value);
							setTag2Error(e.target.value.length > 10);
						}}
						style={{ height: '30px', width: '200px', margin: '10px', borderColor: tag2Error ? 'red' : '', }}
					/>
					<button className='btn' style={{ height: '30px', width: 'auto', margin: '10px', backgroundColor: 'rgb(88, 175, 221)', borderColor: tag2Error ? 'red' : '', }} type='submit'>Add Tag2</button>
				</form>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
				<form onSubmit={addTag3}>
					<input
						type="text"
						placeholder="Max length 10"
						value={tag3}
						onChange={(e) => {
							setTag3(e.target.value);
							setTag3Error(e.target.value.length > 10);
						}}
						style={{ height: '30px', width: '200px', margin: '10px', borderColor: tag3Error ? 'red' : '', }}
					/>
					<button className='btn' style={{ height: '30px', width: 'auto', margin: '10px', backgroundColor: 'rgb(88, 175, 221)', borderColor: tag3Error ? 'red' : '', }} type='submit'>Add Tag3</button>
				</form>
			</div>
		</div>
	)
}

export default TagForm


