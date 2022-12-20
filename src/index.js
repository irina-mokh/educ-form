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
					name="obtained"
					id=obtained-${i}
					class="table__field"
					value=${item.obtained}
					>
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

		`;

		const obtaining = row.querySelector(`#obtaining-${i}`);
		const obtained = row.querySelector(`#obtained-${i}`);

		

		const updatePercentage = () => {
			percentage.innerHTML = Math.round((obtaining.value / obtained.value) * 100);
		}
		obtained.addEventListener('change', updatePercentage);
		obtaining.addEventListener('change', updatePercentage);
		
		updatePercentage();

		row.appendChild(percentage);
		table.appendChild(row);
	});
}


const run = () => {
	const citySelect = document.querySelector('#city');

	renderSelect();
	autofillAddress();

	citySelect.addEventListener('change', autofillAddress)

	renderTable();

}

window.addEventListener('load', run);
