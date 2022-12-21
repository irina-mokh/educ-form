// put here source of addresses
const ADDRESSES = [
	{
		id: 0,
		city: 'Canberra',
		country: 'Australia',
		state: 'ACT'
	},
	{
		id: 1,
		city: 'New York',
		country: 'USA',
		state: 'New York'
	},

];

// put here source of education info
const EDUCATION = [
	{
		class: 'class1',
		college: 'college1',
		obtaining: 40,
		obtained: 85,
	},
	{
		class: 'class2',
		college: 'college2',
		obtaining: 84,
		obtained: 120,
	}
];

// create list of addresses for autofill
const renderSelect = () => {
	const citySelect = document.querySelector('#city');
	ADDRESSES.forEach((adr) => {
		const option = document.createElement('option');
		option.value = adr.city;
		option.innerHTML = adr.city;
		citySelect.appendChild(option);
	})
}

// autofill country and state by city
const autofillAddress = () => {
	const citySelect = document.querySelector('#city');

	const state = document.querySelector('#state');
	const country = document.querySelector('#country');
	const address = ADDRESSES.find((adr) => adr.city == citySelect.value);
	state.value = address.state;
	country.value = address.country;
}


// render table with education details
const renderTable = () => {
	const table = document.querySelector('#education');
	
	EDUCATION.forEach((item, i) => {
		const percentage = document.createElement('td');
		const row = document.createElement('tr');

		row.innerHTML = `
			<td>
				<input
					type="text"
					name="class"
					id=class-${i}
					class="table__field"
					value=${item.class}
					>
			</td>
			<td>
				<input
					type="text"
					name="college"
					id=college-${i}
					value=${item.college}
					class="table__field">
			</td>
			<td>
				<input
					type="text"
					name="obtaining"
					id=obtaining-${i}
					class="table__field"
					value=${item.obtaining}
					>
			</td>
			<td>
				<input
					type="text"
					name="obtained"
					id=obtained-${i}
					class="table__field"
					value=${item.obtained}
					>
			</td>
			

		`;

		const obtaining = row.querySelector(`#obtaining-${i}`);
		const obtained = row.querySelector(`#obtained-${i}`);

		const updatePercentage = () => {
			let res = '...';
			if (obtaining.value && obtained.value) {
				res = Math.round((obtaining.value / obtained.value) * 100)
			}
			percentage.innerHTML = res;
		}
		obtained.addEventListener('input', updatePercentage);
		obtaining.addEventListener('input', updatePercentage);
		
		updatePercentage();

		row.appendChild(percentage);
		table.appendChild(row);
	});
}

// calculate overall percentage under table
const calculateOverall = () => {
	const allMarks = document.querySelectorAll('.table__field[name=obtained]');
	const completedMarks = document.querySelectorAll('.table__field[name=obtaining]');

	let obtained = 0;
	let obtaining = 0;

	allMarks.forEach(item => {
		obtained += +item.value;

		item.addEventListener('input', calculateOverall);
	});

	completedMarks.forEach(item => {
		obtaining += +item.value;

		item.addEventListener('input', calculateOverall);
	});

	const res = Math.round((obtaining / obtained) * 100);
	document.querySelector('.overall__value').innerHTML = res;
}

// autofill age for today
const autofillAge = () => {
	const age = document.querySelector('#age');
	const dob = document.querySelector('#dob');

	dob.addEventListener('input', autofillAge);

	const today = new Date();

	const res = Math.floor((today -new Date(dob.value)) / (365 * 24 *60*60*1000));
	age.value = res;
}


const run = () => {
	const citySelect = document.querySelector('#city');

	autofillAge();
	renderSelect();
	autofillAddress();

	citySelect.addEventListener('change', autofillAddress)

	renderTable();

	calculateOverall();
}

window.addEventListener('load', run);
